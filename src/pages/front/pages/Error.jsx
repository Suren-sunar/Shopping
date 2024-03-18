import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Error = () => {
    return <Row>
        <Col xs={12} className="text-center">
            <h1 className="display-1 text-center">404</h1>
            <h4>Not Found</h4>
            <Link className="btn btn-outline-dark" to={-1}>Go Back</Link>
        </Col>
    </Row>
}