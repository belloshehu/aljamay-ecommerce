import React, { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<section className="w-full p-2 md:p-20 min-h-screen">{children}</section>
	);
};

export default PageWrapper;
