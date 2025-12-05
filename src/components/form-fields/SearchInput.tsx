import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type SearchInputProps = {
	// Props type definition
	placeholder: string;
	className?: string;
};

export default function SearchInput({
	placeholder,
	className,
}: SearchInputProps) {
	const isMobile = useIsMobile();
	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-full border border-[#ADF802] hover:shadow-xl hover:shadow-slate-400 hover:drop-shadow-2xl bg-white",
				{ "w-full": isMobile },
				className
			)}
		>
			<Input
				type="text"
				className="outline-none border-none active:outline-none active:border-none rounded-full focus-visible:ring-[0px] bg-none focus-visible:ring-offset-[0px]"
				placeholder={placeholder || "Search"}
			/>
			<Button
				variant={"ghost"}
				className="outline-none bg-[#ADF802] rounded-full m-[1px] p-1 px-3"
				size={"icon"}
			>
				<Search className="text-white" />
				<span className="sr-only">Search Button</span>
			</Button>
		</div>
	);
}
