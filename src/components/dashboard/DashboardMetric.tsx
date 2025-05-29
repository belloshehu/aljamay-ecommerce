import { Card, CardContent, CardHeader } from "../ui/card";

export default function DashboardMetric({
	title,
	metric,
}: {
	title?: string;
	metric: number;
}) {
	return (
		<Card className="hover:transition-all hover:scale-105 duration-200 text-white bg-gradient-to-l from-green-900 to-cyan-700 flex flex-col justify-between">
			<CardHeader>
				<h2 className=" font-semibold md:text-xl md:font-bold text-cyan-100">
					{title}
				</h2>
			</CardHeader>
			<CardContent className="font-medium">{metric}</CardContent>
		</Card>
	);
}
