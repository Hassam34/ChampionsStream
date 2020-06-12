import React from 'react';
import Login from './screens/Login'
import DashBoard from './screens/DashBoard'
import LiveStream from './screens/liveStream/LiveStream'
import UploadVideo from './screens/uploadVideo/UplaodVideo'
import VideoCollections from './screens/videoCollections/VideoCollections'


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
        <Route exact path="/" render={(routeProps) => <Login {...routeProps} />} />
        <Route exact path="/dashBoard" render={(routeProps) => <DashBoard {...routeProps} />} />
        <Route exact path="/uploadVideo" render={(routeProps) => <UploadVideo {...routeProps} />} />
        <Route exact path="/liveStream" render={(routeProps) => <LiveStream {...routeProps} />} />
        <Route exact path="/videoCollections" render={(routeProps) => <VideoCollections {...routeProps} />} />
      </Switch>
    </Router>
  );
}

export default App;
