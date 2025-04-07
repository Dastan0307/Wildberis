import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Category, Product, ProductState } from '../../types/types'

const initialState: ProductState = {
	products: [],
	productById: null,
	filteredProducts: [],
	categories: [],
	selectedCategory: null,
	currentPage: 1,
	itemsPerPage: 10,
	loading: false,
	error: null,
}

const API = 'https://api.escuelajs.co/api/v1'

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		try {
			const response = await axios.get(`${API}/products`)
			return response.data
		} catch (error) {
			console.log(error)
		}
	}
)

export const searchProducts = createAsyncThunk(
	'products/searchProducts',
	async (query: string) => {
		try {
			const response = await axios.get(`${API}/products/?title=${query}`)
			return response.data
		} catch (error) {
			console.log(error)
		}
	}
)

export const getProductById = createAsyncThunk(
	'products/getProductById',
	async (id: number) => {
		try {
			const response = await axios.get(`${API}/products/${id}`)
			return response.data
		} catch (error) {
			console.log(error)
		}
	}
)

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (id: number) => {
		try {
			const response = await axios.delete(`${API}/products/${id}`)
			return response.data
		} catch (error) {
			console.log(error)
		}
	}
)

export const getCategories = createAsyncThunk(
	'products/getCategories',
	async () => {
		try {
			const response = await axios.get(`${API}/categories`)
			return response.data
		} catch (error) {
			console.log(error)
		}
	}
)

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		filterByCategory: (state, action: PayloadAction<string | null>) => {
			state.selectedCategory = action.payload
			if (action.payload) {
				state.filteredProducts = state.products.filter(
					product => product.category.name === action.payload
				)
			} else {
				state.filteredProducts = state.products
			}
			state.currentPage = 1
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
	},
	extraReducers: build => {
		build
			.addCase(fetchProducts.pending, state => {
				state.loading = true
			})
			.addCase(
				fetchProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.loading = false
					state.products = action.payload
					state.filteredProducts = action.payload
				}
			)
			.addCase(fetchProducts.rejected, state => {
				state.loading = false
				state.error = 'Error fetching products'
			})

			.addCase(getProductById.pending, state => {
				state.loading = true
			})
			.addCase(
				getProductById.fulfilled,
				(state, action: PayloadAction<Product>) => {
					state.loading = false
					state.productById = action.payload
				}
			)
			.addCase(getProductById.rejected, state => {
				state.loading = false
				state.error = 'Error fetching products'
			})

			.addCase(
				deleteProduct.fulfilled,
				(state, action: PayloadAction<Product>) => {
					toast.success('Продукт удален')
					state.products = state.products.filter(
						product => product.id !== action.payload.id
					)
				}
			)
			.addCase(deleteProduct.rejected, () => {
				toast.error('Продукт не удален')
			})
			.addCase(
				getCategories.fulfilled,
				(state, action: PayloadAction<Category[]>) => {
					state.categories = action.payload
				}
			)
			.addCase(searchProducts.pending, state => {
				state.loading = true
			})
			.addCase(
				searchProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.loading = false
					state.filteredProducts = action.payload
				}
			)
			.addCase(searchProducts.rejected, state => {
				state.loading = false
				state.error = 'Error fetching products'
			})
	},
})

export const { filterByCategory, setCurrentPage } = productsSlice.actions
export default productsSlice.reducer
