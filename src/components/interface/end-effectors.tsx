import Button from "../ui/button";
import Icon from "../ui/icon/icon";
import { END_EFFECTORS } from "@/types/end-effector.types";

const EndEffectors = () => {
    return (
        <>
            <h3 className="text-lg font-medium">End Effectors</h3>
            <div className="grid grid-cols-5 gap-1">
                {END_EFFECTORS.map((endEffector) => (
                    <Button variant="ghost" key={endEffector}>
                        <Icon name={endEffector} className="w-full h-full" />
                    </Button>
                ))}
            </div>
        </>
    )
}

export default EndEffectors;