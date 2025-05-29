import { signOutAction } from "@/app/actions/auth.action";

export default function LogOutButtonWrapper({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<form
			action={async () => {
				await signOutAction();
			}}
			className={className}
		>
			<button type="submit" className="w-full">
				{children}
			</button>
		</form>
	);
}
