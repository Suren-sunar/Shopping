import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/store";
import { toast } from "react-toastify";

export const CartBtn = ({product, qty = 1}) => {
    const cart = useSelector(state => state.cart.value)

    const dispatch = useDispatch()

    const handleClick = () => {
        let temp = {...cart}

        let q = qty

        if(product._id in temp) {
            q += temp[product._id].qty
        }
        
        temp[product._id] = {
            product,
            qty: q
        }

        dispatch(addToCart(temp))
        toast.success(`${product.name} added to cart`)
    }

    return <button className="btn btn-outline-dark" type="button" onClick={handleClick}>
        <i className="fas fa-cart-plus me-2"></i>Add to cart
    </button>
}