import { createContext, useContext } from "react";
import type { IndustrialRobot } from "@/components/experience/components/Industrial-robot/types/use-industrial-robot";

export const IndustrialRobotContext = createContext<IndustrialRobot | null>(
  null,
);

export const useIndustrialRobotContext = () => {
  const context = useContext(IndustrialRobotContext);
  if (!context) {
    throw new Error(
      "useIndustrialRobot must be used within a IndustrialRobotProvider",
    );
  }
  return context;
};
