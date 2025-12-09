import { signJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		return Response.json(
			{ error: "Invalid credentials" },
			{ status: StatusCodes.UNAUTHORIZED }
		);
	}

	const valid = await compare(password, user.password);
	if (!valid) {
		return Response.json(
			{ error: "Invalid credentials" },
			{ status: StatusCodes.UNAUTHORIZED }
		);
	}

	// Create JWT manually
	const token = await signJWT({
		id: user.id,
		email: user.email,
	});

	return Response.json({ data: { token, user }, message: "Login success" });
}
