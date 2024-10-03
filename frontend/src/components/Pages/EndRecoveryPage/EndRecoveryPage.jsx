import React from 'react'
import classes from './EndRecoveryPage.module.css'
import EndRecoveryMainBlock from '../../MainBlock/Elements/EndRecoveryMainBlock/EndRecoveryMainBlock';
import DownBlock from '../../DownBlock/DownBlock';
import Spacer from '../../Helper/Spacer/Spacer';

export default function EndRecoveryPage({...props}) {
    
    return (
        <div className={classes.EndRecoveryPage} {...props}>
            <Spacer sizeW='10px' sizeH='13%'/>
            <h3>Восстановление аккаунта</h3>
            <EndRecoveryMainBlock />
            <Spacer sizeW='10px' sizeH='13%'/>
            <DownBlock />
        </div>
    )
}
