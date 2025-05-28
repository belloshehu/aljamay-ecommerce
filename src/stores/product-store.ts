import { createStore } from "zustand/vanilla";

type ProductState = {
	selectedProductId: string | null;
};

type ProductActions = {
	setSelectedProductId: (id: string | null) => void;
};

export const productStore = createStore<ProductState & ProductActions>(
	(set) => ({
		selectedProductId: null,
		setSelectedProductId: (id) => set({ selectedProductId: id }),
	})
);
