import { cn } from "@/lib/utils";

export default function Loader({
	message,
	fullScreen,
}: {
	message?: string;
	fullScreen?: boolean;
}) {
	return (
		<div
			className={cn("flex items-center justify-center", {
				"h-[50vh]": fullScreen,
			})}
		>
			<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600"></div>
			<span className="ml-4 text-lg text-gray-700">
				{message || "Loading..."}
			</span>
		</div>
	);
}
