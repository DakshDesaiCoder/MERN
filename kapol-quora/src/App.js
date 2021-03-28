import './App.css';
import Router from './Router'
import { auth, provider } from "./firebase";
import { useState } from 'react';

function App() {
  const [user, setUser] = useState()
  const handleLogin = () => {
    if (!user) {
      auth.signInWithPopup(provider).then((result) => {
        setUser(result.user)
        
      }).catch((error) => {
        alert(error.message);
      });
    } else if (user) {
      auth.signOut().then(() => {
        setUser(null)
      }).catch((err) => alert(err.message))
    }
  }

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
            </div>
          )
      }
    </div>
  );
}

export default App;
