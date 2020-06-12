import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class DashBoard extends React.Component {
    render() {
        return (
            <div>
                <header>

                </header>
                <div className="body">
                    <Card style={{ width: '18rem', marginRight: 15 }}>
                        <Card.Img variant="top" src="data:image/png;base64,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" />
                        <Card.Body>
                            <Card.Title style={{ fontSize: 30 }}>Upload Video</Card.Title>
                            <Card.Text>
                                Upload your favourite videos here
                                 </Card.Text>
                            <Button variant="primary" size="lg" onClick={()=>this.props.history.push('/uploadVideo')}>Upload</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem', marginRight: 15 }}>
                        <Card.Img variant="top" src="https://i.pinimg.com/736x/c1/39/d3/c139d34d479a53a776f874cc718a3881.jpg" />
                        <Card.Body>
                            <Card.Title style={{ fontSize: 30 }}>Live Stream</Card.Title>
                            <Card.Text>
                                Start Streaming with your friends
                                 </Card.Text>
                            <Button variant="primary" size="lg" onClick={()=>this.props.history.push('/liveStream')}>Go Live</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem', marginRight: 15 }}>
                        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlnPs4Kl_H_A5-3CoI6WiyoR8euOY5ViJsZ2BRubVvrCEPc4m9&usqp=CAU" />
                        <Card.Body>
                            <Card.Title style={{ fontSize: 30 }}>Your Videos</Card.Title>
                            <Card.Text>
                                Check your uploaded videos
                                 </Card.Text>
                            <Button variant="primary" size="lg" onClick={()=>this.props.history.push('/videoCollections')}>Your Videos</Button>
                        </Card.Body>
                    </Card>
                </div >
            </div>

        )
    }
}
export default DashBoard