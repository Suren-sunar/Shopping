import { Spinner } from "react-bootstrap";

export const Loading = () => <h5 className="py-3 text-center">
    <Spinner variant="dark" size="sm" className="me-2" animation="grow" />Loading...
</h5>