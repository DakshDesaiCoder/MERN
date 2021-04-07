import React,{useState,useEffect} from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Navbar,Nav} from 'react-bootstrap'
import {useParams,useHistory,Link} from 'react-router-dom'
import {db} from '../firebase.js'
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import {Form} from 'react-bootstrap'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import Modal from 'react-modal';
import './room.css'
import firebase from 'firebase'
function Room({userPhoto,userName,userEmail}) {
    let {roomId} = useParams()
    const history = useHistory()
    const [type,setType] = useState()
    const [emojiPanel,setEmojiPanel] = useState(false)
    const [message,setMessage] = useState({
        message:""
    })
    const [renderMessage,setRenderMessage] = useState()
    function closeModal(){
        setEmojiPanel(false);
      }
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };
    function InputEvent(event){
        const {name,value}=event.target
        setMessage((preVal)=>{
            return{
                ...preVal,
                [name]:value
            }
        })
    }   
    const [privateData,setPrivate] = useState()
    useEffect(()=>{
        const checkType=async()=>{
            await db.collection('rooms').where("uuid",'==',roomId)
                    .onSnapshot(function(querySnapshot){
                        setType(
                            querySnapshot.docs.map((doc)=>({
                                uuid:doc.data().uuid,
                                accessType:doc.data().type,
                                adminEmail:doc.data().adminEmail,
                                name:doc.data().name,
                                icons:doc.data().icon
                            }))
                        )
                    })
            await db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setRenderMessage(snapshot.docs.map(doc=>doc.data()))
            ))        
        }
        checkType()
    },[])
    const EmojiData = ({ chosenEmoji }) => (
        <div>
          {message.message=message.message + chosenEmoji.emoji}
          {setChosenEmoji(null)}
        </div>
      );
    const privateCheck = async()=>{
        await db.collection('rooms').where("uuid",'==',roomId).where('users','array-contains',{[userName]:userEmail})
                    .onSnapshot(function(querySnapshot){
                        setPrivate(
                            querySnapshot.docs.map((doc)=>({
                                uuid:doc.data().uuid,
                                accessType:doc.data().type,
                                adminEmail:doc.data().adminEmail,
                                name:doc.data().name,
                                icons:doc.data().icon,
                                users:doc.data().users
                            }))
                        )
                    })
        await db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>(
                        setRenderMessage(snapshot.docs.map(doc=>doc.data()))
        ))              
                    
    }
    privateCheck()
    const send=async(event)=>{
        event.preventDefault()
        await db.collection('rooms').doc(roomId).collection("messages").add({
            message:message.message,
            name:userName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        await setMessage({
            message:""
        })
        setEmojiPanel(false)
    }
    return (
        <div className="chat">
            {type?(
                <div style={{width:"100%",backgroundColor:"white"}} >
                    {type.map(data=><div>
                        {data.accessType==='public'?(<div style={{width:'100%'}} >
                            
                            <Navbar bg="dark" variant="dark">
                                <Nav.Link onClick={() => history.goBack()} style={{color:'white'}} ><ArrowBackIcon /></Nav.Link>
                                <Navbar.Brand><img
                                alt=""
                                src={data.icons}
                                width="30"
                                height="30"
                                style={{borderRadius:"50%"}}
                                className="d-inline-block align-top"
                />{' '}{data.name}</Navbar.Brand>
                            {data.adminEmail===userEmail?(<Nav.Link onClick={async()=>{
                                var query_ =await db.collection('rooms').where('uuid','==',data.uuid);
                                    query_.get().then(function(querySnapshot) {
                                    querySnapshot.forEach(function(doc) {
                                        doc.ref.delete().then(()=>{
                                            history.push("/");
                                        })
                                        
                                    });
                                    });
                            }} style={{color:"white"}} ><DeleteIcon /></Nav.Link>):(<div></div>)}
                                
                            </Navbar>
                            {renderMessage?(
                        <>
                        <div className="message" style={{minHeight:"82vh",maxHeight:"82vh",overflow:"auto",overflowX:"hidden",padding:"30px"}}>
                        {renderMessage.map(message=>(
                            <p className={`chat__message ${message.name===userName && 'chat__receiver'}`} > <span className="chat__name">{message.name}</span> {message.message} <span className="chat__timestamp" >{new Date(message.timestamp?.toDate()).toUTCString()}</span> </p>
                        ))}               
                        
                        {emojiPanel===true?(
                                <>
                                <Modal
                                    isOpen={emojiPanel}
                                    onRequestClose={closeModal}
                                    
                                    contentLabel="Emojis"

                                    >
                                    <h1>Emojis</h1>
                                    <Picker
                                    onEmojiClick={onEmojiClick}
                                    disableAutoFocus={true}
                                    skinTone={SKIN_TONE_MEDIUM_DARK}
                                    groupNames={{ smileys_people: "PEOPLE" }}
                                    native
                                />
                                {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
                                    </Modal>
                                </>
                            ):""}
                    </div>
                    <hr />
                    <div style={{display:"flex",minHeight:"8vh",maxHeight:"8vh",position:"fixed",bottom:0,width:'100%',opacity:1,backgroundColor:"white",justifyContent:"space-between"}}>
                    <button inline onClick={()=>setEmojiPanel(!emojiPanel)} style={{float:"left",color:"gray",border:'none',backgroundColor:"white"}}><EmojiEmotionsIcon /></button>   
                        <Form inline style={{width:"100%"}} onSubmit={send} >
                            <Form.Group controlId="formMessage" style={{width:"80%"}} >
                                <input type="text" className="inputField" required placeholder="Message..." name="message" value={message.message} onChange={InputEvent} />
                            </Form.Group>

                            
                            <button className="send" type="submit" style={{float:"right",color:"gray",border:'none',backgroundColor:"white"}}><SendIcon />  </button>  
                             
                        </Form>
                    </div>
                    </>
                    ):(
                        <div></div>
                    )}

                        </div>):(<div>
                            
                            {privateData?(
                                <div>{privateData.map(dataPrivate=><div>
                                    <Navbar bg="dark" variant="dark">
                                        <Nav.Link as={Link} to="/" style={{color:'white'}} ><ArrowBackIcon /></Nav.Link>
                                        <Navbar.Brand>
                                        <img
                                            alt=""
                                            src={dataPrivate.icons}
                                            width="30"
                                            height="30"
                                            style={{borderRadius:"50%"}}
                                            className="d-inline-block align-top"
                            />{' '}
                                        {dataPrivate.name}</Navbar.Brand>
                                        {data.adminEmail===userEmail?(<><Nav.Link onClick={async()=>{
                                        var query__ =await db.collection('rooms').where('uuid','==',dataPrivate.uuid);
                                            query__.get().then(function(querySnapshot) {
                                            querySnapshot.forEach(function(doc) {
                                                doc.ref.delete().then(()=>{
                                                    history.push("/");
                                                })
                                                
                                            });
                                            });
                                    }} style={{color:"white"}} ><DeleteIcon /></Nav.Link>
                                    </>
                                    ):(<div></div>)}
                                    </Navbar> 
                                    {renderMessage?(
                        <>
                        <div className="message" style={{minHeight:"82vh",maxHeight:"82vh",overflow:"auto",overflowX:"hidden",padding:"30px"}}>
                        {renderMessage.map(message=>(
                            <p className={`chat__message ${message.name===userName && 'chat__receiver'}`} > <span className="chat__name">{message.name}</span> {message.message} <span className="chat__timestamp" >{new Date(message.timestamp?.toDate()).toUTCString()}</span> </p>
                        ))}               
                        
                        {emojiPanel===true?(
                                <>
                                <Modal
                                    isOpen={emojiPanel}
                                    onRequestClose={closeModal}
                                    
                                    contentLabel="Emojis"

                                    >
                                    <h1>Emojis</h1>
                                    <Picker
                                    onEmojiClick={onEmojiClick}
                                    disableAutoFocus={true}
                                    skinTone={SKIN_TONE_MEDIUM_DARK}
                                    groupNames={{ smileys_people: "PEOPLE" }}
                                    native
                                />
                                {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
                                    </Modal>
                                </>
                            ):""}
                    </div>
                    <hr />
                    <div style={{display:"flex",minHeight:"8vh",maxHeight:"8vh",position:"fixed",bottom:0,width:'100%',opacity:1,backgroundColor:"white",justifyContent:"space-between"}}>
                    <button inline onClick={()=>setEmojiPanel(!emojiPanel)} style={{float:"left",color:"gray",border:'none',backgroundColor:"white"}}><EmojiEmotionsIcon /></button>   
                        <Form inline style={{width:"100%"}} onSubmit={send} >
                            <Form.Group controlId="formMessage" style={{width:"80%"}} >
                                <input type="text" className="inputField" required placeholder="Message..." name="message" value={message.message} onChange={InputEvent} />
                            </Form.Group>

                            
                            <button className="send" type="submit" style={{float:"right",color:"gray",border:'none',backgroundColor:"white"}}><SendIcon />  </button>  
                             
                        </Form>
                    </div>
                    </>
                    ):(
                        <div></div>
                    )}

                                </div>)}
                                   
                                    </div>
                            ):(
                                <div>
                                   
                                </div>
                            )}
                        </div>)}
                        
                    </div>)}
                    
                    
                </div>

            ):(<div></div>)}
              
        </div>
    )
}

export default Room