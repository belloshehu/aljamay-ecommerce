import { ProductResponseType } from "@/types/product.types";
import axios from "axios";

class ProductServiceAPI {
	static async getSingleProduct({ productId }: { productId: string }) {
		const { data } = await axios.get<ProductResponseType>(
			"/api/product/" + productId
		);
		return data.data;
	}

	static async deleteProductById({ productId }: { productId: string }) {
		const { data } = await axios.delete<ProductResponseType>(
			"/api/product/" + productId
		);
		return data.data;
	}
}

export default ProductServiceAPI;
