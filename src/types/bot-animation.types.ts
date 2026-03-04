export const INDUSTRIAL_ROBOT_ANIMATIONS = ["idle", "draw-line", "draw-circle", "draw-square", "draw-triangle", "draw-rectangle"] as const;

export type IndustrialRobotAnimation = (typeof INDUSTRIAL_ROBOT_ANIMATIONS)[number];