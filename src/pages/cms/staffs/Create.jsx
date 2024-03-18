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
            email: '',
            phone: '',
            address: '',
            password: '',
            confirm_password: '',
            status: true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            phone: Yup.string().required().max(30),
            address: Yup.string().required(),
            password: Yup.string().required().min(4).max(16)
                .matches(/[0-9]/, 'password must contain 1 number')
                .matches(/[a-z]/, 'password must contain 1 lowercase')
                .matches(/[A-Z]/, 'password must contain 1 uppercase'),
            confirm_password: Yup.string().required().oneOf([Yup.ref('password')], 'password not confimed'),
            status: Yup.boolean().required(),
        }),
        onSubmit: (values, {setSubmitting}) => {
            http.post('/cms/staffs', values)
                .then(() => navigate('/cms/staffs'))
                .catch(err => {})
                .finally(() => setSubmitting(false))
        }
    })
    
    return <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
        <Row>
            <Col>
                <h1>Add Staff</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <InpField formik={formik} name="name" label="Name" />
                    <InpField formik={formik} name="email" label="Email" type="email" />
                    <InpField formik={formik} name="phone" label="Phone" />
                    <InpField formik={formik} name="address" label="Address" isTextArea />
                    <InpField formik={formik} name="password" label="New Password" type="password" />
                    <InpField formik={formik} name="confirm_password" label="Confirm Password" type="password" />
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