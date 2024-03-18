import { useEffect } from "react"
import { useState } from "react"
import http from "@/http"
import { DataTable, Loading } from "@/components";
import moment from "moment/moment";

export const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('/profile/orders')
            .then(({data}) => setOrders(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <DataTable data={orders.map(order => {
        return {
            'Details': <ul>
                {order.details.map(detail => <li key={detail._id}>
                    {detail.qty} x {detail.product.name} @ {detail.price} = {detail.total}
                </li>)}
            </ul>,
            'Status': order.status,
            'Ordered At': moment(order.createdAt).format('llll')
        }
    })} />
}