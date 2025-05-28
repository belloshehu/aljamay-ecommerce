import React from "react";
import { ValueItem } from "@/components/ValueItem";
import Container from "@/components/Container";
import { BrushCleaning, Coins, Hospital } from "lucide-react";

export const Values = () => {
	return (
		<Container bgColor="bg-slate-100">
			<h1 className="bg-gradient-to-r text-transparent from-green-800 via-black to-cyan-500 font-extrabold bg-clip-text text-3xl lg:text-7xl my-5 text-center md:text-center">
				Our core values
			</h1>
			<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
				<ValueItem
					title="Health"
					description={
						"All ingredients used in the production of our products are proven to be healthy for all consumers. "
					}
					icon={<Hospital size={50} className="" />}
				/>
				<ValueItem
					title="Hygiene"
					description={
						"Our products are produced under clean and hygienic environment and following standard production procedure."
					}
					icon={<BrushCleaning size={50} className="" />}
				/>
				<ValueItem
					title="Affordability"
					description={
						"Despite mushrooming price of commodities, we strive to keep our prices as low as possible to make them affordable"
					}
					icon={<Coins size={50} className="" />}
				/>
			</div>
		</Container>
	);
};
