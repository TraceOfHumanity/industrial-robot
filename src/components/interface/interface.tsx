import InterfaceWrapper from "@/components/interface/components/wrapper";
import Header from "@/components/interface/components/header";
import RobotActions from "@/components/interface/components/robot-actions";
import EndEffectors from "@/components/interface/components/end-effectors";
import RobotColor from "@/components/interface/components/robot-color";
import { useAppSelector } from "@/store/hooks";

const Interface = () => {
  const { isOpen } = useAppSelector((state) => state.interfaceSlice);
  return (
    <InterfaceWrapper>
      <Header />
      {isOpen && (
        <>
          <EndEffectors />
          <RobotActions />
          <RobotColor />
        </>
      )}
    </InterfaceWrapper>
  );
};

export default Interface;
