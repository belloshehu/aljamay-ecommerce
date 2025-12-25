import { Body, Heading, Head, Link } from "@react-email/components";
//@ts-ignore
interface EmailTemplateProps {
	firstName: string;
	link: string;
	expiresIn: string;
}

export function LoginEmailTemplate({
	firstName,
	link,
	expiresIn,
}: EmailTemplateProps) {
	return (
		<div>
			<Head>
				<Heading>Login verification link</Heading>
				<h4>Hi {firstName}!</h4>
			</Head>
			<Body>
				<p>Click the button below to proceed with login:</p>

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
						Continue with login
					</Link>
				</p>

				<p>This link will expire in {expiresIn} minutes.</p>

				<p>If you did not request login, you can safely ignore this email.</p>
			</Body>
		</div>
	);
}
