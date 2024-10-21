"use client";

import { useEffect, useRef, useState } from "react";
import FlipClock from "../components/FlipClock";
import { DatePicker } from "../components/DatePicker";
import { EnterFullScreenIcon, ExitFullScreenIcon } from "@radix-ui/react-icons";

export default function Home() {
	const [targetDate, setTargetDate] = useState(new Date("2025-01-01"));
	const [isInitialized, setIsInitialized] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);

	const mainRef = useRef<HTMLDivElement>(null);

	// Retrieve target date from localStorage after component mounts
	useEffect(() => {
		const storedDate = localStorage.getItem("targetDate");
		if (storedDate) {
			setTargetDate(new Date(storedDate));
		}
		setIsInitialized(true); // Indicate that initialization is complete
	}, []);

	// Update localStorage whenever targetDate changes (after initialization)
	useEffect(() => {
		if (isInitialized) {
			localStorage.setItem("targetDate", targetDate.toString());
		}
	}, [targetDate, isInitialized]);

	const toggleFullScreen = () => {
		const element = mainRef.current;

		if (element && !document.fullscreenElement) {
			element.requestFullscreen().then(() => {
				setIsFullScreen(true);
			});
		} else {
			document.exitFullscreen().then(() => {
				setIsFullScreen(false);
			});
		}
	};

	return (
		<main
			className="p-5 min-h-screen flex justify-center items-center relative"
			ref={mainRef}
		>
			<div className="absolute top-5 right-5">
				{isFullScreen ? (
					<ExitFullScreenIcon
						fill="#fff"
						height={30}
						width={30}
						className="transition-all hover:scale-110 cursor-pointer"
						onClick={toggleFullScreen}
					/>
				) : (
					<EnterFullScreenIcon
						fill="#fff"
						height={30}
						width={30}
						className="transition-all hover:scale-110 cursor-pointer"
						onClick={toggleFullScreen}
					/>
				)}
			</div>
			<div className={`flex flex-col items-center justify-center gap-20`}>
				<DatePicker date={targetDate} setDate={setTargetDate} />

				<h1 className="text-white font-bold text-2xl sm:text-3xl md:text-5xl">
					You Have
				</h1>
				<FlipClock targetDate={targetDate} />

				<footer className="absolute bottom-5">
					Made with ❤️ by{" "}
					<a
						href="https://ayushchugh.com"
						target="_blank"
						className="underline"
					>
						Ayush Chugh
					</a>
					, Follow me on{" "}
					<a target="_blank" href="https://x.com/aayushchugh_x">
						𝕏
					</a>
				</footer>
			</div>
		</main>
	);
}
