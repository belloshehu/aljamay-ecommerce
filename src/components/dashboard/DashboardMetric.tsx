import { Card, CardContent, CardHeader } from "../ui/card";

export default function DashboardMetric({
	title,
	metric,
}: {
	title?: string;
	metric: number;
}) {
	return (
		<Card className="hover:transition-all hover:scale-105 duration-200 text-gray-500 bg-white flex flex-col justify-between">
			<CardHeader>
				<h2 className=" font-semibold md:text-xl md:font-bold text-gray-700">
					{title}
				</h2>
			</CardHeader>
			<CardContent className="font-medium">{metric}</CardContent>
		</Card>
	);
}
