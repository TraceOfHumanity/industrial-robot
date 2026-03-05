export const ROBOT_COLORS = ['white', 'orange', 'blue', 'yellow', 'red'] as const;

export type RobotColor = (typeof ROBOT_COLORS)[number];