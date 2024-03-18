import { useState } from "react"
import { useEffect } from "react"
import { Button, Col, Row, Table } from "react-bootstrap"
import http from "../../../http"
import { Loading } from "../../../components/Loading"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import moment from "moment"
import { DataTable } from "../../../components/DataTable"

export const List = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/categories')
            .then(({data}) => setCategories(data))
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

                        http.delete(`/cms/categories/${id}`)
                            .then(() => http.get('/cms/categories'))
                            .then(({data}) => setCategories(data))
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
                <h1>Categories</h1>
            </Col>
            <Col xs="auto">
                <Link to="/cms/categories/create" className="btn btn-dark">
                    <i className="bi-plus-lg me-2"></i>Add Category
                </Link>
            </Col>
        </Row>
        <Row>
            <Col>
                {loading ? <Loading /> : <DataTable sortable={['Name', 'Status', 'Created At', 'Updated At']} searchable={['Name', 'Status', 'Created At', 'Updated At']} data={categories.map(category => {
                    return {
                        'Name': category.name,
                        'Status': category.status ? 'Active' : 'Inactive',
                        'Created At': moment(category.createdAt).format('lll'),
                        'Updated At': moment(category.updatedAt).format('lll'),
                        'Actions': <>
                            <Link to={`/cms/categories/${category._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="bi-pencil-square me-2"></i>Edit
                            </Link>
                            <Button variant="danger" size="sm" type="button" onClick={() => handleDelete(category._id)}>
                                <i className="bi-trash me-2"></i>Delete
                            </Button>
                        </>
                    }
                })} />}
            </Col>
        </Row>
    </Col>
}