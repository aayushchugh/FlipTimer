// FlipCard.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FlipCardProps {
	digit: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ digit }) => {
	return (
		<div
			className={`relative  w-16 h-24 text-5xl sm:w-20 sm:h-28 sm:text-6xl bg-neutral-900 rounded-lg overflow-hidden`}
		>
			<div className="absolute inset-0 flex items-center justify-center text-white font-bold">
				{digit}
			</div>
			<div className="absolute inset-x-0 top-1/2 h-px bg-black/30" />
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="w-full h-1/2 bg-black/10" />
			</div>
		</div>
	);
};

interface AnimatedFlipCardProps {
	title: string;
	digit: string;
	className?: string;
}

export const AnimatedFlipCard: React.FC<AnimatedFlipCardProps> = ({
	title,
	digit,
	className,
}) => {
	return (
		<div className={`flex flex-col items-center ${className}`}>
			<div className={`relative w-16 h-24 sm:w-20 sm:h-28 overflow-x-auto`}>
				<AnimatePresence initial={false}>
					<motion.div
						key={digit}
						initial={{ rotateX: -90 }}
						animate={{ rotateX: 0 }}
						exit={{ rotateX: 90 }}
						transition={{ duration: 0.3 }}
						style={{ transformOrigin: "bottom" }}
						className="absolute inset-0"
					>
						<FlipCard digit={digit} />
					</motion.div>
				</AnimatePresence>
			</div>
			<span className="text-xs sm:text-sm font-medium text-gray-600">
				{title}
			</span>
		</div>
	);
};
