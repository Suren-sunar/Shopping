import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import http from "@/http"
import { CartBtn, Loading, ProductList } from "@/components"
import { imgUrl } from "@/lib"
import { Link } from "react-router-dom"
import moment from "moment"

export const Detail = () => {
    const [product, setProduct] = useState({})
    const [similar, setSimilar] = useState([])
    const [loading, setLoading] = useState(false)
    const [bigImg, setBigImg] = useState('')
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(1)
    const [avgRating, setAvgRating] = useState(0)
    const [stars, setStars] = useState({5:0,4:0,3:0,2:0,1:0})

    const params = useParams()

    useEffect(() => {
        loadData()
    }, [params.id])

    useEffect(() => {
        if(Object.keys(product).length > 0 && product.reviews.length > 0) {
            let total = 0
            let starList = {5:0,4:0,3:0,2:0,1:0}

            for(let review of product.reviews) {
                total += review.rating
            }

            for(let i = 1; i <= 5; i++) {
                starList[i] = product.reviews.filter(review => review.rating == i).length / product.reviews.length * 100
            }

            let avg = total / product.reviews.length
            console.log(avg)
            setAvgRating(avg)
            setStars(starList)
        }
    }, [product.reviews])

    const loadData = () => {
        setLoading(true)

        http.get(`/products/${params.id}`)
            .then(({ data }) => {
                setProduct(data)
                setBigImg(data.images[0])
                return http.get(`/products/${params.id}/similar`)
            })
            .then(({ data }) => setSimilar(data))
            .catch(err => { })
            .finally(() => setLoading(false))
    }

    const handleSubmit = e => {
        e.preventDefault()

        setLoading(true)

        http.post(`/products/${params.id}/review`, {comment, rating})
            .then(() => {
                loadData()

                setComment('')
                setRating(1)
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <div className="col-12">
        {loading ? <Loading /> : <main className="row">
            <div className="col-12 bg-white py-3 my-3">
                <div className="row">

                    <div className="col-lg-5 col-md-12 mb-3">
                        <div className="col-12 mb-3">
                            <div className="img-large border" style={{ backgroundImage: `url('${imgUrl(bigImg)}')` }}></div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                {product.images?.map((image, i) => <div className="col-sm-2 col-3" key={i}>
                                    <div className="img-small border" style={{ backgroundImage: `url('${imgUrl(image)}')` }} onMouseEnter={() => setBigImg(image)} onClick={() => setBigImg(image)}></div>
                                </div>)}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-9">
                        <div className="col-12 product-name large">
                            {product.name}
                            <small>By <Link to={`/brand/${product.brandId}`}>{product.brand?.name}</Link></small>
                        </div>
                        <div className="col-12 px-0">
                            <hr />
                        </div>
                        <div className="col-12">
                            {product.summary}
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 text-center">
                        <div className="col-12 sidebar h-100">
                            <div className="row">
                                <div className="col-12">
                                    {product.discounted_price ? 
                                        <>
                                            <span className="detail-price">
                                                Rs. {product.discounted_price}
                                            </span>
                                            <span className="detail-price-old">
                                                Rs. {product.price}
                                            </span>
                                        </> : 
                                        <span className="detail-price">
                                            Rs. {product.price}
                                        </span>
                                    }
                                </div>
                                <div className="col-xl-5 col-md-9 col-sm-3 col-5 mx-auto mt-3">
                                    <div className="mb-3">
                                        <label htmlFor="qty">Quantity</label>
                                        <input type="number" id="qty" min="1" value={qty} className="form-control" required onChange={({target}) => setQty(parseInt(target.value))} />
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <CartBtn product={product} qty={qty} />
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="btn btn-outline-secondary btn-sm" type="button"><i className="fas fa-heart me-2"></i>Add to wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 mb-3 py-3 bg-white text-justify">
                <div className="row">

                    <div className="col-md-7">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 text-uppercase">
                                    <h2><u>Details</u></h2>
                                </div>
                                <div className="col-12" id="details" dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="col-12 px-md-4 sidebar h-100">

                            <div className="row">
                                <div className="col-12 mt-md-0 mt-3 text-uppercase">
                                    <h2><u>Ratings & Reviews</u></h2>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-sm-4 text-center">
                                            <div className="row">
                                                <div className="col-12 average-rating">
                                                    {avgRating.toFixed(1)}
                                                </div>
                                                <div className="col-12">
                                                    of {product.reviews?.length} reviews
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <ul className="rating-list mt-3">
                                                {[5, 4, 3, 2, 1].map(i => <li key={i}>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-dark" role="progressbar" style={{ width: stars[i]+"%" }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">{stars[i].toFixed(1)}%</div>
                                                    </div>
                                                    <div className="rating-progress-label">
                                                        {i}<i className="fas fa-star ms-1"></i>
                                                    </div>
                                                </li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 px-md-3 px-0">
                                    <hr />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <h4>Add Review</h4>
                                </div>
                                <div className="col-12">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <textarea className="form-control" placeholder="Give your review" name="comment" required onChange={({target}) => setComment(target.value)} defaultValue={comment}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex ratings justify-content-end flex-row-reverse">
                                                <input type="radio" value="5" name="rating" id="rating-5" checked={rating == 5} onClick={() => setRating(5)} /><label
                                                    htmlFor="rating-5"></label>
                                                <input type="radio" value="4" name="rating" id="rating-4" checked={rating == 4} onClick={() => setRating(4)} /><label
                                                    htmlFor="rating-4"></label>
                                                <input type="radio" value="3" name="rating" id="rating-3" checked={rating == 3} onClick={() => setRating(3)} /><label
                                                    htmlFor="rating-3"></label>
                                                <input type="radio" value="2" name="rating" id="rating-2" checked={rating == 2} onClick={() => setRating(2)} /><label
                                                    htmlFor="rating-2"></label>
                                                <input type="radio" value="1" name="rating" id="rating-1" checked={rating == 1} onClick={() => setRating(1)} /><label
                                                    htmlFor="rating-1"></label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-outline-dark" type="submit">Add Review</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 px-md-3 px-0">
                                    <hr />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">

                                    {product.reviews?.length > 0 ? 
                                        product.reviews.map(review => <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray" key={review._id}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <strong className="me-2">{review.user.name}</strong>
                                                    <small>
                                                        {[1, 2, 3, 4, 5].map(i => <i className={`${review.rating >= i ? 'fas' : 'far'} fa-star`} key={i}></i>)}
                                                    </small>
                                                </div>
                                                <div className="col-12">
                                                    {review.comment}
                                                </div>
                                                <div className="col-12">
                                                    <small>
                                                        <i className="fas fa-clock me-2"></i>{moment(review.createdAt).fromNow()}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>) : 
                                    <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray">
                                        <div className="row">
                                            <div className="col-12">
                                                No review given.
                                            </div>
                                        </div>
                                    </div>}

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {similar.length > 0 && <ProductList products={similar} title="Similar Products" />}

        </main>}
    </div>
}