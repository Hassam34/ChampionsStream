import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import React from 'react';
import { WebAPI } from '../helpers/WebAPI'

import '../css/Login.css'
// import '../ css/bootstrap.min.css'
import '../css/style.css'
// import '../css/responsive.css'
// import '../css/colors.css'
// import '../css/animate.css'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            message: ''
        }
        localStorage.removeItem('ChampionToken');

    }
    onLogin = async (loginObj) => {
        const result = await new WebAPI().login(loginObj)
        console.log('data is data and', result)
        if (result && result.login) {
            this.setState({ message: '* ' + result.data.message, password: '' })
            localStorage.setItem('ChampionToken', result.data.token);
            this.props.history.push('/dashBoard')
        }
        else {
            this.setState({ message: '* ' + result.data.message, password: '' })
        }
    }
    render() {
        return (
            <div className="body" >
                <Card className="text-center" >
                    <Card.Header className="title" > Welcome to Champions-Stream </Card.Header> <Card.Body >

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
                                    value={this.state.email}
                                    onChange={(event) => {
                                        this.setState({
                                            email: event.target.value
                                        })
                                    }}
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
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.setState({
                                            password: event.target.value
                                        })
                                    }}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" size="lg" type="submit" onClick={() => {
                            let loginObj = {
                                email: this.state.email,
                                password: this.state.password
                            }
                            this.onLogin(loginObj)
                        }}>
                            Login</Button>
                        <p style={{color:'red'}}>{this.state.message}</p>

                    </Card.Body>
                    <Card.Footer className="text-muted" >
                        Login Portal </Card.Footer>
                </Card>
            </div >
        );
    }
}

export default App;