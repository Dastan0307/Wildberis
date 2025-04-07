import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../types/types'

interface CartState {
	items: CartItem[],
	totalPrice: number,
}

const initialState: CartState = {
	items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id)

			if (existingItem) {
				existingItem.quantity = (existingItem.quantity || 0) + 1
			} else {
				state.items.push({...action.payload, quantity: 1})
			}
			state.totalPrice += action.payload.price
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const itemIndex = state.items.findIndex(item => item.id === action.payload)

			if (itemIndex !== -1) {
				state.totalPrice -= state.items[itemIndex].price * state.items[itemIndex].quantity;
				state.items.splice(itemIndex, 1)
			}
		},
		updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
			const item = state.items.find(item => item.id === action.payload.id)

			if (item) {
				state.totalPrice += (action.payload.quantity - (item.quantity || 0)) * item.price;
				item.quantity = action.payload.quantity;
			}
		},
		clearCart: (state) => {
			state.items = []
            state.totalPrice = 0;
		}
	}
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer