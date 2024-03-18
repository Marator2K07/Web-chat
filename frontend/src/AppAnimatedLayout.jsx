import { motion } from 'framer-motion'

export const AppAnimatedLayout = ({ children }) => {
	return (
		<motion.div			
			initial={{
				scale: 0.5,
				opacity: 0,
			}}
			animate={{
				scale: 1,
				opacity: 1,
			}}
			exit={{
				scale: 0.5,
				opacity: 0,
			}}
			transition={{ duration: 0.5 }}			
		>
			<div className='container'>{children}</div>
		</motion.div>
	)
}
