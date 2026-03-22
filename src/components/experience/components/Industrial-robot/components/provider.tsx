import { IndustrialRobotContext } from "@/components/experience/components/Industrial-robot/context/industrial-robot";
import useIndustrialRobot from "@/components/experience/components/Industrial-robot/hooks/use-industrial-robot";
import type { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <IndustrialRobotContext.Provider value={useIndustrialRobot()}>
      {children}
    </IndustrialRobotContext.Provider>
  );
};

export default Provider;
