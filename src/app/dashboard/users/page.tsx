import User from "@/components/users/User";
import { getUsers } from "../../actions/user.actions";
import { UserType } from "@/types/user.types";

export default async function UsersPage() {
	const users = await getUsers(20, 0);

	if (!users) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<h1 className="text-xl font-semibold text-red-500">
						Users not found
					</h1>
				</div>
			</section>
		);
	}

	return (
		<div className="w-full">
			{/* <h1 className="text-2xl font-bold mb-4">Users ({users.length})</h1> */}
			{/* Add more dashboard content here */}
			<section className="w-full">
				<ul className="w-full">
					{users.map((user: UserType) => (
						<User user={user} key={user.id} />
					))}
				</ul>
			</section>
		</div>
	);
}
