import React from 'react'
import {
    Row,
    Col,
    Container,
    Modal,
    Button,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import { WebAPI } from '../../helpers/WebAPI'
import * as OT from '@opentok/client';

var publisher
var session
var video
var subscribers
class VideoChatRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            roomPasswordEnable: false,
            showModal: false,
            width: window.innerWidth,
            height: window.innerHeight,
            enablePassword: false,
            roomName: '',
            roomPassword: '',
            myArrayOfSubscriber: 0,
            subscriberarray: [],
            showVideo: true,
            showAudio: true,
            subscriberAudio: true,
            onlineButton: 'btn btn-raised btn-agent-status',
            publisherName: '',
            disconnect: false,
            userName: '',
            password: '',
            showMainPage: false,
            passwordEnable: false,
            error: '',
            showSettings: false,
            sessionId: '',
            admin: false,
            passwordUpdated: false,
            slack_integration: false,
            statusDropdownExpanded: false,
            activeStatus: 'ONLINE',
            agentStatuses: ['AWAY'],
            showRecoverAccount: false,
            email: '',
            windowWidth: 0,
            onMobileDevice: false,
            redirect: null,
            playSound: false
        }
    }
    componentDidMount() {
        // let sessionObj = {
        //     roomName: this.props.match.params.roomName,
        //     userName: this.state.userName,
        //     token: this.props.match.params.token,
        //     password: this.state.password
        // }
        // this.fetchingData(sessionObj)
        let settingsObj = {
            roomName: this.props.match.params.roomName,
            token: this.props.match.params.token
        }
        this.checkSettings(settingsObj)
    }
    checkSettings = async (settingsObj) => {
        const data = await new WebAPI().checkSettings(settingsObj)
        console.log('data check settings', data)
        if (data) {
            this.setState({
                showModal: true
            })
            if (data.passwordEnable) {
                this.setState({
                    roomPasswordEnable: true
                })
            }
            else {
                console.log('message is else', data.data.message)
            }

        }
        else {
            console.log('message is full else', data.data.message)
        }
    }
    fetchingData = async (sessionObj) => {
        const data = await new WebAPI().getSessionId(sessionObj)
        console.log('data is data and', data)
        if (data && data.sessionCreated) {
            this.setState({ publisherName: data.namePublisher, showMainPage: true,showModal:false })
            this.initializeSession(data)
        }
        else {
            this.setState({ errorMessage: '*' + data.message, password: '' })
        }
    }
    initializeSession(data) {
        this.setState({ sessionId: data.sessionId, admin: data.admin })
        console.log('checking data', data.apiKey, data.sessionId, data.tokenSession)
        session = OT.initSession(data.apiKey, data.sessionId);
        let that = this
        session.on('streamCreated', function (event) {
            subscribers = session.subscribe(event.stream, 'subscriber',
                {
                    insertMode: 'append',
                    width: '100%',
                    height: '100%',
                },
            );
            that.setState({ subscriberarray: that.state.subscriberarray.concat(subscribers) })
        }, (err) => {
            console.log('errr1', err)
        });

        publisher = OT.initPublisher('publisher', {
            name: this.state.userName,
            insertMode: 'append',
            width: '100%',
            height: '100%',
        }, (err) => {
            console.log('err2', err)
        });
        publisher.on("streamDestroyed", function (event) {
            event.preventDefault();
            console.log("The publisher stopped streaming. Reason: "
                + event.reason);
        });
        console.log('The publisher ', publisher)
        session.on("connectionCreated", function (event) {
            that.setState({ myArrayOfSubscriber: that.state.myArrayOfSubscriber + 1 },
                () => {
                    that.setState({ playSound: that.state.myArrayOfSubscriber > 1 ? true : false },
                        () => {
                            setTimeout(() => {
                                that.setState({ playSound: false })
                            }, 2000);
                        })
                })
        });
        session.on("connectionDestroyed", function (event) {
            that.setState({ myArrayOfSubscriber: that.state.myArrayOfSubscriber - 1 }, () => { that.setState({ playSound: false }) })
        });
        session.on("sessionDisconnected", function (event) {
            console.log("The session disconnected. " + event.reason);
        });
        session.connect(data.tokenSession, function (error) {
            if (error) {
                console.log('The real error is', error);
            } else {
                session.publish(publisher, (err) => {
                    console.log("err3 ", err)
                });
            }
        });
    }
    renderModalSettingsRoom = () => {
        return (
            <Modal
                show={this.state.showModal}
                onHide={() => this.setState({ showModal: false })}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Room Settings
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={this.state.userName}
                            onChange={(event) => this.setState({ userName: event.target.value })}

                        />

                    </InputGroup>
                    {this.state.roomPasswordEnable
                        &&
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Password"
                                aria-label="Password"
                                type='password'
                                aria-describedby="basic-addon1"
                                value={this.state.password}
                                onChange={(event) => this.setState({ password: event.target.value })}

                            />
                        </InputGroup>
                    }
                    <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        if (this.state.roomPasswordEnable) {
                            if (this.state.userName && this.state.password) {
                                this.setState({ errorMessage: '' })
                                let sessionObj = {
                                    roomName: this.props.match.params.roomName,
                                    userName: this.state.userName,
                                    token: this.props.match.params.token,
                                    password: this.state.password
                                }
                                this.fetchingData(sessionObj)
                            }
                            else {
                                this.setState({ errorMessage: '* Password or Username cannot be empty' })
                            }
                        }
                        else {
                            if (this.state.userName) {
                                this.setState({ errorMessage: '' })
                                let sessionObj = {
                                    roomName: this.props.match.params.roomName,
                                    userName: this.state.userName,
                                    token: this.props.match.params.token,
                                    password: '0'
                                }
                                this.fetchingData(sessionObj)
                            }
                            else {
                                this.setState({ errorMessage: '* Username cannot be empty' })
                            }
                        }

                    }}>Go Live</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    render() {
        console.log('THe states are:', this.state)
        return (
            <div style={{ flex: 1 }} className="body-video" >
                {this.renderModalSettingsRoom()}
                <div style={{
                    height: this.state.height - ((this.state.height / 100) * 35), padding: 30,
                }}>
                    <Row style={{ marginTop: 30, height: 400, padding: 30 }} xs={1} md={2} lg={3} id="subscriber">

                    </Row>
                </div>
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'self',
                    display: 'flex',
                    height: this.state.height - ((this.state.height / 100) * 65),
                    borderRadius: 100
                }} >
                    <div
                        id="publisher"
                        style={{ width: 300, borderRadius: 500, borderRadius: 100 }}

                    >
                    </div>
                </div>

            </div>
        )
    }
}
export default VideoChatRoom