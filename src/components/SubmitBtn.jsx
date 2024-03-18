import { Button, Spinner } from "react-bootstrap";

export const SubmitBtn = ({variant = "dark", loading = false, icon="bi-floppy", text = 'Save'}) => <Button type="submit" variant={variant} disabled={loading}>
    {loading ? <Spinner size="sm" variant="light" className="me-2" /> : <i className={`${icon} me-2`}></i>}{text}
</Button>