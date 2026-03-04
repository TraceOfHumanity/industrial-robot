export const END_EFFECTORS = ['welding-torch', 'spray-gun', 'two-finger-gripper', 'vacuum-gripper', 'spindle'] as const;

export type EndEffector = (typeof END_EFFECTORS)[number];