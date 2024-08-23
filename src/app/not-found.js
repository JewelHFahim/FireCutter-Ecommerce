import Link from "next/link";
import React from "react";

const Notfound = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-medium">404 | Not Found</h1>
      <Link href="/" className="text-blue-600">Back Home</Link>
    </div>
  );
};

export default Notfound;
