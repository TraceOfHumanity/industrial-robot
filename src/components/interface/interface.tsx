import InterfaceWrapper from "@/components/interface/interface-wrapper";
import Header from "./header";
import RobotActions from "./robot-actions";
import EndEffectors from "./end-effectors";
import RobotColor from "./robot-color";
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
