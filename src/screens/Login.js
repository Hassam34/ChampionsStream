import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import React from 'react';
import '../css/Login.css'
// const history = useHistory();


class App extends React.Component {

    render() {
        return (
            <div className="body" >
                <Card className="text-center" >
                    <Card.Header className="title" > Welcome to Champions-Stream </Card.Header> <Card.Body >
                        <Form onSubmit={() => {

                            this.props.history.push('/dashBoard')
                        }

                        }>
                            <Form.Group controlId="formBasicEmail">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        placeholder="Email"
                                        aria-label="Email"
                                        aria-describedby="basic-addon1"
                                        type="email"
                                        size="lg"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        type="password"
                                        size="lg"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Button variant="primary" size="lg" type="submit"
                            // onClick={() =>
                            //     this.props.history.push('/dashBoard')
                            // }
                            >
                                Login</Button>

                        </Form>

                    </Card.Body>
                    <Card.Footer className="text-muted" >
                        Login Portal </Card.Footer>
                </Card>
            </div >
        );
    }
}

export default App;