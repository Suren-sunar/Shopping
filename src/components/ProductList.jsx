import { Col } from "react-bootstrap"
import { Loading, Product } from "."

export const ProductList = ({products, title, loading = false, latest = false}) => {
    return <div className="col-12">
        <div className="row">
            <div className="col-12 py-3">
                <div className="row">
                    <div className="col-12 text-center text-uppercase">
                        <h2>{title}</h2>
                    </div>
                </div>
                <div className="row row-cols-lg-4 row-cols-sm-4 justify-content-center">

                    {loading ?
                        <Col xs={12} className="my-5"><Loading /></Col> :
                        products.map(product => <Product key={product._id} product={product} latest={latest} />)
                    }

                </div>
            </div>
        </div>
    </div>
}