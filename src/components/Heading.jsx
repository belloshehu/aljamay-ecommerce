import React from "react";

const Heading = ({ text, style }) => {
  return (
    <h2
      className={`animate-bounce text-2xl font-bold text-black md:text-3xl my-5 text-center border-b-4 border-cyan-900 pb-3 w-fit mx-auto mb-10 ${style}`}>
      {text}
    </h2>
  );
};

export default Heading;
