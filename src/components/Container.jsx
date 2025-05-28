import React from "react";

const Container = ({ children, bgColor = "bg-white" }) => {
  return (
    <div
      className={`flex flex-col gap-10 justify-center items-center min-h-screen w-full p-5 md:p-20 ${bgColor}`}>
      {children}
    </div>
  );
};

export default Container;
