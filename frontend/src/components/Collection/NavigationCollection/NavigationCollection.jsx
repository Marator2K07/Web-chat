import React from 'react'
import classes from './NavigationCollection.module.css'
import { CSSTransition } from 'react-transition-group';
import './NavigationCollectionCSSTransition.css';
import { SHORT_TIMEOUT } from '../../../constants';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationItem from './NavigationItem/NavigationItem';

export default function NavigationCollection({currentIndex,
                                              minIndex,
                                              maxIndex,
                                              ...props}) {
    const { blocksData } = useNavigationContext();

    return (
        <div className={classes.NavigationCollection} {...props}>
            {Object.keys(blocksData)
                .slice(minIndex, maxIndex)
                .map((key, index) => (
                <CSSTransition 
                    key={index}
                    in={currentIndex !== blocksData[key].index}
                    timeout={SHORT_TIMEOUT}
                    classNames="NavigationCollection">
                    <NavigationItem 
                        root={key}
                        description={blocksData[key].description} 
                    />
                </CSSTransition>
            ))}
        </div>
    )
}
