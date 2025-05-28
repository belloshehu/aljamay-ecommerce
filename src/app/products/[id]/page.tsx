import ProductDetailSection from "@/components/products/product.detail";
import { getProductById } from "@/app/actions/product.action";
import { ProductType } from "@/types/product.types";
import Image from "next/image";

type Params = Promise<{ id: string }>;

export default async function ProductDetailPage(props: { params: Params }) {
	const params = await props.params;
	const product = await getProductById(params.id);

	if (!product) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<h1 className="text-xl font-semibold text-red-500">
						Product not found
					</h1>
				</div>
			</section>
		);
	}

	return (
		<section className="w-full p-5 md:p-20">
			<div className="w-full flex flex-col md:flex-row gap-8">
				<section className="w-full md:w-1/2">
					<Image
						src={product?.image}
						alt={product?.name}
						className="w-full h-[400px] aspect-square object-cover"
					/>
					{/* thumbnail container */}
					<div className="flex justify-start items-center gap-4 my-3">
						<Image
							src={product?.image}
							alt={product?.name}
							className="aspect-auto object-cover"
							width={100}
							height={20}
						/>
						<Image
							src={product?.image}
							alt={product?.name}
							className="aspect-auto object-cover"
							width={100}
							height={20}
						/>
						<Image
							src={product?.image}
							alt={product?.name}
							className="aspect-auto object-cover"
							width={100}
							height={20}
						/>
					</div>
				</section>

				{/* details section */}
				<ProductDetailSection product={product as ProductType} />
			</div>
		</section>
	);
}
