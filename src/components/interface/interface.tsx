import InterfaceWrapper from "@/components/interface/interface-wrapper"
import Header from "./header"
import RobotActions from "./robot-actions"
import EndEffectors from "./end-effectors"
import BotColor from "./bot-color"

const Interface = () => {
    return (
        <InterfaceWrapper>
            <Header />
            <EndEffectors />
            <RobotActions />
            <BotColor />
        </InterfaceWrapper>
    )
}

export default Interface