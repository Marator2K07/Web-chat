import React from "react";
import LoginMainBlock from "./Components/LoginMainBlock/LoginMainBlock";
import RegisterMainBlock from "./Components/RegisterMainBlock/RegisterMainBlock";

// основные страницы/блоки приложения
const components = {
    registerMainBlock: RegisterMainBlock,
    loginMainBlock: LoginMainBlock 
}
// посредник, через который мы сможем рендерить нужный компонент
function DynamicComponent(props) {
    const SelectedComponent = components[props.component];
    return <SelectedComponent/>
}

export default DynamicComponent;