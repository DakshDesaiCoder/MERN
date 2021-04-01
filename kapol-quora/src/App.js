import './App.css';
import Router from './Router'
import { auth, provider } from "./firebase";
import { useState,useEffect } from 'react';

function App() {
  const [user, setUser] = useState()
  const handleLogin = ()=>{
    auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */  
      var user = result.user;
      console.log(user)
    }).catch((error) => {
      console.log(error)
    });
  }
  useEffect(()=>{
    const doWork=async()=>{
      await auth.onAuthStateChanged(function(user) {
        if (user) {
          
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
          <>
            <Router userPhoto={user.photoURL} userName={user.displayName} userEmail={user.email}/>
          </>
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
