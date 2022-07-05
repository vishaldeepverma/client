import React from "react";
import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import { serverV1Instance } from "../../config/axios";
import { checkIfEmpty } from "../../utils/helper";
import Layout from "../layout/layout";


const Login = () => {

    const [loginData, setLogIn] = useState({
        email: '',
        password: ''
    })

    const { email, password } = loginData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogIn({ ...loginData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            password: password
        }

        const { isValid, err } = checkIfEmpty(payload);
        if (!isValid) {
            const field = err[0];
            toast.error(`${field} must have value`, {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            try {
                const res = await serverV1Instance.post('/auth/login', payload);
                if (res.status === 200 && res.data.status) {
                    localStorage.setItem("token", res.data.token)
                    window.location.href = '/';
                } else {
                    toast.error(res.data.msg, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            } catch (error) {
                toast.error(error.response.data.msg, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }

        }
    }


    return (
        <Layout>
            <h1>Login</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name='email'
                        value={email}
                        onChange={(e) => handleChange(e)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={password}
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Layout>
    )
}

export default Login;