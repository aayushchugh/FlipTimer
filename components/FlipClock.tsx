// FlipClock.tsx
import React, { FC, useEffect, useState } from "react";
import { AnimatedFlipCard } from "./FlipCard";
import Column from "./Column";

interface IFlipClockProps {
	targetDate: Date;
}

const FlipClock: FC<IFlipClockProps> = ({ targetDate }) => {
	const [isTimesUp, setIsTimesUp] = useState(false);
	const [timeLeft, setTimeLeft] = useState({
		months: 0,
		weeks: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// Calculate time left
	const calculateTimeLeft = () => {
		const difference = targetDate.getTime() - new Date().getTime();

		if (difference > 0) {
			setIsTimesUp(false);
			setTimeLeft({
				months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)), // Approximate months
				weeks: Math.floor((difference / (1000 * 60 * 60 * 24 * 7)) % 4), // Weeks in a month
				days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7), // Days in a week
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24), // Hours in a day
				minutes: Math.floor((difference / (1000 * 60)) % 60), // Minutes in an hour
				seconds: Math.floor((difference / 1000) % 60), // Seconds in a minute
			});
		} else {
			setIsTimesUp(true);
			setTimeLeft({
				months: 0,
				weeks: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			});
		}
	};

	useEffect(() => {
		calculateTimeLeft();
		const timer = setInterval(() => {
			calculateTimeLeft();
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex items-center gap-1 sm:gap-3 md:gap-5 lg:gap-7">
				<div className="flex items-center">
					<AnimatedFlipCard title="Months" digit={timeLeft.months.toString()} />
					<Column />
				</div>
				<div className="flex items-center">
					<AnimatedFlipCard title="Weeks" digit={timeLeft.weeks.toString()} />
					<Column />
				</div>
				<div className="flex items-center">
					<AnimatedFlipCard title="Days" digit={timeLeft.days.toString()} />
					<Column />
				</div>
				<div className="flex items-center">
					<AnimatedFlipCard
						title="Hours"
						digit={timeLeft.hours.toString().padStart(2, "0")}
					/>
					<div className="hidden sm:flex">
						<Column />
					</div>
				</div>
				<div className="hidden sm:flex items-center">
					<AnimatedFlipCard
						title="Minutes"
						digit={timeLeft.minutes.toString().padStart(2, "0")}
					/>
					<Column />
				</div>

				<div className="hidden sm:flex">
					<AnimatedFlipCard
						title="Seconds"
						digit={timeLeft.seconds.toString().padStart(2, "0")}
					/>
				</div>
			</div>

			{isTimesUp && (
				<div className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl text-red-500 mt-10 font-bold">
					Times Up!
				</div>
			)}
		</div>
	);
};

export default FlipClock;
