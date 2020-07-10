import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import { WebAPI } from '../../helpers/WebAPI'

class UserScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            roomName: '',
            secretKey: '',
            rooms: [],
            alertMessageJoin: '',
            showAlertJoin: false,
            showModalJoinRoom: false
        }
    }
    joinRoom = (roomName) => {
        this.setState({ showModalJoinRoom: false })
        this.props.history.push('/videoChatRoom/' + roomName + '/' + this.state.secretKey)
    }
    getRooms = async () => {
        const result = await new WebAPI().getRoom(this.state.secretKey)
        console.log('result is get rooms', result, result.roomsAvailable)
        if (result && result.roomsAvailable) {
            let array = []
            let size = result.data.rooms.length
            let showwww = true
            result.data.rooms.map((item, index) => {
                console.log('result is get rooms', item.roomName, this.state.roomName)
                if (item.roomName === this.state.roomName) {
                    showwww = false
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
                    alertMessageJoin: result.data.message
                })
            }

        }
        else {
            this.setState({
                showAlertJoin: true,
                alertMessageJoin: result.data.message
            })
        }
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
                    <Button variant="primary" onClick={() => this.joinRoom(this.state.roomName)}>
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
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
        return (
            <div className="App">
                <header >
                    <div className="logo">
                        <a href="#" style={{ display: 'flex', justifyContent: 'center' }}>
                            <img
                                style={{ height: 200, width: 375, borderRadius: 500 }}
                                src={require('../../assets/images/logo.jpeg')} alt="Video Stream App logo"></img>
                        </a>
                    </div>
                </header>

                <main>
                    {this.renderModalJoinRoom()}
                    <section id="pool-image" style={{ padding: 0 }}>
                        <div className="pool-marketing-text containerABC">
                            <div className='centeredABC'>
                                <Card style={{ padding: 50,borderRadius:10 }}>
                                    <h1 style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        color: 'black',
                                        fontSize: 40,
                                        marginTop: 5,
                                        fontWeight:'bold',
                                    }}>Join Room</h1>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            size='lg'
                                            placeholder="RoomName"
                                            aria-label="RoomName"
                                            aria-describedby="basic-addon1"
                                            value={this.state.roomName}
                                            onChange={(event) => this.setState({ roomName: event.target.value })}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="Secret Key"
                                            aria-label="SecretKey"
                                            aria-describedby="basic-addon2"
                                            type="password"
                                            size='lg'
                                            value={this.state.secretKey}
                                            onChange={(event) => this.setState({ secretKey: event.target.value })}
                                        />
                                    </InputGroup>
                                    {
                                        this.state.showAlertJoin &&
                                        this.renderAlertJoin()}
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button style={{
                                            marginTop: 0,
                                            backgroundColor: '#E51C24',
                                            color: 'white',
                                            fontSize: 20,
                                            paddingLeft: 50,
                                            paddingRight: 50
                                        }}
                                            // size="lg"
                                            // variant="primary"
                                            onClick={() => {
                                                if (this.state.roomName && this.state.secretKey) {
                                                    { this.getRooms() }
                                                }
                                                else {
                                                    this.setState({
                                                        showAlertJoin: true,
                                                        alertMessageJoin: "RoomName or SecretKey cant be null"
                                                    })
                                                }

                                            }}>
                                            Join
  </Button>

                                    </div>
                                </Card>

                            </div>

                        </div>
                    </section>

                    <section id="latest-news">
                        <div className="flex">
                            <h5>Latest News</h5>
                            <div id="latest-news-container">
                                <div className="latest-news-item">
                                    <span className="badge new">New</span>
                                    <span className="latest-news-text">Stay Tuned we developing our mobile app Also!!!</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="game-types-boxes">
                        <div className="flex">
                            <div className="box new">
                                <div className="shade"></div>
                                <span className="badge new">New</span>
                                <div className="contents">
                                    <h4>The Best Video Stream App Out There</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Video Stream website. This is not what we say, these are the qoutes of our community user.</p>
                                    <a href="#" className="comments">3 Comments</a>
                                </div>
                            </div>

                            <div className="box strategy">
                                <div className="shade"></div>
                                <span className="badge strategy">New</span>
                                <div className="contents">
                                    <h4>The Best Video Stream App Out There</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Video Stream website. This is not what we say, these are the qoutes of our community user.</p>
                                    <a href="#" className="comments">3 Comments</a>
                                </div>
                            </div>

                            <div className="box rpg">
                                <div className="shade"></div>
                                <span className="badge rpg">New</span>
                                <div className="contents">
                                    <h4>The Best Video Stream App Out There</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Video Stream website. This is not what we say, these are the qoutes of our community user.</p>
                                    <a href="#" className="comments">3 Comments</a>
                                </div>
                            </div>

                            <div className="box racing">
                                <div className="shade"></div>
                                <span className="badge racing">New</span>
                                <div className="contents">
                                    <h4>The Best Video Stream App Out There</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Video Stream website. This is not what we say, these are the qoutes of our community user.</p>
                                    <a href="#" className="comments">3 Comments</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="recent-games">
                        <h1>Recent Video Streams</h1>
                        <div className="flex">
                            <div className="box">
                                <span className="badge new">New</span>
                                <img src="https://www.visioncube.pl/cisco/images/CallPcSec2-1500x934.jpg" />
                                <div className="box-lower-section">
                                    <h4>The Best Video Stream App Out There</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Video Stream website. This is not what we say, these are the qoutes of our community </p>
                                    <a href="#" className="comments">3 Comments</a>
                                </div>
                            </div>

                            <div className="box">
                                <span className="badge racing">Racing</span>
                                <img src="https://www.bdo.com/BDO/media/Digital/Insights/Optimize%20IT/Attachments/pic6-2.png" />
                                <div className="box-lower-section">
                                    <h4>The Best Video Stream App Out There</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Video Stream website. This is not what we say, these are the qoutes of our community </p>
                                    <a href="#" className="comments">3 Comments</a>
                                </div>
                            </div>

                            <div className="box">
                                <span className="badge adventure">Adventure</span>
                                <img src="https://www.androidauthority.com/wp-content/uploads/2015/11/hangouts-video.jpg" />
                                <div className="box-lower-section">
                                    <h4>The Best Video Stream App Out There</h4>
                                    <p>The Pool Game is the most fun pool game ever made in the history of Video Stream website. This is not what we say, these are the qoutes of our community </p>
                                    <a href="#" className="comments">3 Comments</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <section id="tournaments">
                        <div className="flex">
                            <span className="badge tournaments">Tournaments</span>
                            <div className="box">
                                <span className="badge premium-tournament">Premium Tournament</span>
                                <div className="tournaments-image">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/tournaments_1.jpg" />
                                </div>
                                <div className="tournaments-content">
                                    <h3>Starcraft 2</h3>
                                    <div><label>Tournament Begins:</label> <strong>June 20, 2019</strong></div>
                                    <div><label>Tournament Ends:</label> <strong>July 01, 2019</strong></div>
                                    <div><label>Participants:</label> <strong>10 teams</strong></div>
                                    <div><label>Tournament Organizer:</label> <strong>Admin</strong></div>
                                    <div><label className="prizes">Prizes:</label> <label>1st place $2000, 2nd place: $1000, 3rd place: $500</label></div>
                                </div>
                            </div>

                            <div className="box">
                                <span className="badge premium-tournament">Premium Tournament</span>
                                <div className="tournaments-image">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/tournaments_2.jpg" />
                                </div>
                                <div className="tournaments-content">
                                    <h3>World Of Warcraft</h3>
                                    <div><label>Tournament Begins:</label> <strong>June 20, 2019</strong></div>
                                    <div><label>Tournament Ends:</label> <strong>July 01, 2019</strong></div>
                                    <div><label>Participants:</label> <strong>10 teams</strong></div>
                                    <div><label>Tournament Organizer:</label> <strong>Admin</strong></div>
                                    <div><label className="prizes">Prizes:</label> <label>1st place $2000, 2nd place: $1000, 3rd place: $500</label></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="recent-reviews">
                        <h1>Recent Reviews</h1>
                        <div className="flex">
                            <div className="box">
                                <span className="rating-badge gold">9.3</span>
                                <div className="recent-reviews-image">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/recent_reviews_1.jpg" />
                                </div>
                                <div>
                                    <h4>Assasin's Creed</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                </div>
                            </div>

                            <div className="box">
                                <span className="rating-badge purple">9.5</span>
                                <div className="recent-reviews-image">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/recent_reviews_2.jpg" />
                                </div>
                                <div>
                                    <h4>Doom</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                </div>
                            </div>

                            <div className="box">
                                <span className="rating-badge green">9.1</span>
                                <div className="recent-reviews-image">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/recent_reviews_3.jpg" />
                                </div>
                                <div>
                                    <h4>Overwatch</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                </div>
                            </div>

                            <div className="box">
                                <span className="rating-badge violet">9.7</span>
                                <div className="recent-reviews-image">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/recent_reviews_4.jpg" />
                                </div>
                                <div>
                                    <h4>GTA</h4>
                                    <p>The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="posts-comments">
                        <div className="flex">
                            <div className="game-warrior">
                                <img src="https://onclickwebdesign.com/wp-content/uploads/footer_logo.png" />
                                <p>The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                <img className="footer-graphic" src="https://onclickwebdesign.com/wp-content/uploads/sword_lady_footer.png" />
                            </div>

                            <div className="posts-comments-box">
                                <h3>Latest Posts</h3>
                                <div className="post-item">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/latest_posts_1.jpg" />
                                    <div>
                                        <h5>June 21, 2019</h5>
                                        <p>The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user.</p>
                                        <small>By: Admin</small>
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/latest_posts_2.jpg" />
                                    <div>
                                        <h5>June 21, 2019</h5>
                                        <p>The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user.</p>
                                        <small>By: Admin</small>
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/latest_posts_3.jpg" />
                                    <div>
                                        <h5>June 21, 2019</h5>
                                        <p>The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user.</p>
                                        <small>By: Admin</small>
                                    </div>
                                </div>
                            </div>

                            <div className="posts-comments-box">
                                <h3>Top Comments</h3>
                                <div className="comments-item">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/top_comments_1.jpg" />
                                    <div>
                                        <p><span className="author">James Smith</span> <span>on</span> The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                        <h5>June 21, 2019</h5>
                                    </div>
                                </div>

                                <div className="comments-item">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/top_comments_2.jpg" />
                                    <div>
                                        <p><span className="author">James Smith</span> <span>on</span> The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                        <h5>June 21, 2019</h5>
                                    </div>
                                </div>

                                <div className="comments-item">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/top_comments_3.jpg" />
                                    <div>
                                        <p><span className="author">James Smith</span> <span>on</span> The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                        <h5>June 21, 2019</h5>
                                    </div>
                                </div>

                                <div className="comments-item">
                                    <img src="https://onclickwebdesign.com/wp-content/uploads/top_comments_4.jpg" />
                                    <div>
                                        <p><span className="author">James Smith</span> <span>on</span> The Video Stream App is the most fun Video Stream App ever made in the history of Game. This is not what we say, these are the qoutes of our community user</p>
                                        <h5>June 21, 2019</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                */}
                </main>

                <footer>
                    <div className="flex">
                        <small>Copyright &copy; 2019 All rights reserved | Hassam Corpuration </small>
                        <small>Contact here &copy; hassam86.hy@gmail.com<br /> +923144680074 </small>
                        {/* <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>

                            <li>
                                <a href="#">Games</a>
                            </li>

                            <li>
                                <a href="#">Blog</a>
                            </li>

                            <li>
                                <a href="#">Forums</a>
                            </li>

                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul> */}
                    </div>
                </footer>

            </div>
        );
    }
}

export default UserScreen;
