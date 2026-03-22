import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, GridHelper } from "three";
import { ROBOT_COLORS, type RobotColor } from "@/types/robot-color";

const SIZE = 10;
const DIVISIONS = 10;
const CENTER = DIVISIONS / 2;
const LERP_SPEED = 5;

export function SmoothRobotGrid({ robotColor }: { robotColor: RobotColor }) {
  const grid = useMemo(
    () => new GridHelper(SIZE, DIVISIONS, 0x000000, 0x888888),
    [],
  );
  const main = useRef(new Color());
  const sec = useRef(new Color());
  const target = useRef(new Color());
  const targetDim = useRef(new Color());

  useEffect(() => {
    return () => {
      grid.dispose();
    };
  }, [grid]);

  useFrame((_, delta) => {
    target.current.setHex(ROBOT_COLORS[robotColor]);
    targetDim.current.copy(target.current).multiplyScalar(0.55);
    const blend = 1 - Math.exp(-LERP_SPEED * delta);
    main.current.lerp(target.current, blend);
    sec.current.lerp(targetDim.current, blend);
    const attr = grid.geometry.getAttribute("color");
    const arr = attr.array as Float32Array;
    let j = 0;
    for (let i = 0; i <= DIVISIONS; i++) {
      const c = i === CENTER ? main.current : sec.current;
      for (let k = 0; k < 4; k++) {
        arr[j++] = c.r;
        arr[j++] = c.g;
        arr[j++] = c.b;
      }
    }
    attr.needsUpdate = true;
  });

  return <primitive object={grid} />;
}
