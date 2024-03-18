import { useFormik } from "formik"
import { Col, Form, Row } from "react-bootstrap"
import * as Yup from "yup"
import { InpField, Loading, SubmitBtn } from "../../../components"
import http from "../../../http"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { imgUrl } from "../../../lib"

export const Edit = () => {
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    const formik = useFormik({
        initialValues: {
            name: '',
            summary: '',
            description: '',
            price: '',
            discounted_price: '',
            categoryId: '',
            brandId: '',
            images: [],
            featured: false,
            status: true,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            summary: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required(),
            discounted_price: Yup.number().nullable(),
            categoryId: Yup.string().required('category is a required field'),
            brandId: Yup.string().required('brand is a required field'),
            status: Yup.boolean().required(),
            featured: Yup.boolean().required(),
            images: Yup.mixed().test('fileType', 'images must be of valid type', files => {
                if(files.length > 0) {
                    for (let file of files) {
                        if (!file.type.startsWith('image/')) {
                            return false
                        }
                    }
                }

                return true
            }).test('fileSize', 'images must not be larger than 5MB', files => {
                if(files.length > 0) {
                    for (let file of files) {
                        if (file.size > 5 * 1024 * 1024) {
                            return false
                        }
                    }
                }
                
                return true
            }),
        }),
        onSubmit: (values, { setSubmitting }) => {
            let fd = new FormData()

            for (let k in values) {
                if (k == 'images') {
                    for (let img of values[k]) {
                        fd.append(k, img)
                    }
                } else {
                    fd.append(k, values[k])
                }
            }

            http.patch(`/cms/products/${params.id}`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => navigate('/cms/products'))
                .catch(err => { })
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        setLoading(true)

        http.get('/cms/categories')
            .then(({ data }) => {
                setCategories(data)

                return http.get('/cms/brands')
            })
            .then(({ data }) => {
                setBrands(data)

                return http.get(`/cms/products/${params.id}`)
            })
            .then(({data}) => setProduct(data))
            .catch(err => { })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if(Object.keys(product).length) {
            for(let k in product) {
                if(k in formik.values && k != 'images') {
                    formik.setFieldValue(k, product[k])
                }
            }
        }
    }, [product])

    return <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
        <Row>
            <Col>
                <h1>Edit Product</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                {loading ? <Loading /> : <Form onSubmit={formik.handleSubmit}>
                    <InpField formik={formik} name="name" label="Name" />
                    <InpField formik={formik} name="summary" label="Summary" isTextArea />
                    <InpField formik={formik} name="description" label="Description" isTextArea />
                    <InpField formik={formik} name="price" label="Price" type="number" />
                    <InpField formik={formik} name="discounted_price" label="Discounted Price" type="number" />
                    <div className="mb-3">
                        <Form.Label htmlFor="categoryId">Category</Form.Label>
                        <Form.Select name="categoryId" id="categoryId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.categoryId} isInvalid={formik.touched.categoryId && formik.errors.categoryId}>
                            <option value="">Select a category</option>
                            {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
                        </Form.Select>
                        {formik.touched.categoryId && formik.errors.categoryId && <Form.Control.Feedback type="invalid">{formik.errors.categoryId}</Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="brandId">Brand</Form.Label>
                        <Form.Select name="brandId" id="brandId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.brandId} isInvalid={formik.touched.brandId && formik.errors.brandId}>
                            <option value="">Select a brand</option>
                            {brands.map(brand => <option value={brand._id} key={brand._id}>{brand.name}</option>)}
                        </Form.Select>
                        {formik.touched.brandId && formik.errors.brandId && <Form.Control.Feedback type="invalid">{formik.errors.brandId}</Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="status">Status</Form.Label>
                        <Form.Select name="status" id="status" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.status} isInvalid={formik.touched.status && formik.errors.status}>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </Form.Select>
                        {formik.touched.status && formik.errors.status && <Form.Control.Feedback type="invalid">{formik.errors.status}</Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="featured">Featured</Form.Label>
                        <Form.Select name="featured" id="featured" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.featured} isInvalid={formik.touched.featured && formik.errors.featured}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Select>
                        {formik.touched.featured && formik.errors.featured && <Form.Control.Feedback type="invalid">{formik.errors.featured}</Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="images">Images</Form.Label>
                        <Form.Control
                            type="file"
                            name="images"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={({ target }) => formik.setFieldValue('images', target.files)}
                            onBlur={formik.handleBlur}
                            isValid={formik.touched['images'] && formik.values['images']}
                            isInvalid={formik.touched['images'] && formik.errors['images']} />

                        {formik.touched['images'] && formik.errors['images'] && <Form.Control.Feedback type="invalid">{formik.errors['images']}</Form.Control.Feedback>}

                        {formik.values.images.length > 0 && <Row>
                            {Array.from(formik.values.images).map((image, i) => <Col lg={3} key={i} className="mt-3">
                                <img className="img-fluid" src={URL.createObjectURL(image)} />
                            </Col>)}
                        </Row>}

                        {'images' in product && product.images.length > 0 && <Row>
                            {product.images.map((image, i) => <Col lg={3} key={i} className="mt-3">
                                <img className="img-fluid" src={imgUrl(image)} />
                            </Col>)}
                        </Row>}
                    </div>
                    <SubmitBtn loading={formik.isSubmitting} />
                </Form>}
            </Col>
        </Row>
    </Col>
}