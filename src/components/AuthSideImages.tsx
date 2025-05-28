import Image from "next/image";
import React from "react";

export const AuthSideImages = () => {
	return (
		<div className="hidden  w-4/5 md:flex justify-center items-center relative">
			<Image
				src="/images/person.png"
				alt="bakery"
				className="rounded-full aspect-square object-cover shadow-2xl animate-pulse absolute left-0"
				width={400}
				height={400}
			/>
			<Image
				src="/images/lady.jpg"
				alt="bakery"
				className="rounded-full aspect-square object-cover shadow-2xl animate-pulse absolute top-20 right-0"
				width={400}
				height={400}
			/>
		</div>
	);
};
