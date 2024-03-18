import { useFormik } from "formik"
import { Col, Form, Row } from "react-bootstrap"
import * as Yup from "yup"
import { InpField, SubmitBtn } from "../../../components"
import http from "../../../http"
import { setUser } from "../../../store"

export const Password = () => {
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required(),
            newPassword: Yup.string().required().min(4).max(16)
                .matches(/[0-9]/, 'password must contain 1 number')
                .matches(/[a-z]/, 'password must contain 1 lowercase')
                .matches(/[A-Z]/, 'password must contain 1 uppercase'),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword')], 'password not confimed')
        }),
        onSubmit: (values, {setSubmitting}) => {
            http.patch('/profile/password', values)
                .then(() => {})
                .catch(err => {})
                .finally(() => setSubmitting(false))
        }
    })
    
    return <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
        <Row>
            <Col>
                <h1>Change Password</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <InpField formik={formik} name="oldPassword" label="Old Password" type="password" />
                    <InpField formik={formik} name="newPassword" label="New Password" type="password" />
                    <InpField formik={formik} name="confirmPassword" label="Confirm Password" type="password" />
                    <SubmitBtn loading={formik.isSubmitting} />
                </Form>
            </Col>
        </Row>
    </Col>
}