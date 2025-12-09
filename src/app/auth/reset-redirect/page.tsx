"use client";
import React, { useEffect } from "react";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthSideImages } from "@/components/AuthSideImages";
import PageWrapper from "@/components/PageWrapper";
import { useSearchParams } from "next/navigation";

const ResetRedirectPage = () => {
	const token = useSearchParams().get("token");

	useEffect(() => {
		if (!token) return;
		console.log("token", token);

		// Try to open the mobile app
		window.location.href = "aljamay://user/password-reset?token=" + token;
	}, []);

	return (
		<PageWrapper>
			<div className="auth-page grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
				<div className="w-full m-auto p-2 block pb-10  bg-opacity-50">
					<AuthHeader authTitle={"Reset redirect"} />
					<div className="w-2/3 gap-10 m-auto">
						<p>
							You will be redirected to continue password reset on Aljamay
							mobile app
						</p>

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

export default ResetRedirectPage;
