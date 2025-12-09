import * as React from "react";
import { Body, Heading, Head, Link } from "@react-email/components";
//@ts-ignore
interface EmailTemplateProps {
	firstName: string;
	link: string;
	expiresIn: string;
}

export function PassResetEmailTemplate({
	firstName,
	link,
	expiresIn,
}: EmailTemplateProps) {
	return (
		<div>
			<Head>
				<Heading>Password Reset link</Heading>
				<h1>Hi {firstName}!</h1>
			</Head>
			<Body>
				<p>
					You requested to reset your password. Click the button below to
					proceed:
				</p>

				<p>
					<Link
						href={link}
						style={{
							backgroundColor: "#ADF802",
							color: "#fff",
							padding: "12px 20px",
							textDecoration: "none",
							borderRadius: "6px",
							display: "inline-block",
						}}
					>
						Reset Password
					</Link>
				</p>

				<p>This link will expire in {expiresIn} minutes.</p>

				<p>
					If you did not request a password reset, you can safely ignore this
					email.
				</p>
			</Body>
		</div>
	);
}
