"use client";
import { useSearchParams } from "next/navigation";
import { RedirectToMobile } from "@/components/redirect/RedirectToMobile";

const EmailVerificationRedirectPage = () => {
	const token = useSearchParams().get("token");
	return (
		<RedirectToMobile
			param={token as string}
			description="
                You will be redirected to Aljamay mobile app to continue with email verification."
			title="Email verification redirect"
			redirectUrl={"aljamay://user/email-verify?token=" + token}
		/>
	);
};

export default EmailVerificationRedirectPage;
