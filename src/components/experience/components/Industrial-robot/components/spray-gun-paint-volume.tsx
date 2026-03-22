import { Instance, Instances } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import { useIndustrialRobotContext } from "@/components/experience/components/Industrial-robot/context/industrial-robot";
import { useAppSelector } from "@/store/hooks";
import { ROBOT_COLORS } from "@/components/experience/components/Industrial-robot/types/robot-color";
import { SPRAY_GUN_ANIMATIONS } from "@/components/experience/components/Industrial-robot/types/robot-animation";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, type Group } from "three";
import { lerp, randFloat, randFloatSpread } from "three/src/math/MathUtils.js";

const sprayAnimationSet = new Set<string>(SPRAY_GUN_ANIMATIONS);

const NB = 200;

type InstanceHandle = Group & { color: Color };

export function SprayGunPaintVolume() {
  const { nodes } = useIndustrialRobotContext();
  const { endEffector, robotAnimation, robotColor } = useAppSelector(
    (state) => state.industrialRobotSlice,
  );
  const paintColors = useMemo(() => {
    const base = new Color(ROBOT_COLORS[robotColor]);
    const mist = base.clone().multiplyScalar(4);
    const edge = base
      .clone()
      .lerp(new Color(0xffffff), 0.45)
      .multiplyScalar(1);
    return { mist, edge };
  }, [robotColor]);
  const active =
    endEffector === "SPRAY_GUN" && sprayAnimationSet.has(robotAnimation);
  const gun = nodes.SPRAY_GUN;

  if (!active || !gun) {
    return null;
  }

  return createPortal(
    <group position={[0.1, -0.01, -0.02]}>
      <PaintInstances mist={paintColors.mist} edge={paintColors.edge} />
    </group>,
    gun,
  );
}

function PaintInstances({
  mist,
  edge,
}: {
  mist: Color;
  edge: Color;
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: NB }, () => ({
        spawn: [
          randFloatSpread(0.01),
          randFloatSpread(0.01),
          randFloatSpread(0.01),
        ] as [number, number, number],
        speed: randFloat(2, 2.1),
        wobble: randFloat(2.5, 5.5),
        phase: randFloat(0, Math.PI * 2),
        lifetime: randFloat(0.35, 0.85),
        size: randFloat(0.005, 0.005),
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
        <PaintParticle key={i} {...props} mist={mist} edge={edge} />
      ))}
    </Instances>
  );
}

type PaintParticleProps = {
  spawn: [number, number, number];
  speed: number;
  wobble: number;
  phase: number;
  lifetime: number;
  size: number;
  mist: Color;
  edge: Color;
};

function PaintParticle({
  spawn,
  speed,
  wobble,
  phase,
  lifetime,
  size,
  mist,
  edge,
}: PaintParticleProps) {
  const ref = useRef<InstanceHandle | null>(null);
  const age = useRef(0);

  useFrame(({ camera }, delta) => {
    const obj = ref.current;
    if (!obj) {
      return;
    }
    age.current += delta;
    const t = age.current / lifetime;
    const s =
      t < 0.15
        ? lerp(0, size, t / 0.15)
        : t > 0.72
          ? lerp(size, 0, (t - 0.72) / 0.28)
          : size;
    obj.scale.x = obj.scale.y = obj.scale.z = s;
    obj.color.r = lerp(mist.r, edge.r, t);
    obj.color.g = lerp(mist.g, edge.g, t);
    obj.color.b = lerp(mist.b, edge.b, t);
    obj.position.x += speed * delta;
    obj.position.y += Math.sin(age.current * wobble + phase) * 0.22 * delta;
    obj.position.z +=
      Math.cos(age.current * wobble * 0.85 + phase) * 0.22 * delta;
    if (age.current > lifetime) {
      obj.position.set(spawn[0], spawn[1], spawn[2]);
      age.current = 0;
    }
    obj.lookAt(camera.position);
  });

  return <Instance ref={ref} position={spawn} scale={size} />;
}
