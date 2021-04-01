import './App.css';
import Router from './Router'
import { auth, provider } from "./firebase";
import { useState,useEffect } from 'react';
import {Button} from 'react-bootstrap'
function App() {
  const [user, setUser] = useState()
  const handleLogin = ()=>{
    auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */  
      var user = result.user;
      
    }).catch((error) => {
      alert(error)
    });
  }
  function googleSignout() {
    auth.signOut()
   
    .then(function() { window.location.reload(true);
    }, function(error) {
       console.log('Signout Failed')  
    });
 }
 useEffect(()=>{
  const doWork=async()=>{
    await auth.onAuthStateChanged(function(user) {
      if (user.email.includes("kvis-icse.in")===true) {
        
        setUser(user)
      }else{
        setUser(user)
      } 
    });
  }
  doWork()
},[])
  
  return (
    <div className="App">
      {
        
        user ? (
          user.email.includes("kvis-icse.in")===true?(<>
            
            <Router userPhoto={user.photoURL} userName={user.displayName} userEmail={user.email}/>
          </>):(
            <>
            <h1>You Are not logged in via school email id</h1>
            <Button onClick={googleSignout}>Sign Out To Login</Button>
            </>
          )
          
        ) : (
            <div className='app__login'>
            <h1>Kapol Quora</h1>
              <img src="https://www.schoology.com/sites/default/files/blog-images/relationship_between_school_and_community_.jpg" alt="Logo"  />
              <button onClick={handleLogin}>Log in to Kapol Quora</button>
              <p>Make Sure You Login From School id to ask and answer question or you will not be able to read any questions.</p>
            </div>
          )
      }
    </div>
  );
}

export default App;
