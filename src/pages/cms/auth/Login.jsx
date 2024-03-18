import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { config, setStorage } from "../../../lib"
import { useFormik } from "formik"
import * as Yup from "yup"
import { InpField, SubmitBtn } from "../../../components"
import http from "../../../http"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../../store"

export const Login = ({to = '/cms/dashboard', isCustomerLogin = false}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        }),
        onSubmit: (values, {setSubmitting}) => {
            http.post('/login', values)
                .then(({data}) => {
                    if(isCustomerLogin) {
                        if (data.user.type == 'Customer') {
                            dispatch(setUser(data.user))

                            setStorage(config('token_name'), data.token, values.remember)

                            navigate(to)
                        } else {
                            formik.setFieldError('email', 'invalid email address')
                        }
                    } else {
                        if (data.user.type != 'Customer') {
                            dispatch(setUser(data.user))

                            setStorage(config('token_name'), data.token, values.remember)

                            navigate(to)
                        } else {
                            formik.setFieldError('email', 'invalid email address')
                        }
                    }
                })
                .catch(err => {})
                .finally(() => setSubmitting(false))
        }
    })

    const formSchema = [
        {
            name: 'email',
            type: 'email',
            label: 'Email'
        },
        {
            name: 'password',
            type: 'password',
            label: 'Password'
        },
    ]

    return <Col lg={4} sm={8} xs={12} className="bg-white py-3 my-5 mx-auto rounded-3 shadow-sm">
        <Row>
            <Col className="text-center">
                <h1>{config('app_name')}</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>

                    {formSchema.map((item, i) => <InpField key={i} type={item.type} name={item.name} label={item.label} formik={formik} />)}

                    <Form.Check className="mb-3">
                        <Form.Check.Input
                            name="remember"
                            id="remember"
                            checked={formik.values.remember}
                            onClick={() => formik.setFieldValue('remember', !formik.values.remember)} />
                        <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
                    </Form.Check>

                    <div className="mb-3 d-grid">
                        <SubmitBtn text="Log In" icon="bi-box-arrow-in-right" loading={formik.isSubmitting} />
                    </div>
                    
                </Form>
            </Col>
        </Row>
    </Col>
}