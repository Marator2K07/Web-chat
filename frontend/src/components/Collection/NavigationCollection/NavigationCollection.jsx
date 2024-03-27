import React from 'react'
import classes from './NavigationCollection.module.css'
import { CSSTransition } from 'react-transition-group';
import './NavigationCollectionCSSTransition.css';
import { SHORT_TIMEOUT } from '../../../constants';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationItem from './NavigationItem/NavigationItem';

export default function NavigationCollection({currentIndex,
                                              startIndex,
                                              endIndex,
                                              ...props}) {
    const { navigationBlocks } = useNavigationContext();

    return (
        <div className={classes.NavigationCollection} {...props}>
            {Object.keys(navigationBlocks)
                .slice(startIndex, endIndex)
                .map((key, index) => (
                <CSSTransition 
                    key={index}
                    in={currentIndex !== navigationBlocks[key].index}
                    timeout={SHORT_TIMEOUT}
                    classNames="NavigationCollection">
                    <NavigationItem 
                        route={key}
                        description={navigationBlocks[key].description} 
                    />
                </CSSTransition>
            ))}
        </div>
    )
}
