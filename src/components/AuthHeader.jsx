import React from "react";
import Heading from "./Heading";
import { Brand } from "./Brand";

export const AuthHeader = ({ authTitle }) => {
	return (
		<div className="flex justify-between items-center w-full md:w-3/4 mx-auto bg-gradient-to-tr from-green-800 to-cyan-500 text-white rounded-md mb-2">
			<Brand />
			<Heading text={authTitle} style="" />
		</div>
	);
};
