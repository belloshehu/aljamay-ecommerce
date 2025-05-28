import { cn } from "@/lib/utils";

export default function ErrorText({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return <small className={cn("text-sm text-red-500", className)}>{message}</small>;
}
