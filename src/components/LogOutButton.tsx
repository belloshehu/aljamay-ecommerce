import { signOutAction } from "@/app/actions/auth.action";

export default function LogOutButtonWrapper({
	children,
}: {
	children?: React.ReactNode;
}) {
	return (
		<form
			action={async () => {
				await signOutAction();
			}}
		>
			<button type="submit">{children}</button>
		</form>
	);
}
