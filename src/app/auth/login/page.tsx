"use client";
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { AuthSideImages } from "@/components/AuthSideImages";
import { AuthHeader } from "@/components/AuthHeader";
import PageWrapper from "@/components/PageWrapper";

const LoginPage = () => {
	return (
		<PageWrapper>
			<div className="auth-page grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
				<div className="w-full m-auto p-2 block pb-10 bg-opacity-50">
					<AuthHeader authTitle={"Login"} />
					<LoginForm />
				</div>
				<AuthSideImages />
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
