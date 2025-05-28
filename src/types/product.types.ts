export interface ProductType {
	id: string;
	name: string;
	image: string;
	thumbNails: string[];
	description: string;
	price: number;
	stock: number;
	discount: number;
	createdAt: Date;
	updatedAt: Date;
}
