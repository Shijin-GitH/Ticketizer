import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-fit py-10 w-[30%] z-50 backdrop-blur-3xl bg-[#00011] flex justify-center items-center rounded-4xl drop-shadow-lg">
        <div className="h-fit w-[90%] rounded-4xl flex flex-col gap-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
