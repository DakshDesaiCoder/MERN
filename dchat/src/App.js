import { auth, provider,db } from "./firebase";
import { useState,useEffect } from 'react';
import './App.css'
import Logo from './logo.jpg'
import Router from './Router'
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
  useEffect(()=>{
    const doWork=async()=>{
      await auth.onAuthStateChanged(function(user) {
        setUser(user)
      })
    }
    doWork()
    
  },[])
  return (
    <div className="App">
      {user?(
          <Router userPhoto={user.photoURL} userName={user.displayName} userEmail={user.email} />
      ):(
        <div className='app__login'>
            <h1>Daksh Chat</h1>
              <img src={Logo} alt="Logo"  />
              <button onClick={handleLogin}>Log in to DChat</button>
              <footer style={{position: "fixed",bottom: 0,textAlign: "center",alignSelf: "center",width: "100%",display: "inline"}} >
            <hr />
            <p>Developed By Daksh Desai</p> 
            <a href="https://github.com/DakshDesaiCoder" style={{textDecoration: "none",color:"gray",fontSize: "medium"}} target="_blank" className="fa fa-github"></a>   
            </footer>
            </div>
      )}
    </div>
  );
}

export default App;
