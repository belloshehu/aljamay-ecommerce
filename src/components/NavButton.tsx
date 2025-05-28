import { cn, isActivePath } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavButtonProps extends React.ComponentProps<typeof Button> {
	children: React.ReactNode;
	pathname: string;
	currentPathname: string;
}

export function NavButton({
	children,
	pathname,
	currentPathname,
	className,
	...props
}: NavButtonProps) {
	return (
		<Button
			{...props}
			variant={"ghost"}
			className={cn(className, {
				"bg-blue-200 rounded-sm py-2": isActivePath(currentPathname, pathname),
			})}
		>
			{children}
		</Button>
	);
}
