import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-fit max-h-[80vh] py-10 w-[28vw] z-50 backdrop-blur-3xl bg-[#00011] overflow-auto flex justify-center rounded-4xl drop-shadow-lg scrollbar-none">
        <div className="h-fit w-[90%] rounded-4xl flex flex-col gap-[1.5vw]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
