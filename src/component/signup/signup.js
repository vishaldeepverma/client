import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { serverV1Instance } from '../../config/axios';
import { checkIfEmpty } from '../../utils/helper';
import Layout from '../layout/layout';

const SignUP = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cnfPassword: "",
    })

    const { password, email, cnfPassword, firstName, lastName } = userData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'pinCode' || name === 'mobile') {
            if (!isNaN(value)) {
                setUserData({
                    ...userData, [name]: value
                })
            }
        } else {
            setUserData({
                ...userData, [name]: value
            })
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredField = {
            email, password, cnfPassword
        }
        const { isValid, err } = checkIfEmpty(requiredField);
        if (!isValid) {
            const field = err[0];
            toast.error(`${field} must have value`, {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            if (userData.password === userData.cnfPassword) {
                try {
                    const res = await serverV1Instance.post('auth/signup', userData);
                    if (res.status === 200 && res.data.status) {
                        setUserData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            cnfPassword: "",
                        })
                        toast.success(res.data.msg, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setTimeout(() => {
                            window.location.href = "/login";
                        }, 1000);
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

            } else {
                toast.error('please correct confirm password as password', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        }


    }

    return (
        <Layout>
            <h1 className="align-self-center"> SignUP</h1>
            <div className=' align-items-center'>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridfirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    value={firstName}
                                    type="text"
                                    placeholder="Enter First Name"
                                    onChange={(e) => handleChange(e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridlastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    value={lastName}
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={(e) => handleChange(e)}
                                />
                            </Form.Group>

                        </Row>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name='email'
                            value={email}
                            onChange={(e) => handleChange(e)}
                        />
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

                    <Form.Group className="mb-3" controlId="formBasicCnfPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder=" Confirm Password"
                            name='cnfPassword'
                            value={cnfPassword}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Layout>
    )
}

export default SignUP