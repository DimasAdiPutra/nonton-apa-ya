import { motion } from 'motion/react'

const LoadingScreen = () => {
	return (
		<motion.div
			className="flex items-center justify-center h-screen w-screen bg-white"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
				width="201"
				height="201"
				style={{ shapeRendering: 'auto' }}>
				<g>
					<circle
						strokeLinecap="round"
						fill="none"
						strokeDasharray="50.26548245743669 50.26548245743669"
						stroke="#2ec4b6"
						strokeWidth="5"
						r="32"
						cy="50"
						cx="50">
						<animateTransform
							values="0 50 50;360 50 50"
							keyTimes="0;1"
							repeatCount="indefinite"
							dur="4.545454545454546s"
							type="rotate"
							attributeName="transform"></animateTransform>
					</circle>
					<circle
						strokeLinecap="round"
						fill="none"
						strokeDashoffset="40.840704496667314"
						strokeDasharray="40.840704496667314 40.840704496667314"
						stroke="#ff9f1c"
						strokeWidth="5"
						r="26"
						cy="50"
						cx="50">
						<animateTransform
							values="0 50 50;-360 50 50"
							keyTimes="0;1"
							repeatCount="indefinite"
							dur="4.545454545454546s"
							type="rotate"
							attributeName="transform"></animateTransform>
					</circle>
				</g>
			</svg>
		</motion.div>
	)
}

export default LoadingScreen
