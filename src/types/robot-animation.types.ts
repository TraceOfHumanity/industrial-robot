
export const WELDING_TORCH_ANIMATIONS = [
    "linear-seam",      // Пряма лінія
    "circular-path",    // Коло
    // "zigzag-weave",     // Зигзагоподібний рух (для широких швів)
    "spot-weld",        // Точкове зварювання (короткий імпульс)
] as const;

export const SPRAY_GUN_ANIMATIONS = [
    // "horizontal-sweep", // Горизонтальний прохід
    // "vertical-sweep",   // Вертикальний прохід
    "spiral-coverage",  // Спіральне покриття
] as const;

export const MECHANICAL_GRIPPER_ANIMATIONS = [
    "stack-items-on-pallet", // Скласти предмети в стопку на піддон.
] as const;

export const VACUUM_GRIPPER_ANIMATIONS = [
    "move-glass-panel",   // Перемістити склопанель.
] as const;

export const SPINDLE_ANIMATIONS = [
    "drill-plunge",     // Свердління (вхід по осі Z)
    // "face-milling",     // Торцеве фрезерування (площина)
    // "contour-cut",      // Вирізання по контуру
    // "pocketing",        // Вибірка "кишені" всередині металу
    // "bore-enlarge",     // Розточування отвору
] as const;


export type WeldAnimation = (typeof WELDING_TORCH_ANIMATIONS)[number];
export type SprayAnimation = (typeof SPRAY_GUN_ANIMATIONS)[number];
export type MechanicalGripperAnimation = (typeof MECHANICAL_GRIPPER_ANIMATIONS)[number];
export type VacuumGripperAnimation = (typeof VACUUM_GRIPPER_ANIMATIONS)[number];
export type SpindleAnimation = (typeof SPINDLE_ANIMATIONS)[number];

export type IndustrialRobotAnimation = WeldAnimation | SprayAnimation | MechanicalGripperAnimation | VacuumGripperAnimation | SpindleAnimation;

export type AnimationByEndEffector = {
    "welding-torch": WeldAnimation;
    "spray-gun": SprayAnimation;
    "two-finger-gripper": MechanicalGripperAnimation;
    "vacuum-gripper": VacuumGripperAnimation;
    spindle: SpindleAnimation;
};

export const DEFAULT_ANIMATION_BY_END_EFFECTOR: AnimationByEndEffector = {
    "welding-torch": "linear-seam",
    "spray-gun": "spiral-coverage",
    "two-finger-gripper": "stack-items-on-pallet",
    "vacuum-gripper": "move-glass-panel",
    spindle: "drill-plunge",
};