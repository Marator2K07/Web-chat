import React from "react";
import LoginMainBlock from "./Elements/LoginMainBlock/LoginMainBlock";
import RegisterMainBlock from "./Elements/RegisterMainBlock/RegisterMainBlock";
import WelcomeMainBlock from "./Elements/WelcomeMainBlock/WelcomeMainBlock";
import PersonalPageMainBlock from "./Elements/PersonalPageMainBlock/PersonalPageMainBlock";
import { AppAnimatedLayout } from "../../AppAnimatedLayout";
import DialogMainBlock from "./Elements/DialogMainBlock/DialogMainBlock";

// основные страницы/блоки приложения
const components = {
    register: RegisterMainBlock,
    login: LoginMainBlock,
    welcome: WelcomeMainBlock,
    personal: PersonalPageMainBlock,
    dialog: DialogMainBlock 
}
// посредник, через который мы сможем рендерить нужный компонент
function DynamicComponent(props) {
    const SelectedComponent = components[props.component];
    return <AppAnimatedLayout>
               <SelectedComponent/>
           </AppAnimatedLayout>
}

export default DynamicComponent;