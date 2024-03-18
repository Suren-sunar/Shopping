import { useEffect } from "react"
import { useState } from "react"
import http from "@/http"
import { DataTable, Loading } from "@/components";
import moment from "moment/moment";

export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('/profile/reviews')
            .then(({data}) => setReviews(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <DataTable data={reviews.map(review => {
        return {
            'Product': review.product.name,
            'Comment': review.comment,
            'Rating': review.rating,
            'Reviewed At': moment(review.createdAt).format('llll')
        }
    })} />
}