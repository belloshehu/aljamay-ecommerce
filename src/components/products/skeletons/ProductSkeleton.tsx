import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
	return (
		<Card className="flex flex-col gap-5 p-2 ">
			{/* product image */}
			<Skeleton className="h-48 w-full rounded-md" />
			<Skeleton className="h-6 w-full" />
			<div className="grid grid-cols-6 gap-4 w-full">
				<Skeleton className="h-5 col-span-2" />
				<Skeleton className="h-6 rounded-full col-span-1" />
				<Skeleton className="h-8 rounded-3xl col-span-3" />
			</div>
			<Skeleton className="h-10 w-full mt-4" />
		</Card>
	);
}

export function ProductListSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-5 md:px-20 mb-10">
			{Array.from({ length: 8 }).map((_, index) => (
				<ProductSkeleton key={index} />
			))}
		</div>
	);
}
