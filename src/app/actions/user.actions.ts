export async function getUsers(limit = 10, offset = 0) {
	try {
		const { prisma } = await import("@/lib/prisma");
		const users = await prisma.user.findMany({
			take: limit,
			skip: offset,
		});
		return users;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw new Error("Failed to fetch users");
	}
}
