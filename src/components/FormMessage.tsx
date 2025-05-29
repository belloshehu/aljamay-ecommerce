import React from "react";
import { StopCircle, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FormMessage = ({
	message,
}: {
	message: { text: string; type: "success" | "failure" };
}) => {
	if (!message || !message.text) return null;
	return (
		<div
			className={cn(
				"transition-all duration-300  w-full absolute -top-4 left-0 my-3",
				{
					"translate-x-0 scale-[100%]": message.text,
					"-translate-x-[100%] scale-[30%]": !message.text,
				}
			)}
		>
			{message.text && (
				<div
					className={`flex gap-2 items-center ${
						message.type === "success" ? "text-green-700" : "text-red-700"
					} bg-slate-50 w-full justify-center px-2`}
				>
					{message.type === "success" ? (
						<ThumbsUp className="text-lg" />
					) : (
						<StopCircle className="text-lg" />
					)}
					<p>{message.text}</p>
				</div>
			)}
		</div>
	);
};

export default FormMessage;
