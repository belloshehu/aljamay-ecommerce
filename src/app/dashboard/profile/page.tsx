import { UserType } from "@/types/user.types";
import { auth } from "../../../../auth";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Edit } from "lucide-react";

export default async function ProfilePage() {
	const {
		user: { firstName, lastName, email },
	} = (await auth()) as { user: UserType };
	return (
		<div className="w-full">
			{/* <h1 className="text-2xl font-bold mb-4">Users ({users.length})</h1> */}
			{/* Add more dashboard content here */}
			<section className="w-full flex flex-col gap-6">
				<Card className="bg-gradient-to-b from-cyan-500 to-green-700 text-white">
					<CardHeader>
						<div className="flex items-center gap-4">
							<h2 className="text-lg font-semibold">
								{firstName} {lastName}
							</h2>
							<Image
								src={"/images/users/man.png"}
								alt="avatar"
								height={50}
								width={50}
								className="ml-auto"
							/>
						</div>
						<p className="text-sm text-slate-200">{email}</p>
					</CardHeader>
				</Card>

				<div className="w-full md:w-5/6 flex flex-col gap-8 self-center">
					<Card className="w-full">
						<CardHeader className="flex items-center justify-start gap-2">
							<h3> Shipping address </h3>
							<Edit size={20} />
						</CardHeader>
					</Card>

					<Card>
						<CardHeader className="flex items-center justify-start gap-2">
							<h3> Billing info </h3>
							<Edit size={20} />
						</CardHeader>
					</Card>
				</div>
			</section>
		</div>
	);
}
