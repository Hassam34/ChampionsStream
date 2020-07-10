import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Alert from 'react-bootstrap/Alert'
import { WebAPI } from '../../helpers/WebAPI'

class LiveStream extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            enablePassword: false,
            showModal: false,
            roomName: '',
            roomPassword: '',
            alertMessage: '',
            showAlert: false,
            message: '',
            token: localStorage.getItem('ChampionToken'),
            rooms: [],
            showModalJoinRoom: false,
            roomNameJoin: '',
            showAlertJoin: false,
            alertMessageJoin: '',
        }
    }
    componentDidMount() {
        this.getRooms()
    }
    getRooms = async () => {
        const result = await new WebAPI().getRoom(this.state.token)
        console.log('result is get rooms', result, result.roomsAvailable)
        if (result && result.roomsAvailable) {
            let array = []
            let size = result.data.rooms.length
            result.data.rooms.map((item, index) => {
                array.push({
                    room: item.roomName
                })
                if (index === size - 1) {
                    this.setState({
                        rooms: array,
                    })
                }

            })

        }
        else {
            // this.setState({
            //     message: '* ' + result.data.message,
            //     roomPassword: '',
            // })
        }
    }
    joinRoom = (roomName) => {
        this.setState({ showModal: false })
        this.props.history.push('/videoChatRoom/' + roomName+'/'+this.state.token)
    }
    createRoom = async (roomObj) => {
        const result = await new WebAPI().createRoom(roomObj)
        console.log('data is data and', result)
        if (result && result.roomCreated) {
            this.setState({
                message: '* ' + result.data.message,
                roomPassword: '',
                showModal: true
            })
            this.getRooms()
        }
        else {
            this.setState({
                message: '* ' + result.data.message,
                roomPassword: '',
            })
        }
    }
    renderModal = () => {
        return (
            <Modal
                show={this.state.showModal}
                onHide={() => this.setState({ showModal: false })}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Room name {this.state.roomName} Sucessfuly Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    To Join the room click {"'Join'"}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.joinRoom(this.state.roomName)}>
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    renderModalJoinRoom = () => {
        return (
            <Modal
                show={this.state.showModalJoinRoom}
                onHide={() => this.setState({ showModalJoinRoom: false })}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Room name {this.state.roomNameJoin} is Available</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    To Join the room click {"'Join'"}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.joinRoom(this.state.roomNameJoin)}>
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    renderAlert() {
        return (
            <Alert variant="danger" onClose={() => this.setState({ showAlert: false })} dismissible>
                <Alert.Heading>{this.state.alertMessage}</Alert.Heading>
            </Alert>
        )
    }
    renderAlertJoin() {
        return (
            <Alert variant="danger" onClose={() => this.setState({ showAlertJoin: false })} dismissible>
                <Alert.Heading>{this.state.alertMessageJoin}</Alert.Heading>
            </Alert>
        )
    }
    render() {
        console.log('The state are', this.state)
        return (
            <div className="body">
                {this.renderModal()}
                {this.renderModalJoinRoom()}
                <Accordion defaultActiveKey="0">
                    <Card
                        style={{ width: this.state.width - ((this.state.width / 100) * 30) }}
                    >
                        <Card.Header>
                            <Accordion.Toggle style={{ fontWeight: 'bold', fontSize: 25 }}
                                as={Button} variant="link" eventKey="0">
                                Create Room
                                </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body style={{ padding: 50, width: this.state.width - ((this.state.width / 100) * 50), }}>
                                <InputGroup className="mb-3" style={{ marginTop: 10 }}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        placeholder="Room Name"
                                        aria-label="Room Name"
                                        aria-describedby="basic-addon1"
                                        type="text"
                                        size="lg"
                                        value={this.state.roomName}
                                        onChange={(event) => this.setState({ roomName: event.target.value })}

                                    />
                                </InputGroup>
                                {this.state.enablePassword &&
                                    <InputGroup className="mb-3" style={{ marginTop: 10 }}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            placeholder="Room Password"
                                            aria-label="Room Password"
                                            aria-describedby="basic-addon1"
                                            type="password"
                                            size="lg"
                                            value={this.state.roomPassword}
                                            onChange={(event) => this.setState({ roomPassword: event.target.value })}
                                        />
                                    </InputGroup>

                                }
                                {
                                    this.state.showAlert &&
                                    this.renderAlert()}
                                <Form.Check
                                    style={{ marginTop: 10 }}
                                    type="switch"
                                    id="custom-switch"
                                    label={this.state.enablePassword ? "Disable Password for this room" : "Enable Password for this room"}
                                    size="lg"
                                    checked={this.state.enablePassword}
                                    onChange={(event) => this.setState({ enablePassword: !this.state.enablePassword })}
                                />
                                <Button style={{ marginTop: 30 }} variant="primary" size="lg" onClick={() => {
                                    if (this.state.enablePassword) {
                                        if (!this.state.roomPassword) {
                                            this.setState({
                                                showAlert: true,
                                                alertMessage: "Password cannot be null!"
                                            })
                                        }
                                        else {
                                            let roomObj = {
                                                roomName: this.state.roomName,
                                                password: this.state.roomPassword ? this.state.roomPassword : 0,
                                                token: this.state.token
                                            }
                                            console.log('ccccccccc', roomObj)
                                            this.createRoom(roomObj)

                                        }

                                    }
                                    else {
                                        let roomObj = {
                                            roomName: this.state.roomName,
                                            password: this.state.roomPassword ? this.state.roomPassword : 0,
                                            token: this.state.token
                                        }
                                        console.log('ccccccccc', roomObj)
                                        if (this.state.roomName) {
                                            this.createRoom(roomObj)
                                        }

                                    }
                                }
                                }>
                                    Create Room</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle style={{ fontWeight: 'bold', fontSize: 25 }} as={Button} variant="link" eventKey="1">
                                Join Existing Room
                                </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body style={{ padding: 50, width: this.state.width - ((this.state.width / 100) * 50), }}>

                                <InputGroup>
                                    <Form.Control
                                        placeholder="Room Name"
                                        value={this.state.roomNameJoin}
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={(event) => this.setState({ roomNameJoin: event.target.value })}

                                    />

                                    <DropdownButton
                                        as={InputGroup.Append}
                                        variant="outline-secondary"
                                        title="Dropdown"
                                        id="input-group-dropdown-2"
                                    >
                                        {
                                            this.state.rooms.map((item, index) => {
                                                return (
                                                    <Dropdown.Item key={index} onClick={() => {
                                                        this.setState({ roomNameJoin: item.room })
                                                    }} >{item.room}</Dropdown.Item>
                                                )
                                            })
                                        }

                                    </DropdownButton>
                                </InputGroup>
                                {
                                    this.state.showAlertJoin &&
                                    this.renderAlertJoin()}
                                <Button style={{ marginTop: 50 }} size="lg" variant="primary" onClick={() => {
                                    let size = this.state.rooms.length
                                    let showwww=true
                                    this.state.rooms.map((item, index) => {
                                        if (item.room === this.state.roomNameJoin) {
                                            showwww=false
                                            this.setState({
                                                showAlertJoin: false,
                                                alertMessageJoin: "",
                                                showModalJoinRoom: true,
                                            })
                                        }
                                    })
                                    if (showwww) {
                                        this.setState({
                                            showAlertJoin: true,
                                            alertMessageJoin: "Room is not Available"
                                        })
                                    }

                                }}>
                                    Join
  </Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle style={{ fontWeight: 'bold', fontSize: 25 }} as={Button} variant="link" eventKey="2">
                                Delete Existing Room
                                </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body style={{ padding: 50, width: this.state.width - ((this.state.width / 100) * 50), }}>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Room Name"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />

                                    <DropdownButton
                                        as={InputGroup.Append}
                                        variant="outline-secondary"
                                        title="Dropdown"
                                        id="input-group-dropdown-2"
                                    >
                                        <Dropdown.Item href="#">Corona Class</Dropdown.Item>
                                        <Dropdown.Item href="#">Corona Meetings</Dropdown.Item>

                                    </DropdownButton>
                                </InputGroup>
                                <Button style={{ marginTop: 50 }} size="lg" variant="primary" onClick={() => this.setState({ showModal: false })}>
                                    Delete
  </Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

export default LiveStream