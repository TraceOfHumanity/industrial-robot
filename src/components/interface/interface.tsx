import InterfaceWrapper from "@/components/interface/interface-wrapper"
import Header from "./header"
import RobotActions from "./robot-actions"
import EndEffector from "./end-effector"
import BotColor from "./bot-color"

const Interface = () => {
    return (
        <InterfaceWrapper>
            <Header />
            <EndEffector />
            <RobotActions />
            <BotColor />
        </InterfaceWrapper>
    )
}

export default Interface