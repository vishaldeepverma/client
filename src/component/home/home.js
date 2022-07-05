import React, { useState } from 'react'
import Layout from '../layout/layout'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { Container } from 'react-bootstrap';

const Home = () => {
    const [search, setSearch] = useState('');
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleReset = () => {
        setSearch('')
    }

    return (
        <Layout>
            <Container>
                <Stack direction="horizontal" gap={3}>
                    <Form.Control
                        className="me-auto m-4"
                        placeholder="Search your item here..."
                        onChange={(e) => handleChange(e)}
                        value={search}
                    />
                    <Button variant="secondary">Search</Button>
                    <Button variant="outline-danger" onClick={() => handleReset()}>Reset</Button>
                </Stack>
            </Container>
        </Layout>

    )
}

export default Home;
