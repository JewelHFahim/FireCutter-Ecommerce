"use client"

import React from "react";
import Confetti from "react-confetti"

const SuccessPage = () => {
  return (
    <div className="flex flex-col justify-center items-center  overflow-hidden h-[calc(100vh-80px)] gap-2">
      <Confetti width={1400} height={800}/>
      <h2 className="text-5xl text-green-500">Successful</h2>
      <p className="font-medium">We sent invoice in your e-mail.</p>
    </div>
  );
};

export default SuccessPage;
