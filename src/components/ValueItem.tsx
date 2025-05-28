import React from "react";

interface ValueItemProps {
	title: string;
	description: string;
	icon: React.ReactNode;
}
export const ValueItem = ({ title, description, icon }: ValueItemProps) => {
	return (
		<div className="rounded-md shadow-md p-5 md:p-10 md:py-16 bg-white flex flex-col justify-center items-center gap-5 text-center hover:scale-105 transition-all duration-200">
			<div className="text-xl text-cyan-700 font-semibold capitalize flex items-center gap-2">
				<h1 className="text-5xl">{icon}</h1>
				<h3>{title}</h3>
			</div>
			<p>{description}</p>
		</div>
	);
};
