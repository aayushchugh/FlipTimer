import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface IFlipCardProps {
	title: string;
	value: string;
}

const FlipCard: FC<IFlipCardProps> = ({ title, value }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="relative w-12 h-16 sm:w-20 sm:h-24 md:w-20 md:h-24 lg:w-28 lg:h-32 bg-neutral-900 rounded-lg shadow-lg mb-2">
				<div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold text-white">
					<AnimatePresence mode="popLayout">
						<motion.div
							key={value}
							initial={{ rotateX: -90, opacity: 0 }}
							animate={{ rotateX: 0, opacity: 1 }}
							exit={{ rotateX: 90, opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							{value}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
			<span className="text-xs sm:text-sm font-medium text-gray-600">
				{title}
			</span>
		</div>
	);
};

export default FlipCard;
