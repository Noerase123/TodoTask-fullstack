import React from 'react'
import {
    Nav, Card, Container, Row, Col, Button, Form
} from 'react-bootstrap'
import './index.css'

export default function Index() {

    const isLogin = false

    return (
        <React.Fragment>
            {isLogin ? <Home/> : <Login/> }
        </React.Fragment>
    )
}

const Home = () => {

    const navStyle = {
        padding:10
    }

    return (
        <React.Fragment>
            <div>
                <div style={navStyle} className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Nav className="justify-content-start" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/home">Home</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        </React.Fragment>
    )
}

const Login = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card className="loginBody shadow-lg p-3 mb-5 bg-white rounded">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <Button variant="primary" className="form-control" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
                
            </Container>
        </React.Fragment>
    )
}