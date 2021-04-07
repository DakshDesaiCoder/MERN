import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeNav from './components/HomeNav'
import Home from './components/Home'
import CreateNav from './components/CreateNav'
import Create from './components/Create'
import Invite from './components/Invite'
import Room from './components/Room'
function Router({userPhoto,userName,userEmail}) {
  
    return (
      <BrowserRouter>
        <Switch>
        <Route exact path="/">
            <HomeNav userPhoto={userPhoto} />
            <Home userPhoto={userPhoto} userName={userName} userEmail={userEmail} />
          </Route>
          <Route exact path="/new">
              <CreateNav />
              <Create userName={userName} userEmail={userEmail} />
          </Route>    
          <Route exact path="/invite/:roomId">
            <Invite userName={userName} userEmail={userEmail} />
        </Route>
        <Route exact path="/room/:roomId">
          <Room userPhoto={userPhoto} userName={userName} userEmail={userEmail} />
        </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  
  export default Router;