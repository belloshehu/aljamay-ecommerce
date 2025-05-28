"use client";
import React from "react";
import SignupForm from "@/components/auth/SignupForm";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthSideImages } from "@/components/AuthSideImages";
import PageWrapper from "@/components/PageWrapper";

const SignupPage = () => {
	return (
		<PageWrapper>
			<div className="auth-page grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
				<div className="w-full m-auto p-2 block pb-10  bg-opacity-50">
					<AuthHeader authTitle={"Signup"} />
					<SignupForm />
				</div>
				<AuthSideImages />
			</div>
		</PageWrapper>
	);
};

export default SignupPage;
