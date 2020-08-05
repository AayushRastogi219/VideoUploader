import React from "react";
import "./styles.css";
import {Switch, Route} from 'react-router-dom'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signup/SignUp'
import Upload from './components/upload/Upload'
import Dashboard from './components/Dashboard/Dashboard'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import SignOut from './components/SignOut/SignOut'


export default function App() {
  return (
    <>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/upload' component={Upload} />
      <Route exact path='/video/:videoTitle' component={VideoPlayer} />
      <Route exact path='/signOut' component={SignOut} />
      </Switch>
    </>
  );
}
