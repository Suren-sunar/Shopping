import { useFormik } from "formik"
import { Col, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { InpField, SubmitBtn } from "../../../components"
import http from "../../../http"
import { useDispatch } from "react-redux"
import { setUser } from "../../../store"

export const Edit = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: user.name,
            phone: user.phone,
            address: user.address,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required().max(30),
            address: Yup.string().required(),
        }),
        onSubmit: (values, {setSubmitting}) => {
            http.patch('/profile/edit', values)
                .then(() => http.get('/profile/details'))
                .then(({data}) => dispatch(setUser(data)))
                .catch(err => {})
                .finally(() => setSubmitting(false))
        }
    })
    
    return <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
        <Row>
            <Col>
                <h1>Edit Profile</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <InpField formik={formik} name="name" label="Name" />
                    <InpField formik={formik} name="phone" label="Phone" />
                    <InpField formik={formik} name="address" label="Address" isTextArea />
                    <SubmitBtn loading={formik.isSubmitting} />
                </Form>
            </Col>
        </Row>
    </Col>
}