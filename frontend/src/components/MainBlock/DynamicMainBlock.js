import React from "react";
import LoginMainBlock from "./Elements/LoginMainBlock/LoginMainBlock";
import RegisterMainBlock from "./Elements/RegisterMainBlock/RegisterMainBlock";
import WelcomeMainBlock from "./Elements/WelcomeMainBlock/WelcomeMainBlock";
import PersonalMainBlock from "./Elements/PersonalMainBlock/PersonalMainBlock";
import { AppAnimatedLayout } from "../../AppAnimatedLayout";
import СommunicationMainBlock from "./Elements/СommunicationMainBlock/СommunicationMainBlock";
import NewsMainBlock from "./Elements/NewsMainBlock/NewsMainBlock";
import OtherUserMainBlock from "./Elements/OtherUserMainBlock/OtherUserMainBlock";
import InitMainBlock from "./Elements/InitMainBlock/InitMainBlock";
import StartRecoveryMainBlock from "./Elements/StartRecoveryMainBlock/StartRecoveryMainBlock";
import GettingStartedMainBlock from "./Elements/GettingStartedMainBlock/GettingStartedMainBlock";

// основные страницы/блоки приложения
const components = {
    init: InitMainBlock,
    login: LoginMainBlock,
    register: RegisterMainBlock,
    recovery: StartRecoveryMainBlock,
    gettingStarted: GettingStartedMainBlock,
    welcome: WelcomeMainBlock,
    personal: PersonalMainBlock,
    communication: СommunicationMainBlock, 
    news: NewsMainBlock,
    otherUser: OtherUserMainBlock
}
// посредник, через который мы сможем рендерить нужный компонент
function DynamicComponent(props) {
    const SelectedComponent = components[props.component];
    return <AppAnimatedLayout>
               <SelectedComponent/>
           </AppAnimatedLayout>
}

export default DynamicComponent;