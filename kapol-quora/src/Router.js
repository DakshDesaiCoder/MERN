import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Home from './components/Home'
import QuestionsByYou from './components/QuestionsByYou'
import AskQuestion from './components/AskQuestion'
import AdminPage from './components/Admin'
import ErrorPage from './components/404page'
function Router({userPhoto,userName,userEmail,admin}) {
  
    return (
      <BrowserRouter>
        <NavBar  userPhoto={userPhoto} admin={admin}
        />
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
        {admin===true?(
          <Route exact path="/admin">
            <AdminPage />
          </Route>
         
        ):(
          <Route exact path="/admin">
            <ErrorPage />
          </Route>
          
        )}
        <Route exact path="/*">
  
          <ErrorPage />
        </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  
  export default Router;