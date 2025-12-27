import * as React from "react";
import { Body, Heading, Head, Link } from "@react-email/components";
//@ts-ignore
interface EmailTemplateProps {
	firstName: string;
	expiresIn: string;
	link: string;
}

export function EmailVerificationTemplate({
	firstName,
	expiresIn,
	link,
}: EmailTemplateProps) {
	return (
		<div>
			<Head>
				<Heading>Email Verification</Heading>
				<h4>Hi {firstName}!</h4>
			</Head>
			<Body>
				<p>Click the button below to proceed with email verification:</p>
				<p>
					<Link
						href={link}
						style={{
							backgroundColor: "#ADF802",
							color: "#000",
							padding: "12px 20px",
							textDecoration: "none",
							borderRadius: "6px",
							display: "inline-block",
						}}
					>
						Verify email
					</Link>
				</p>
				<p>Or you copy paste the code to continue.</p>
				<p>This code will expire in {expiresIn} minutes.</p>
				<p>
					If you did not request email verifcation, you can safely ignore this
					email.
				</p>
			</Body>
		</div>
	);
}
