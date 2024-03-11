import React from "react";
import LoginMainBlock from "./Elements/LoginMainBlock/LoginMainBlock";
import RegisterMainBlock from "./Elements/RegisterMainBlock/RegisterMainBlock";
import WelcomeMainBlock from "./Elements/WelcomeMainBlock/WelcomeMainBlock";

// основные страницы/блоки приложения
const components = {
    register: RegisterMainBlock,
    login: LoginMainBlock,
    welcome: WelcomeMainBlock 
}
// посредник, через который мы сможем рендерить нужный компонент
function DynamicComponent(props) {
    const SelectedComponent = components[props.component];
    return <SelectedComponent
                user={props.user}
                setLoading={props.setLoading}
                setResponse={props.setResponse}
                setError={props.setError}
                setHolding={props.setHolding}/>
}

export default DynamicComponent;