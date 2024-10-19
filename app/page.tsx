"use client";

import { useEffect, useState } from "react";
import FlipClock from "../components/FlipClock";
import { DatePicker } from "../components/DatePicker";

export default function Home() {
	const [targetDate, setTargetDate] = useState(
		new Date(localStorage.getItem("targetDate") as string) ??
			new Date("2025-01-01")
	);

	// set target date to local storage
	useEffect(() => {
		localStorage.setItem("targetDate", targetDate.toString());
	}, [targetDate]);

	return (
		<main className="flex flex-col items-center justify-center h-screen gap-20">
			<DatePicker date={targetDate} setDate={setTargetDate} />

			<h1 className="text-white font-bold text-2xl sm:text-3xl md:text-5xl">
				You Have
			</h1>
			<FlipClock targetDate={targetDate} />

			<footer className="absolute bottom-5">
				Made with ❤️ by{" "}
				<a href="https://ayushchugh.com" target="_blank" className="underline">
					Ayush Chugh
				</a>
				, Follow me on{" "}
				<a target="_blank" href="https://x.com/aayushchugh_x">
					𝕏
				</a>
			</footer>
		</main>
	);
}
