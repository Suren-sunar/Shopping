import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "react-confirm-alert/src/react-confirm-alert.css"
import "./CmsLayout.css"

import { Button, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import { config, delStorage } from "../lib"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { clearUser } from "../store"

export const CmsLayout = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const handleLogout = e => {
        e.preventDefault()

        delStorage(config('token_name'))

        dispatch(clearUser())
    }

    return <>
        {Object.keys(user).length ? <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Link to={'/cms/dashboard'} className="navbar-brand">{config('app_name', 'React App')}</Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {user.type == 'Admin' && <Nav.Item>
                            <NavLink to="/cms/staffs" className={"nav-link"}>
                                <i className="bi-people me-2"></i>Staffs
                            </NavLink>
                        </Nav.Item>}
                        
                        <Nav.Item>
                            <NavLink to="/cms/categories" className={"nav-link"}>
                                <i className="bi-list-ul me-2"></i>Categories
                            </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink to="/cms/brands" className={"nav-link"}>
                                <i className="bi-star me-2"></i>Brands
                            </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink to="/cms/products" className={"nav-link"}>
                                <i className="bi-gift me-2"></i>Products
                            </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink to="/cms/orders" className={"nav-link"}>
                                <i className="bi-basket me-2"></i>Orders
                            </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink to="/cms/reviews" className={"nav-link"}>
                                <i className="bi-chat me-2"></i>Reviews
                            </NavLink>
                        </Nav.Item>

                    </Nav>
                    <Nav>
                        <NavDropdown title={<>
                            <i className="bi-person-circle me-2"></i>{user.name}
                        </>} align="end">
                            <Link to="/cms/profile" className="dropdown-item">
                                <i className="bi-person-gear me-2"></i>Edit Profile
                            </Link>
                            <Link to="/cms/password" className="dropdown-item">
                                <i className="bi-asterisk me-2"></i>Change Password
                            </Link>
                            <Button variant="link" className="dropdown-item" onClick={handleLogout}>
                                <i className="bi-box-arrow-right me-2"></i>Logout
                            </Button>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> : null}

        <Container>
            <Row>
                <Outlet />
            </Row>
        </Container>
    </>
}