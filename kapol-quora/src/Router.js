import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Home from './components/Home'
import QuestionsByYou from './components/QuestionsByYou'
import AskQuestion from './components/AskQuestion'


function Router({userPhoto,userName,userEmail}) {
  
    return (
      <BrowserRouter>
        <NavBar  userPhoto={userPhoto}/>
        <Switch>
        <Route exact path="/">
   
            <Home userPhoto={userPhoto} userName={userName} userEmail={userEmail} />
          </Route>
          <Route exact path="/ask">
  
            <AskQuestion userPhoto={userPhoto} userName={userName} userEmail={userEmail} />
          </Route>    
          <Route exact path="/profile">
  
          <QuestionsByYou userPhoto={userPhoto} userName={userName} userEmail={userEmail} />
        </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  
  export default Router;