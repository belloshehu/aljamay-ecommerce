import { getCartItems } from "@/app/actions/cart.action";
import CartItem from "@/components/cart/CartItem";

type Params = Promise<{ id: string }>;

export default async function ShoppingCartPage(props: { params: Params }) {
	const params = await props.params;
	const cartItems = await getCartItems();

	if (!cartItems || cartItems.length === 0) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<h1 className="text-xl font-semibold text-red-500">
						Cart items not found
					</h1>
				</div>
			</section>
		);
	}

	return (
		<section className="w-full p-5 md:p-20">
			<header>
				<h2>Cart Items({cartItems.length})</h2>
			</header>
			<div className="w-full flex flex-col gap-8">
				{cartItems.map((item) => (
					<CartItem {...item} />
				))}
			</div>
		</section>
	);
}
