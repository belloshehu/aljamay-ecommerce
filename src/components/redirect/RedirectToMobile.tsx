"use client";
import { useEffect } from "react";
import PageWrapper from "../PageWrapper";
import { AuthHeader } from "../AuthHeader";
import { AuthSideImages } from "../AuthSideImages";

export const RedirectToMobile = (props: {
	param: string;
	title: string;
	description: string;
	redirectUrl: string;
}) => {
	const { param, title, description, redirectUrl } = props;
	useEffect(() => {
		if (!param) return;
		// Try to open the mobile app
		window.location.href = redirectUrl;
	}, []);

	return (
		<PageWrapper>
			<div className="auth-page grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
				<div className="w-full m-auto p-2 block pb-10  bg-opacity-50">
					<AuthHeader authTitle={title} />
					<div className="w-2/3 gap-10 m-auto">
						<p>{description}</p>

						<h1 className="mt-10 bg-amber-500 p-5 rounded-xl">
							Please wait...
						</h1>
					</div>
				</div>
				<AuthSideImages />
			</div>
		</PageWrapper>
	);
};
