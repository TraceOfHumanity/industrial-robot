import Button from "../../ui/button";
import Icon from "../../ui/icon/icon";
import { END_EFFECTORS } from "@/components/experience/components/Industrial-robot/types/end-effector";
import { setEndEffector } from "@/store/features/industrial-robot";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const EndEffectors = () => {
  const dispatch = useAppDispatch();
  const selectedEndEffector = useAppSelector(
    (state) => state.industrialRobotSlice.endEffector,
  );
  return (
    <div className="flex flex-col gap-1 px-2">
      <h3 className="text-lg font-medium">End Effectors</h3>
      <div className="grid grid-cols-5 gap-1">
        {END_EFFECTORS.map((endEffector) => (
          <Button
            isActive={endEffector === selectedEndEffector}
            key={endEffector}
            onClick={() => dispatch(setEndEffector(endEffector))}
          >
            <Icon name={endEffector} className="w-full h-full" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EndEffectors;
