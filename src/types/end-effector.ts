export const END_EFFECTORS = ['WELDING_TORCH', 'SPRAY_GUN', 'TWO_FINGER_GRIPPER', 'VACUUM_GRIPPER', 'SPINDLE'] as const;

export type EndEffector = (typeof END_EFFECTORS)[number];