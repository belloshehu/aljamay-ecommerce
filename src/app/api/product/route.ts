import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromSessionOrJWT } from "@/lib/auth";
import { UserType } from "@/types/user.types";

export async function POST(request: NextRequest) {
	try {
		const user = (await getUserFromSessionOrJWT(request)) as UserType;

		if (user.role !== "ADMIN") {
			return NextResponse.json(
				{ message: "You do not have permission to create a product" },
				{ status: 403 }
			);
		}

		const body = await request.json();
		const product = await prisma.product.create({
			data: { userId: user.id, ...body },
		});
		return NextResponse.json({ data: product }, { status: 200 });
	} catch (error: any) {
		console.error("Error creating product:", error);
		return NextResponse.json(
			{ message: "Failed to create product", error: error.message },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		let searchKey = request.nextUrl.searchParams.get("search");
		if (searchKey?.toLowerCase() == "all") {
			searchKey = "";
		}

		const products = await prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchKey ? searchKey : "",
							mode: "insensitive",
						},
					},
					{
						description: {
							contains: searchKey ? searchKey : "",
							mode: "insensitive",
						},
					},
				],
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(
			{ data: products, message: "Products fetched" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to fetch products",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
