import { useFormik } from "formik"
import { Col, Form, Row } from "react-bootstrap"
import * as Yup from "yup"
import { InpField, SubmitBtn } from "../../../components"
import http from "../../../http"
import { useNavigate } from "react-router-dom"

export const Create = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            status: true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            status: Yup.boolean().required(),
        }),
        onSubmit: (values, {setSubmitting}) => {
            http.post('/cms/brands', values)
                .then(() => navigate('/cms/brands'))
                .catch(err => {})
                .finally(() => setSubmitting(false))
        }
    })
    
    return <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
        <Row>
            <Col>
                <h1>Add Brand</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <InpField formik={formik} name="name" label="Name" />
                    <div className="mb-3">
                        <Form.Label title="Status" htmlFor="status" />
                        <Form.Select name="status" id="status" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.status} isInvalid={formik.touched.status && formik.errors.status}>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </Form.Select>
                        {formik.touched.status && formik.errors.status && <Form.Control.Feedback type="invalid">{formik.errors.status}</Form.Control.Feedback>}
                    </div>
                    <SubmitBtn loading={formik.isSubmitting} />
                </Form>
            </Col>
        </Row>
    </Col>
}