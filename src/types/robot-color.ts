
export const ROBOT_COLORS = {
    white: 0xffffff,
    orange: 0xffa500,
    blue: 0x4C8CE4,
    yellow: 0xFFDE42,
    red: 0xEB4C4C,
} as const;

export type RobotColor = keyof typeof ROBOT_COLORS;