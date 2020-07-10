import React from 'react';
import Login from './screens/Login'
import DashBoard from './screens/DashBoard'
import LiveStream from './screens/liveStream/LiveStream'
import UploadVideo from './screens/uploadVideo/UplaodVideo'
import VideoCollections from './screens/videoCollections/VideoCollections'
import VideoChatRoom from './screens/liveStream/VideoChatRoom'
import UserScreen from './screens/users/UsersScreen'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}  >
      <Switch>
        <Route exact path="/" render={(routeProps) => <UserScreen {...routeProps} />} />
        <Route  path="/dashBoard" render={(routeProps) => <DashBoard {...routeProps} />} />
        <Route  path="/uploadVideo" render={(routeProps) => <UploadVideo {...routeProps} />} />
        <Route  path="/liveStream" render={(routeProps) => <LiveStream {...routeProps} />} />
        <Route  path="/videoCollections" render={(routeProps) => <VideoCollections {...routeProps} />} />
        <Route  path="/login" render={(routeProps) => <Login {...routeProps} />} />
        <Route  path="/videoChatRoom/:roomName/:token" render={(routeProps) => <VideoChatRoom {...routeProps} />} />

      </Switch>
    </Router>
  );
}

export default App;
