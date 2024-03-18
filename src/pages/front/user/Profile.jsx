import { Col, Row, Tab, Tabs } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Orders } from "./Orders"
import { Reviews } from "./Reviews"
import { Edit } from "./Edit"
import { Password } from "./Password"

export const Profile = () => {
    const user = useSelector(state => state.user.value)

    return <Row>
        <Col xs={12} className="text-center">
            <h1>Hello {user.name}</h1>
        </Col>
        <Col lg={8} className="mx-auto bg-white rounded-2 py-3 shadow-sm">
            <Tabs
                defaultActiveKey="orders"
                id="uncontrolled-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="orders" title="Orders">
                    <Orders />
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <Reviews />
                </Tab>
                <Tab eventKey="profile" title="Edit Profile">
                   <Edit/>
                </Tab>
                <Tab eventKey="password" title="Change Password">
                   <Password/>
                </Tab>
            </Tabs>
        </Col>
    </Row>
}