import './App.css';
import Router from './Router'
import { auth, provider,db } from "./firebase";
import { useState,useEffect } from 'react';
import {Button} from 'react-bootstrap'

function App() {
  const [user, setUser] = useState()
  
  const [uuid,setUuid]=useState('')
  const [adminData,setAdminData]=useState()
  const [adminCheck,setAdminCheck] = useState(false)
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
        setUuid(user.uid)
      }else{
        setUser(user)
        setUuid(user.uid)
        
      } 
    })
  }
  
  doWork()
  
},[])
  useEffect(()=>{
    const readAdmin = async()=>{

      await db.collection("admins").where("uuid","==",uuid).onSnapshot(function(querySnapshot){
        setAdminData(
          querySnapshot.docs.map((doc) => ({
            uuid:doc.data().uuid
          }))
        )
      })
    }
    readAdmin()
  })  
  
  return (
    <div className="App">
      {
        
        user ? (
          user.email.includes("kvis-icse.in")===true?(<>
            {adminData?(
              <>
              {adminData.length===1?(<Router userPhoto={user.photoURL} userName={user.displayName} userEmail={user.email} admin={true} />):(<Router userPhoto={user.photoURL} userName={user.displayName} userEmail={user.email} admin={false} />)}
              
              </>
            ):(
              
              <></>
            )}
            
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
