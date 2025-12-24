import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = withAuth(async (request, user) => {
	return NextResponse.json({
		data: `Good morning ${user.firstName}`,
	});
});
