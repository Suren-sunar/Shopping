import { Form } from "react-bootstrap"

export const InpField = ({label, name, type = 'text', formik, isTextArea = false}) => {
    return <div className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
            type={isTextArea ? null : type}
            as={isTextArea ? 'textarea' : 'input'}
            name={name}
            id={name}
            value={type != 'password' ? formik.values[name] : undefined}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched[name] && formik.values[name]}
            isInvalid={formik.touched[name] && formik.errors[name]} />

        {formik.touched[name] && formik.errors[name] && <Form.Control.Feedback type="invalid">{formik.errors[name]}</Form.Control.Feedback>}
    </div>
}