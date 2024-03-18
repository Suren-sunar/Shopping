import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { config, getStorage } from "../lib"
import { useSelector } from "react-redux"
import http from "../http"
import { useDispatch } from "react-redux"
import { setUser } from "../store"
import { useState } from "react"
import { Loading } from "../components"

export const PrivateRoutes = ({element}) => {
    const user = useSelector(state => state.user.value)

    const [loading, setLoding] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(user).length == 0) {
            const token = getStorage(config('token_name'))

            if(token) {
                setLoding(true)

                http.get('profile/details')
                    .then(({data}) => dispatch(setUser(data)))
                    .catch(err => navigate('/cms/login'))
                    .finally(() => setLoding(false))
            } else {
                navigate('/cms/login')
            }
        }
    }, [user])

    return loading ? <Loading /> : element
}