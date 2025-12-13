import { RedirectToMobile } from "@/components/redirect/RedirectToMobile";

type Params = Promise<{ id: string }>;
export default async function OrderListRedirectPage(props: { params: Params }) {
	// Id of the order
	const { id } = await props.params;
	return (
		<RedirectToMobile
			param={id}
			description="You will be redirected to view your order on Aljamay mobile app"
			title="Order redirect"
			redirectUrl={"aljamay://user/orders/" + id}
		/>
	);
}
