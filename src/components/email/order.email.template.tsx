import * as React from "react";
import { Body, Heading, Head, Link, Img } from "@react-email/components";
import { UserType } from "@/types/user.types";
import { OrderType } from "@/types/order.types";
//@ts-ignore
interface EmailTemplateProps {
	order: OrderType;
	user: UserType;
	orderLink: string;
}

export function OrderEmailTemplate({
	order,
	user,
	orderLink,
}: EmailTemplateProps) {
	return (
		<div>
			<Head>
				<Heading>Order confirmation</Heading>
				<h2>Hi {user.firstName + " " + user.lastName}!</h2>
			</Head>
			<Body>
				<p>
					Your order was successful and it is being prepared for delivery
					depending on your delivery method of choise.
				</p>

				<h2>Order ID: {order.id}</h2>
				<p>Order status: {order.status}</p>

				<ul
					style={{
						gap: 5,
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "flex-start",
					}}
				>
					<h5>Products:</h5>
					{order.orderItems.map((item) => (
						<div
							key={item.product.id}
							style={{ borderWidth: 1, borderRadius: 20, padding: 10 }}
						>
							<Img
								src={item.product.image}
								key={item.id}
								width={200}
								height={100}
							/>
							<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
								<p>{item.product.name}</p>
								<p>
									(<span style={{ textDecorationLine: "line-through" }}>N</span>
									{item.price}
								</p>
								)
							</div>
						</div>
					))}
				</ul>
				<h6>
					Cost: <span style={{ textDecorationLine: "line-through" }}>N</span>
					{order.totalAmount}{" "}
				</h6>

				<p>
					<Link
						href={orderLink}
						style={{
							backgroundColor: "#ADF802",
							color: "#fff",
							padding: "12px 20px",
							textDecoration: "none",
							borderRadius: "6px",
							display: "inline-block",
						}}
					>
						View order
					</Link>
				</p>

				<p>
					Kindly ensure that your address is correct to avoid delivery order to
					a wrong place.
				</p>
			</Body>
		</div>
	);
}
