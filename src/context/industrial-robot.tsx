import { createContext } from "react";
import type { IndustrialRobot } from "@/types/industrial-robot";

export const IndustrialRobotContext = createContext<IndustrialRobot | null>(
  null,
);
