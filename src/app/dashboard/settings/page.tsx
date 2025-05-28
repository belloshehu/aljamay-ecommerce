import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function SettingsPage() {
	return (
		<div className="w-full">
			{/* <h1 className="text-2xl font-bold mb-4">Users ({users.length})</h1> */}
			{/* Add more dashboard content here */}
			<section className="w-full flex flex-col gap-6 md:w-1/2">
				<Card>
					<CardHeader>Notification</CardHeader>
					<CardContent>Notification settings</CardContent>
				</Card>
				<Card>
					<CardHeader>Newsletter</CardHeader>
					<CardContent>Newsletter settings</CardContent>
				</Card>
				<Card>
					<CardHeader>Newsletter</CardHeader>
					<CardContent>Newsletter settings</CardContent>
				</Card>
			</section>
		</div>
	);
}
