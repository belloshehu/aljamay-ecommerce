"use client";
import { useSearchParams } from "next/navigation";
import { RedirectToMobile } from "@/components/redirect/RedirectToMobile";

const LoginRedirectPage = () => {
	const token = useSearchParams().get("token");
	return (
		<RedirectToMobile
			param={token as string}
			description="
				You will be redirected to Aljamay mobile app to continue with login."
			title="Login redirect"
			redirectUrl={"aljamay://user/login-verify?token=" + token}
		/>
	);
};

export default LoginRedirectPage;
