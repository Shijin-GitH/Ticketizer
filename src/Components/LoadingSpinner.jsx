import React from "react";

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-[#90FF00]"></div>
    </div>
  );
}

export default LoadingSpinner;
