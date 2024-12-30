"use client";

import { useEffect, useRef, useState } from "react";
import FlipClock from "../components/FlipClock";
import { DatePicker } from "../components/DatePicker";
import { EnterFullScreenIcon, ExitFullScreenIcon } from "@radix-ui/react-icons";

export default function Home() {
  const today = new Date();
  const nextYear = today.getFullYear() + 1;
  const [targetDate, setTargetDate] = useState(new Date(nextYear, 0, 1));
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);

  // Retrieve target date from localStorage after component mounts
  useEffect(() => {
    const storedDate = localStorage.getItem("targetDate");
    if (storedDate) {
      // don't set target date if it's in the past
      if (new Date(storedDate) < new Date()) {
        return;
      }

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

  // Global event listener to toggle fullscreen
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "f") {
        toggleFullScreen();
      }
    });

    // clear event listener on unmount
    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

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
