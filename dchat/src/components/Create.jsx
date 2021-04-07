import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {
    MenuItem,
    FormControl,
    Select,
  } from "@material-ui/core";
import {Button,Form} from 'react-bootstrap'
import './CreateRoom.css'
import {db} from '../firebase.js'
import firebase from 'firebase'
function Create({userName,userEmail}) {
    const [type,setType]=useState("public")
    const [data,setData]=useState({
        roomName:"",
        grpIcon:"",
        
    })  
    function InputEvent(event){
        const {name,value}=event.target
        setData((preVal)=>{
            return{
                ...preVal,
                [name]:value
            }
        })
    }   
    const ref = db.collection('rooms').doc();
    const id = ref.id; 
    const sendQuestion = async(e)=>{
        
        e.preventDefault()
        if(type==="public"){
            await ref.set({
                name:data.roomName,
                icon:data.grpIcon || "http://www.guvitgowl.com/images/admin/no-avatar.png",
                adminEmail:userEmail,
                adminName:userName,
                type,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                uuid:id
            }).then(()=>{
                setData({
                    roomName:"",
                    grpIcon:"",
                    email:userEmail,
                    displayName:userName,
                })
                setType("public")
                toast.dark('Room Has Been Created', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
    
            }).catch(err=>{
                toast.dark(err, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            })
    
        }else{
            await ref.set({
                name:data.roomName,
                icon:data.grpIcon || "http://www.guvitgowl.com/images/admin/no-avatar.png",
                adminEmail:userEmail,
                adminName:userName,
                type,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                users:[{[userName]:userEmail}],
                uuid:id
            }).then(()=>{
                setData({
                    roomName:"",
                    grpIcon:"",
                    email:userEmail,
                    displayName:userName,
                    
                })
                setType("public")
                toast.dark('Room Has Been Created', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
    
            }).catch(err=>{
                toast.dark(err, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            })
    
        }
        
       
     
    }
    const onStdChange=(e)=>{
        setType(e.target.value)
    }
    const url = window.location.hostname
    return (
        <div className="ask_question">
            <div className="card" style={{width:"100%"}}>
                <h3>Create Room</h3>
                <div className="questionAsked" >
                
                    <Form onSubmit={sendQuestion}>
                        <Form.Group controlId="formBasicGrpName">
                            <Form.Label>Room Name: </Form.Label>
                            <Form.Control type="text" placeholder='Group Name:' required={true} name="roomName" value={data.roomName} onChange={InputEvent}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicGrpIcon">
                            <Form.Label>Link For Group Icon(OPTIONAL):</Form.Label>
                            <Form.Control type="text" placeholder="Link" name="grpIcon" value={data.grpIcon} onChange={InputEvent}/>
                        </Form.Group>
                        <FormControl className="std_dropdown">
                        <Select
                            variant="outlined"
                            value={type}
                            onChange={onStdChange}
                            >
                            <MenuItem value="public">Public Room</MenuItem>
                            <MenuItem value="private" >Private Room</MenuItem>
                        </Select>
                        </FormControl>
                        {type==="private"?(
                            <>
                            <p>Invitation Link for group is: {url}/invite/{id}</p>
                            <p style={{color:'red'}} >Note: This Link will be copied to your clipboard automatically on clicking submit.</p>
                            </>
                        ):(
                            <p></p>
                        )}
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Button variant="primary" type="submit" onClick={()=>{
                            if(type==="private"){
                                const copyLink = url.concat("/invite/",id)
                                navigator.clipboard.writeText(copyLink)
                                toast.dark('Invitation Link Copied To ClipBoard', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    })
                            }
                            else{
                                navigator.clipboard.writeText("")
                            }
                        }} style={{borderRadius:"20px",marginBottom:"20px"}} >
                            Submit
                        </Button>
                    </Form>
            </div>
        </div>
        <ToastContainer />
        
        </div>
        
    )
}

export default Create
