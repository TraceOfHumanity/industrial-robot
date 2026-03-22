import { Instance, Instances } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import { useIndustrialRobotContext } from "@/components/experience/components/Industrial-robot/context/industrial-robot";
import { useAppSelector } from "@/store/hooks";
import type { WeldAnimation } from "@/components/experience/components/Industrial-robot/types/robot-animation";
import { WELDING_TORCH_ANIMATIONS } from "@/components/experience/components/Industrial-robot/types/robot-animation";
import { useLayoutEffect, useMemo, useRef } from "react";
import type { AnimationAction } from "three";
import { AdditiveBlending, Color, type Group, LoopOnce } from "three";
import { lerp, randFloat, randFloatSpread } from "three/src/math/MathUtils.js";

const weldAnimationSet = new Set<string>(WELDING_TORCH_ANIMATIONS);

const FPS = 30;

const WELD_FRAME_TOTAL: Record<WeldAnimation, number> = {
  "linear-seam": 470,
  "circular-path": 300,
  "spot-weld": 562,
};

const WELD_SPARK_RANGES: Record<
  WeldAnimation,
  { kind: "all" } | { kind: "ranges"; ranges: readonly [number, number][] }
> = {
  "linear-seam": {
    kind: "ranges",
    ranges: [[130, 350]],
  },
  "circular-path": { kind: "all" },
  "spot-weld": {
    kind: "ranges",
    ranges: [
      [80, 90],
      [125, 135],
      [175, 185],
      [225, 235],
      [275, 285],
      [325, 335],
      [375, 385],
      [425, 435],
      [475, 485],
    ],
  },
};

function weldingTimeToFrame(action: AnimationAction, maxFrame: number): number {
  const clip = action.getClip();
  const duration = clip.duration;
  let t = action.time;
  if (action.loop === LoopOnce) {
    t = Math.min(Math.max(t, 0), duration);
  } else {
    t = ((t % duration) + duration) % duration;
  }
  const f = Math.floor(t * FPS) + 1;
  return Math.min(Math.max(f, 1), maxFrame);
}

function isWeldingSparkFrame(anim: WeldAnimation, frame: number): boolean {
  const spec = WELD_SPARK_RANGES[anim];
  const max = WELD_FRAME_TOTAL[anim];
  if (spec.kind === "all") {
    return frame >= 1 && frame <= max;
  }
  return spec.ranges.some(([a, b]) => frame >= a && frame <= b);
}

const NB = 220;

const colorHot = new Color(0xfff4e0).multiplyScalar(5);
const colorWarm = new Color(0xff8c28).multiplyScalar(3);

type InstanceHandle = Group & { color: Color };

function randomUnitVelocity(speed: number): [number, number, number] {
  let x = randFloatSpread(1);
  let y = randFloatSpread(1);
  let z = randFloatSpread(1);
  const len = Math.hypot(x, y, z) || 1;
  x = (x / len) * speed;
  y = (y / len) * speed;
  z = (z / len) * speed;
  return [x, y, z];
}

export function WeldingTorchSparks() {
  const { nodes, actions } = useIndustrialRobotContext();
  const { endEffector, robotAnimation } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );
  const baseActive =
    endEffector === "WELDING_TORCH" && weldAnimationSet.has(robotAnimation);
  const torch = nodes.WELDING_TORCH;
  const groupRef = useRef<Group>(null);
  const sparksActiveRef = useRef(false);

  useFrame(() => {
    let sparksOn = false;
    if (baseActive) {
      const action = actions[robotAnimation];
      const anim = robotAnimation as WeldAnimation;
      if (action?.isRunning()) {
        const frame = weldingTimeToFrame(action, WELD_FRAME_TOTAL[anim]);
        sparksOn = isWeldingSparkFrame(anim, frame);
      }
    }
    sparksActiveRef.current = sparksOn;
    if (groupRef.current) {
      groupRef.current.visible = sparksOn;
    }
  }, -20);

  if (!baseActive || !torch) {
    return null;
  }

  return createPortal(
    <group ref={groupRef} visible={false} position={[-0.05, -0.2, 0]}>
      <SparkInstances sparksActiveRef={sparksActiveRef} />
    </group>,
    torch,
  );
}

function SparkInstances({
  sparksActiveRef,
}: {
  sparksActiveRef: { current: boolean };
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: NB }, () => ({
        spawn: [
          randFloatSpread(0.015),
          randFloatSpread(0.015),
          randFloatSpread(0.015),
        ] as [number, number, number],
        speed: randFloat(0.55, 1.65),
        lifetime: randFloat(0.12, 0.38),
        size: randFloat(0.004, 0.014),
      })),
    [],
  );

  return (
    <Instances range={NB} limit={NB} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
      {particles.map((props, i) => (
        <SparkParticle key={i} {...props} sparksActiveRef={sparksActiveRef} />
      ))}
    </Instances>
  );
}

type SparkParticleProps = {
  spawn: [number, number, number];
  speed: number;
  lifetime: number;
  size: number;
  sparksActiveRef: { current: boolean };
};

function SparkParticle({
  spawn,
  speed,
  lifetime,
  size,
  sparksActiveRef,
}: SparkParticleProps) {
  const ref = useRef<InstanceHandle | null>(null);
  const age = useRef(0);
  const vel = useRef<[number, number, number]>([0, 0, 0]);

  useLayoutEffect(() => {
    vel.current = randomUnitVelocity(speed);
  }, [speed]);

  useFrame(({ camera }, delta) => {
    if (!sparksActiveRef.current) {
      return;
    }
    const obj = ref.current;
    if (!obj) {
      return;
    }
    age.current += delta;
    const t = age.current / lifetime;
    const s =
      t < 0.08
        ? lerp(0, size, t / 0.08)
        : t > 0.65
          ? lerp(size, 0, (t - 0.65) / 0.35)
          : size;
    obj.scale.x = obj.scale.y = obj.scale.z = s;
    obj.color.r = lerp(colorHot.r, colorWarm.r, t);
    obj.color.g = lerp(colorHot.g, colorWarm.g, t);
    obj.color.b = lerp(colorHot.b, colorWarm.b, t);
    obj.position.x += vel.current[0] * delta;
    obj.position.y += vel.current[1] * delta;
    obj.position.z += vel.current[2] * delta;
    obj.position.y -= 0.85 * delta;
    if (age.current > lifetime) {
      obj.position.set(spawn[0], spawn[1], spawn[2]);
      age.current = 0;
      vel.current = randomUnitVelocity(speed);
    }
    obj.lookAt(camera.position);
  });

  return <Instance ref={ref} position={spawn} scale={size} />;
}
