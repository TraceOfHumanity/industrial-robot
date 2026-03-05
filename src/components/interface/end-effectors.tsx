import Button from "../ui/button";
import Icon from "../ui/icon/icon";
import { END_EFFECTORS } from "@/types/end-effector.types";
import { setEndEffector } from "@/store/features/industrial-robot";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cn } from "@/utils/cn";

const EndEffectors = () => {
  const dispatch = useAppDispatch();
  const selectedEndEffector = useAppSelector(
    (state) => state.industrialRobotSlice.endEffector,
  );
  return (
    <>
      <h3 className="text-lg font-medium">End Effectors</h3>
      <div className="grid grid-cols-5 gap-1">
        {END_EFFECTORS.map((endEffector) => (
          <Button
            variant="ghost"
            key={endEffector}
            className={cn(
              "hover:bg-white/30 rounded-md",
              endEffector === selectedEndEffector && "bg-white/20",
            )}
            onClick={() => dispatch(setEndEffector(endEffector))}
          >
            <Icon name={endEffector} className="w-full h-full" />
          </Button>
        ))}
      </div>
    </>
  );
};

export default EndEffectors;
