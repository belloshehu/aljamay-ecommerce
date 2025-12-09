import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const res = await fetch(
			`https://api.flutterwave.com/v3/transactions/${body.id}/verify`,

			{
				headers: {
					Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
				},
			}
		);

		const data = await res.json();

		if (data.status === "success" && data.data.status === "successful") {
			return NextResponse.json({ success: true, data: data.data });
		}
		return NextResponse.json({ success: false, data });
	} catch (error) {
		return NextResponse.json({ error: "Failed to verify transaction" });
	}
}
