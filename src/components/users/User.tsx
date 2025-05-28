export default function User({
	user,
}: {
	user: { firstName: string; lastName: string; email: string; role: string };
}) {
	return (
		<div className="p-4 bg-white shadow rounded-lg w-full">
			<h2 className="text-xl font-semibold mb-2">
				{user.firstName} {user.lastName}
			</h2>
			<p className="text-gray-700 mb-1">Email: {user.email}</p>
			<p className="text-gray-700">Role: {user.role}</p>
		</div>
	);
}
