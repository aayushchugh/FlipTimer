import React, { FC, useEffect, useState } from "react";
import FlipCard from "./FlipCard";
import Column from "./Column";

interface IFlipClockProps {
	targetDate: Date;
}

const FlipClock: FC<IFlipClockProps> = ({ targetDate }) => {
	const [timeLeft, setTimeLeft] = useState({
		months: 0,
		weeks: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// calculate time
	const calculateTimeLeft = () => {
		const difference = +new Date(targetDate) - +new Date();

		if (difference > 0) {
			setTimeLeft({
				months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)), // 30 days
				weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)), // 7 days
				days: Math.floor(difference / (1000 * 60 * 60 * 24)), // 24 hours
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24), // 60 minutes
				minutes: Math.floor((difference / 1000 / 60) % 60), // 60 seconds
				seconds: Math.floor((difference / 1000) % 60), // 1000 milliseconds
			});
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			calculateTimeLeft();
		}, 1000);

		return () => clearTimeout(timer);
	});
	return (
		<div className="flex items-center gap-1 sm:gap-3 md:gap-5 lg:gap-7">
			<div className="flex items-center">
				<FlipCard title="Months" value={timeLeft?.months.toString()} />
				<Column />
			</div>

			<div className="flex items-center">
				<FlipCard title="Weeks" value={timeLeft?.weeks.toString()} />
				<Column />
			</div>

			<div className="flex items-center">
				<FlipCard title="Days" value={timeLeft?.days.toString()} />
				<Column />
			</div>

			<div className="flex items-center">
				<FlipCard title="Hours" value={timeLeft?.hours.toString()} />
				<Column />
			</div>

			<div className="flex items-center">
				<FlipCard title="Minutes" value={timeLeft?.minutes.toString()} />
				<Column />
			</div>

			<FlipCard title="Seconds" value={timeLeft?.seconds.toString()} />
		</div>
	);
};

export default FlipClock;
