import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {
    MenuItem,
    FormControl,
    Select,
  } from "@material-ui/core";
import {Button,Form} from 'react-bootstrap'
import './AskQuestion.css'
import {db} from '../firebase.js'
import firebase from 'firebase'
function AskQuestion({userName,userPhoto,userEmail}) {
    const [std,setStd]=useState("all")
    const [data,setData]=useState({
        question:"",
        document:"",
        description:""
        
    })    
    const [relation,setRelation]=useState("other")
    function InputEvent(event){
        const {name,value}=event.target
        setData((preVal)=>{
            return{
                ...preVal,
                [name]:value
            }
        })
    }
    const sendQuestion = async(e)=>{
        e.preventDefault()
        
        await db.collection("questions").add({
            question:data.question,
            description:data.description,
            document:data.document,
            email:userEmail,
            displayName:userName,
            profilePicture:userPhoto,
            std,
            relation,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }).then(()=>{
            setData({
                question:"",
                document:"",
                description:"",
                email:userEmail,
                displayName:userName,
                profilePicture:userPhoto,
            })
            setRelation("other")
            setStd("all")
            toast.dark('Question Has Been Asked', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

        }).catch(err=>{
            alert(err)
        })

       
     
    }
    const onRelationChange = (e)=>{
        setRelation(e.target.value)
    }
    const onStdChange=(e)=>{
        setStd(e.target.value)
    }
    return (
        <div className="ask_question">
            <div className="card" style={{width:"100%"}}>
                <h3>Ask Question</h3>
                <div className="tips">
                    <h5>Tips on getting good answers quickly</h5>
                    <ul>
                        <li>Make sure your question has not been asked already</li>
                        <li>Keep your question short and to the point</li>
                        <li>Double-check grammar and spelling</li>
                    </ul>
                </div>
                <div className="userDetails">
                    <img src={userPhoto} alt='User Profile Pic' />
                    <span style={{color:'gray',fontSize:'15px'}}>{userName} asked: </span>
                </div>
                <div className="questionAsked" >
                
                    <Form onSubmit={sendQuestion}>
                        <Form.Group controlId="formBasicQuestion">
                            <Form.Label>Question: </Form.Label>
                            <Form.Control type="text" placeholder='Start With "What",etc ' required={true} name="question" value={data.question} onChange={InputEvent}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicQuestionDescription">
                            <Form.Label>Question's Description: </Form.Label>
                            <Form.Control as='textarea' row={5} type="text" placeholder='Enter Description ' required={true} name="description" value={data.description} onChange={InputEvent}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLink">
                            <Form.Label>Link For Document(OPTIONAL):</Form.Label>
                            <Form.Control type="text" placeholder="Link" name="document" value={data.document} onChange={InputEvent}/>
                        </Form.Group>
                        <FormControl className="std_dropdown">
                        <Select
                            variant="outlined"
                            value={std}
                            onChange={onStdChange}
                            >
                            <MenuItem value="all">All Standards</MenuItem>
                            <MenuItem value="1" >1</MenuItem>
                            <MenuItem value="2" >2</MenuItem>
                            <MenuItem value="3" >3</MenuItem>
                            <MenuItem value="4" >4</MenuItem>
                            <MenuItem value="5" >5</MenuItem>
                            <MenuItem value="6" >6</MenuItem>
                            <MenuItem value="7" >7</MenuItem>
                            <MenuItem value="8" >8</MenuItem>
                            <MenuItem value="9" >9</MenuItem>
                            <MenuItem value="10" >10</MenuItem>
                        </Select>
                        
                        <Select variant='outlined' value={relation} onChange={onRelationChange} style={{marginTop:"10px"}} >
                            <MenuItem value="other" >Other Reason</MenuItem>
                            <MenuItem value='studies' >Studies</MenuItem>
                            <MenuItem value='holiday' >Holiday</MenuItem>
                            <MenuItem value='fees'>Fees</MenuItem>
                            <MenuItem value='events'>Events</MenuItem>
                        </Select>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                        <Button variant="primary" type="submit" style={{borderRadius:"20px",marginBottom:"20px"}} >
                            Submit
                        </Button>
                    </Form>
                    

               
            </div>
        </div>
        <ToastContainer />
        </div>
        
    )
}

export default AskQuestion
