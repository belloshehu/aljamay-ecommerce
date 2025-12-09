import { cn } from "@/lib/utils";
import getIcon, { IconType } from "../../../public";

export default function ProductCategoryItem({
	isActive,
	name,
	icon,
	clickHandler,
}: {
	isActive: boolean;
	name: string;
	icon: IconType;
	clickHandler: () => void;
}) {
	return (
		<button
			className={cn(
				"flex flex-col items-center justify-center gap-0 p-1 px-4 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#ADF802] text-gray-500",
				{
					"text-black bg-[#ADF802] hover:text-gray-500": isActive,
				}
			)}
			aria-label="category-item"
			onClick={(e) => {
				e.stopPropagation();
				clickHandler();
			}}
		>
			{/* <span>{getIcon(icon, "w-5 h-5 p-0")}</span> */}
			<small className=" p-0">{name}</small>
		</button>
	);
}
