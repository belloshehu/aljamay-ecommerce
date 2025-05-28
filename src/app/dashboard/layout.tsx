import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import { auth } from "../../../auth";
import { Session } from "next-auth";
export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	return (
		<div className="flex flex-col min-h-screen">
			{/* <header className="bg-gray-800 text-white p-4">
				<h1 className="text-xl font-bold">Dashboard</h1>
			</header> */}

			<div className="grid grid-cols-1 md:grid-cols-6 overflow-y-auto p-4 gap-10">
				<DashboardNavigation session={session as Session} />
				<section className="col-span-5">{children}</section>
			</div>
		</div>
	);
}
