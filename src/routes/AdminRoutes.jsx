import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const AdminRoutes = ({element}) => {
    const user = useSelector(state => state.user.value)

    const navigate = useNavigate()

    useEffect(() => {
        if(user.type == 'Staff') {
            toast.error('Access denied')
            navigate('/cms/dashboard')
        }
    }, [user])
    
    return element
}