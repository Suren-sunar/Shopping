import { useEffect } from "react"
import { useState } from "react"
import http from "@/http"
import { useParams } from "react-router-dom"
import { Loading, Product } from "@/components"

export const Category = () => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const params = useParams()

    useEffect(() => {
        setLoading(true)

        http.get(`/categories/${params.id}`)
            .then(({data}) => {
                setCategory(data)

                return http.get(`/categories/${params.id}/products`)
            })
            .then(({data}) => setProducts(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    }, [params.id])

    return <div className="col-12">
        <main className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12 py-3">
                        {loading ? <Loading /> : <>
                            <div className="row">
                                <div className="col-12 text-center text-uppercase">
                                    <h2>{category.name}</h2>
                                </div>
                            </div>
                            <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-sm-2 justify-content-center">
                                {products.length > 0 ? 
                                    products.map(product => <Product product={product} key={product._id} />) : 
                                    <h4 className="text-muted text-center">No products.</h4>
                                }
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </main>
    </div>
}