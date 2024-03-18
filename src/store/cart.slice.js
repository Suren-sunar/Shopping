import { createSlice } from "@reduxjs/toolkit"
import { getStorage, setStorage, delStorage } from "@/lib"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: JSON.parse(getStorage('react-ecom-cart') || "{}")
    },
    reducers: {
        addToCart: (state, action) => {
            state.value = action.payload
            setStorage('react-ecom-cart', JSON.stringify(action.payload), true)
        },
        clearCart: state => {
            state.value = {}
            delStorage('react-ecom-cart')
        }
    }
})

export default cartSlice.reducer

export const {addToCart, clearCart} = cartSlice.actions
