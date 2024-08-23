import React from "react";

const LoadingCard = () => {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {Array.from({ length: 8 }).map((i) => (
        <div
          key={i}
          className="rounded-md bg-slate-300 animate-pulse flex flex-col gap-4 h-80 sm:w-[45%] lg:w-[22%]"
        >
        </div>
      ))}
    </div>
  );
};

export default LoadingCard;
