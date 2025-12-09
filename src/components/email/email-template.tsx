import * as React from "react";
import { Body, Heading, Head, Link } from "@react-email/components";
//@ts-ignore
interface EmailTemplateProps {
	firstName: string;
	bodyText: string;
	expiresIn: string;
}

export function EmailTemplate({
	firstName,
	bodyText,
	expiresIn,
}: EmailTemplateProps) {
	return (
		<div>
			<Head>
				<Heading>Email Verification</Heading>
				<h1>Hi {firstName}!</h1>
			</Head>
			<Body>
				<p>{bodyText}</p>
			</Body>

			<p>This code will expire in {expiresIn} minutes.</p>

			<p>
				If you did not request email verifcation, you can safely ignore this
				email.
			</p>
		</div>
	);
}
