"use client";
import { useSearchParams } from "next/navigation";
import { RedirectToMobile } from "@/components/redirect/RedirectToMobile";

const ResetRedirectPage = () => {
	const token = useSearchParams().get("token");
	return (
		<RedirectToMobile
			param={token as string}
			description="
				You will be redirected to continue password reset on Aljamay mobile app"
			title="Reset redirect"
			redirectUrl={"aljamay://user/password-reset?token=" + token}
		/>
	);
};

export default ResetRedirectPage;
