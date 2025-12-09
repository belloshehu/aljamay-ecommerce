import Image from "next/image";

export default function User({
	user,
}: {
	user: {
		firstName: string;
		lastName: string;
		email: string;
		role: string;
		image?: string | null;
	};
}) {
	const image = user?.image ? user.image : "/images/users/man.png";
	return (
		<div className="p-4 bg-white shadow rounded-lg w-full flex flex-col md:flex-row gap-5">
			<Image src={image} alt={user.firstName} width={80} height={20} />
			<div>
				<h2 className="font-semibold">
					{user.firstName} {user.lastName}
				</h2>
				<p className="text-gray-700 mb-1">{user.email}</p>
				<p className="text-gray-700 text-sm">{user.role}</p>
			</div>
		</div>
	);
}
