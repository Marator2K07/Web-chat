import React from "react";
import LoginMainBlock from "../MainBlocks/LoginMainBlock/LoginMainBlock";
import RegisterMainBlock from "../MainBlocks/RegisterMainBlock/RegisterMainBlock";

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