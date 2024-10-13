import React from 'react'
import classes from './NavigationCollection.module.css'
import { motion } from "framer-motion";
import { SHORT_DELAY  } from '../../../constants';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationItem from './NavigationItem/NavigationItem';
import ScrollableHorizontal from '../../Helper/ScrollableHorizontal/ScrollableHorizontal';

export default function NavigationCollection({currentIndex,
                                              startIndex,
                                              endIndex,
                                              ...props}) {
    const { navigationBlocks } = useNavigationContext();
    const animationStates = {
        visible: index => ({
            opacity: 1,
            transition: {
                delay: index * SHORT_DELAY/100,
            },
        }),
        hidden: {opacity: 0}
    }

    const disablePointerEvents = {
        pointerEvents: "none"
    };    
    const enablePointerEvents = {
        pointerEvents: "initial"
    };

    return (
        <div className={classes.NavigationCollection} {...props}>
            <ScrollableHorizontal>
                {Object.keys(navigationBlocks)
                    .slice(startIndex, endIndex)
                    .map((key, index) => (
                        <motion.div
                            custom={{ currentIndex, index }}
                            variants={animationStates}
                            style={currentIndex !== index ? enablePointerEvents
                                                          : disablePointerEvents}
                            animate={currentIndex === index ? "hidden"
                                                            : "visible"}>
                            <NavigationItem block={navigationBlocks[key]} />
                        </motion.div>
                    ))}
            </ScrollableHorizontal>
        </div>
    )
}
