import { useState } from "react"
import { useEffect } from "react"
import { Button, Col, Row, Table } from "react-bootstrap"
import http from "../../../http"
import { Loading } from "../../../components/Loading"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import moment from "moment"
import { DataTable } from "../../../components/DataTable"
import { imgUrl } from "../../../lib"

export const List = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/products')
            .then(({data}) => setProducts(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = id => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'text-bg-danger',
                    onClick: () => {
                        setLoading(true)

                        http.delete(`/cms/products/${id}`)
                            .then(() => http.get('/cms/products'))
                            .then(({data}) => setProducts(data))
                            .catch(err => {})
                            .finally(() => setLoading(false))
                    }
                },
                {
                    label: 'No',
                    className: 'text-bg-secondary'
                }
            ]
        })
    }

    return <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
        <Row>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col xs="auto">
                <Link to="/cms/products/create" className="btn btn-dark">
                    <i className="bi-plus-lg me-2"></i>Add Product
                </Link>
            </Col>
        </Row>
        <Row>
            <Col>
                {loading ? <Loading /> : <DataTable sortable={['Name', 'Status', 'Created At', 'Updated At']} searchable={['Name', 'Status', 'Created At', 'Updated At']} data={products.map(product => {
                    return {
                        'Name': product.name,
                        'Category': product.category.name,
                        'Brand': product.brand.name,
                        'Price': product.price,
                        'Dis. Price': product.discounted_price ?? 0,
                        'Image': <img src={imgUrl(product.images[0])} />,
                        'Status': product.status ? 'Active' : 'Inactive',
                        'Featured': product.featured ? 'Yes' : 'No',
                        'Created At': moment(product.createdAt).format('lll'),
                        'Updated At': moment(product.updatedAt).format('lll'),
                        'Actions': <>
                            <Link to={`/cms/products/${product._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="bi-pencil-square me-2"></i>Edit
                            </Link>
                            <Button variant="danger" size="sm" type="button" onClick={() => handleDelete(product._id)}>
                                <i className="bi-trash me-2"></i>Delete
                            </Button>
                        </>
                    }
                })} />}
            </Col>
        </Row>
    </Col>
}