import ProductFormDialog from "./AddProductDiaglog";

export default function ProductPageHeader() {
	return (
		<header className="w-full flex justify-center items-center bg-[#ADF802] text-white p-5 rounded-full">
			<h1 className="text-2xl lg:text-4xl font-bold">Products</h1>
			<ProductFormDialog triggerBtnText="Add Product" />
		</header>
	);
}
