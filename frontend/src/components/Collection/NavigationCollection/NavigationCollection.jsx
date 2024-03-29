import React from 'react'
import classes from './NavigationCollection.module.css'
import { motion } from "framer-motion";
import { SHORT_DELAY  } from '../../../constants';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationItem from './NavigationItem/NavigationItem';

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

    return (
        <div className={classes.NavigationCollection} {...props}>
            {Object.keys(navigationBlocks)
                .slice(startIndex, endIndex)
                .map((key, index) => (
                <motion.div
                    custom={{currentIndex, index}}
                    variants={animationStates}
                    animate={currentIndex === index ? "hidden"
                                                    : "visible"}>
                    <NavigationItem block={navigationBlocks[key]} />
                </motion.div>
            ))}
        </div>
    )
}
