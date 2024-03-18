import { useState } from "react"
import { useEffect } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap"
import http from "../../../http"
import { Loading } from "../../../components/Loading"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import moment from "moment"
import { DataTable } from "../../../components/DataTable"

export const List = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/orders')
            .then(({data}) => setOrders(data))
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

                        http.delete(`/cms/orders/${id}`)
                            .then(() => http.get('/cms/orders'))
                            .then(({data}) => setOrders(data))
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

    const handleStatus = (status, id) => {
        setLoading(true)

        http.patch(`/cms/orders/${id}`, {status})
            .then(() => http.get('/cms/orders'))
            .then(({data}) => setOrders(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
        <Row>
            <Col>
                <h1>Orders</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                {loading ? <Loading /> : <DataTable sortable={['Name', 'Status', 'Created At', 'Updated At']} searchable={['Name', 'Status', 'Created At', 'Updated At']} data={orders.map(order => {
                    return {
                        'User': order.user.name,
                        'Details': <ul>
                            {order.details.map(detail => <li key={detail._id}>
                                {detail.qty} x {'product' in detail ? detail.product.name : 'Removed Product'} @ Rs. {detail.price} = Rs. {detail.total}
                            </li>)}
                        </ul>,
                        'Status': <Form.Select value={order.status} onChange={({target}) => handleStatus(target.value, order._id)}>
                            <option value="Processing">Processing</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </Form.Select>,
                        'Created At': moment(order.createdAt).format('lll'),
                        'Updated At': moment(order.updatedAt).format('lll'),
                        'Actions': <>
                            <Button variant="danger" size="sm" type="button" onClick={() => handleDelete(order._id)}>
                                <i className="bi-trash me-2"></i>Delete
                            </Button>
                        </>
                    }
                })} />}
            </Col>
        </Row>
    </Col>
}