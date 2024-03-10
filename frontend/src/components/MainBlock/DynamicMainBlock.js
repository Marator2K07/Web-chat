import React from "react";
import LoginMainBlock from "./Components/LoginMainBlock/LoginMainBlock";
import RegisterMainBlock from "./Components/RegisterMainBlock/RegisterMainBlock";

// основные страницы/блоки приложения
const components = {
    register: RegisterMainBlock,
    login: LoginMainBlock 
}
// посредник, через который мы сможем рендерить нужный компонент
function DynamicComponent(props) {
    const SelectedComponent = components[props.component];
    return <SelectedComponent
                user={props.user}
                setLoading={props.setLoading}
                setResponce={props.setResponce}
                setError={props.setError}
                setHolding={props.setHolding}/>
}

export default DynamicComponent;