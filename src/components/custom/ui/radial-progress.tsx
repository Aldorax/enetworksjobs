import React, { useState, useEffect } from "react";

export default function RadialProgress({ progress }: { progress: number }) {
  // State to hold the progress value
  const [currentProgress, setCurrentProgress] = useState(progress);

  // Effect to update the progress value over time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 1;
      });
    }, 100); // Adjust the interval as needed

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="inline-flex items-center justify-center overflow-hidden rounded-full">
      <svg className="h-20 w-20">
        <circle
          className="text-gray-300"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-black"
          strokeWidth="4"
          strokeDasharray={30 * 2 * Math.PI}
          strokeDashoffset={100 - (currentProgress / 100) * 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-sm text-black">{currentProgress}%</span>
    </div>
  );
}
