export interface HeaderNavText {
	id: number;
	title: string;
	path: string;
}

export interface Product {
	id: number;
	title: string;
	price: number;
	slug: string;
	description: string;
	category: {
		id: number;
        name: string;
		image: string;
		slug: string;
	}
	images: string[];
}

export interface Category {
	id: number;
	name: string;
	slug: string;
	image: string;
}


export interface ProductState {
	products: Product[];
	productById: Product | null;
	filteredProducts: Product[];
	categories: Category[];
	selectedCategory: null | string;
	currentPage: number;
	itemsPerPage: number;
	loading: boolean;
	error: string | null;
}

export interface CartItem {
	id: number;
	title: string;
	price: number;
	slug: string;
	description: string;
	category: {
		id: number;
        name: string;
		image: string;
		slug: string;
	}
	images: string[];
	quantity: number;
}