
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import NavbarMenu from '../navbar/navbar';
import { Helmet } from "react-helmet";
import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { serverV1Instance } from '../../config/axios';
import { userAuth } from '../../utils/userAuth';
import { toast } from 'react-toastify';

const Layout = (props) => {

    const styleArr = [
        {
            navbarStyle: { bg: "primary", variant: "dark" },
            htmlBackground: 'white'
        },
        {
            navbarStyle: { bg: "secondary", variant: "dark" },
            htmlBackground: 'black'
        },
        {
            navbarStyle: { bg: "success", variant: "light" },
            htmlBackground: 'white'
        },
        {
            navbarStyle: { bg: "warning", variant: "light" },
            htmlBackground: 'black'
        },
        {
            navbarStyle: { bg: "danger", variant: "light" },
            htmlBackground: 'white'
        },
        {
            navbarStyle: { bg: "info", variant: "light" },
            htmlBackground: 'yellow'
        },
        {
            navbarStyle: { bg: "light", variant: "light" },
            htmlBackground: 'red'
        },
        {
            navbarStyle: { bg: "dark", variant: "dark" },
            htmlBackground: 'white'
        }
    ]

    const [style, setStyle] = useState({
        navbarStyle: { bg: "dark", variant: "light" },
        htmlBackground: 'white'
    });

    const [haveConfig, setConfig] = useState();

    const handleStyle = (num) => {
        const styleObj = styleArr.find((ele, index) => num === index + 1);

        setStyle(styleObj)
    }
    const token = userAuth();

    const getStyle = async () => {
        const res = await serverV1Instance.get('/usertheme/get-usertheme');
        if (res.status === 200) {
            if (res.data.data) {
                const { theme } = res.data.data;
                localStorage.setItem('style', theme);
                setStyle(JSON.parse(theme));
                setConfig(true);
            }
        }
    }

    useEffect(() => {
        if (token) {
            getStyle();
        } else {
            setStyle({
                navbarStyle: { bg: "dark", variant: "dark" },
                htmlBackground: 'white'
            })
        }
    }, [])


    const handleSave = async () => {
        const payload = {
            theme: JSON.stringify(style),
        }
        const styleRes = await serverV1Instance.post('/usertheme/create', payload);
        if (styleRes.status === 200) {
            toast.success("theme saved !", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error("some thing went worng !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    }

    const handleUpdate = async () => {
        const payload = {
            theme: JSON.stringify(style),
        }
        const styleRes = await serverV1Instance.put('/usertheme/update', payload);
        if (styleRes.status === 200) {
            toast.success("theme updated !", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error("some thing went worng !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }


    return (
        <div>
            <Helmet>
                <style>{`body { background-color: ${style.htmlBackground}; } `}</style>
            </Helmet>
            <NavbarMenu style={style.navbarStyle} />
            {userAuth() ?
                <><Row className='align-item-center  m-3'>
                    <Col>
                        <Button onClick={() => { handleStyle(1) }} variant="primary">Primary</Button>{' '}
                        <Button onClick={() => { handleStyle(2) }} variant="secondary">Secondary</Button>{' '}
                        <Button onClick={() => { handleStyle(3) }} variant="success">Success</Button>{' '}
                        <Button onClick={() => { handleStyle(4) }} variant="warning">Warning</Button>{' '}
                        <Button onClick={() => { handleStyle(5) }} variant="danger">Danger</Button>
                        <Button onClick={() => { handleStyle(6) }} variant="info">Info</Button>{' '}
                        <Button onClick={() => { handleStyle(7) }} variant="light">Light</Button>
                        <Button onClick={() => { handleStyle(8) }} variant="dark">Dark</Button>{' '}
                    </Col>
                </Row>
                    <Row className='align-item-center  m-3'>
                        <Col>
                            {!haveConfig ?
                                <Button variant="outline-success" onClick={() => handleSave()}>SaveChange</Button> :
                                <Button variant="outline-primary" onClick={() => handleUpdate()}>updateChange</Button>
                            }
                        </Col>
                    </Row>
                </> : ""}

            <Container>
                {props.children}
            </Container>
        </div>
    )
}

export default Layout