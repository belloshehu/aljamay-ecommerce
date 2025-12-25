import ProductDetailSection from "@/components/products/product.detail";
import { getProductById } from "@/app/actions/product.action";
import { ProductType } from "@/types/product.types";
import Image from "next/image";

type Params = Promise<{ id: string }>;

export default async function ProductDetailPage(props: { params: Params }) {
	const params = await props.params;
	const product = (await getProductById(params.id)) as ProductType | null;
	const reviews = [];
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
		<section className="w-full p-2 md:p-20 ">
			<div className="w-full gap-8 flex flex-col md:flex-row">
				<section className="w-full md:w-2/3 flex flex-col">
					<Image
						src={product?.image}
						alt={product?.name}
						width={400}
						height={400}
						className="w-full h-[400px] aspect-square object-cover"
					/>
					{/* thumbnail container */}
					{product?.thumbnails && product?.thumbnails.length > 0 && (
						<div className="flex justify-start items-center gap-4 my-3">
							{product.thumbnails.map((thumbnail, index) => (
								<Image
									src={thumbnail}
									alt={product?.name}
									className="aspect-auto object-cover"
									width={100}
									height={20}
									key={index}
									loading="lazy"
								/>
							))}
						</div>
					)}
				</section>

				{/* details section */}
				<ProductDetailSection product={product as ProductType} />
			</div>
			{reviews.length > 0 && (
				<div className="w-full mt-10">
					<h1 className="font-bold text-3xl">Reviews</h1>
				</div>
			)}
		</section>
	);
}
