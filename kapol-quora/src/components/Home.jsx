import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {db} from '../firebase'
import { Row} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import {Button,Form} from 'react-bootstrap'
import firebase from 'firebase'
import {
    MenuItem,
    FormControl,
    Select,
  } from "@material-ui/core";
function Home({userPhoto,userEmail,userName}) {
    const [answer,setAnswer]=useState({
        ans:""
    })
    const [std,setStd]=useState('all')
    const [answerShow,setAnswerShow]=useState("")
   
    const [renderAns,setRenderAns]=useState([])
    function InputEvent(event){
        const {name,value}=event.target
        setAnswer((preVal)=>{
            return{
                ...preVal,
                [name]:value
            }
        })
    }

    const [data,setData]=useState(
        []
     )
     useEffect(()=>{
        const questionsForAll=()=>{
            db.collection("questions")
            
              .onSnapshot(function(querySnapshot){
                  
             setData(
                 querySnapshot.docs.map((doc) => ({

                     id:doc.id,
                     question:doc.data().question,
                     document:doc.data().document,
                     displayName:doc.data().displayName,
                     email:doc.data().email,
                     profilePicture:doc.data().profilePicture,
                     std:doc.data().std,
                     timestamp2:doc.data().timestamp,
                     relation:doc.data().relation,
                     description:doc.data().description
                        }
                    )
                    )
                )
            })
        }
        const renderByStd=async(standard)=>{
            db.collection("questions").where("std","==",standard)
              .onSnapshot(function(querySnapshot){
                  
             setData(
                 querySnapshot.docs.map((doc) => ({

                     id:doc.id,
                     question:doc.data().question,
                     document:doc.data().document,
                     displayName:doc.data().displayName,
                     email:doc.data().email,
                     profilePicture:doc.data().profilePicture,
                     std:doc.data().std,
                     timestamp2:doc.data().timestamp,
                     relation:doc.data().relation,
                     description:doc.data().description
                        }
                    )
                    )
                )
            })
        }
        if(std==='all'){
            questionsForAll()
        }else{
            renderByStd(std)
        }
       
     },[std])
     useEffect(()=>{
        
            db.collection("answers")
              .onSnapshot(function(querySnapshot){
                  
            setRenderAns(
                 querySnapshot.docs.map((doc) => ({

                     id:doc.id,
                     answer:doc.data().answer,
                     userEmail:doc.data().userEmail,
                     userName:doc.data().userName,
                     userPhoto:doc.data().userPhoto,
                     questionId:doc.data().questionId,
                     timestamp:doc.data().timestamp
                     
                        }
                    )
                    )
                )
            })
        
     },[])
    const onStdChange=(e)=>{
        setStd(e.target.value)
    }

    return (
        <>
        <div className="home__header" style={{display:'flex',alignItems:"center",justifyContent:"space-between",marginLeft:"10px",marginTop:"5px"}}>
        <div>
        <Select 
                variant="outlined"
                value={std}
                onChange={onStdChange}
                style={{width:"100%"}}
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
            
        </div>
        
            
        </div>
        <hr />
        <div className='home'>
            <h2 style={{color:'black',fontStyle:"italic",textAlign:"center"}}>Here Are The Questions Asked by people from our community: </h2>
            {data?(        
                <div className="container-fluid col-10 mx-auto">
        <Row gy="3" style={{paddingTop:"5%",justifyContent:"space-around"}}>
           {data.map(question=>
           <div key={question.id} id={question.id}><Card style={{ width: '100%' }} className="cards">
                {question.id===''?(
                    <h1>No results found</h1>
                ):(
                    <Card.Body>
                   <img src={question.profilePicture} alt='Profile Picture' style={{borderRadius:"50%",height:"40px",width:"40px",marginLeft:"5px",marginRight:"10px"}} />
                   <span style={{fontSize:"150%"}}>{question.question}</span>
                   <hr />
                   <Card.Text>Description: <span style={{color:'red'}}>{question.description}</span></Card.Text>
                   <Card.Text style={{fontSize:"13px"}} >Asked on: <span style={{color:'red'}}>{question.timestamp2?(
                        question.timestamp2.toDate().toString()
                   ):(
                       <p></p>
                   )}</span></Card.Text>
                   <Card.Text>Asked By: <span style={{color:'red'}}>{question.displayName}</span> for <span style={{color:'red'}}>{question.std}</span> standard/standards related to <span style={{color:'red'}}>{question.relation}</span></Card.Text>
                   {renderAns.map(answer=>(
                       <>
                        
                        <div>
                            {
                                
                                answer.questionId===question.id?(
                                   <>
                                    
                                    <p key={answer.id}><span style={{fontWeight:"bold"}}>Answered On: </span> <span style={{fontWeight:"bold"}}>{answer.timestamp?(
                                        answer.timestamp.toDate().toString()
                                    ):(
                                        <p></p>
                                    )}</span> <span style={{color:"red"}}>{answer.answer}</span> by <span style={{fontWeight:"bold"}}>{answer.userName}</span></p>
                                    </>
                                ):(
                                   <p></p>
                                )
                            }
                        </div>
                        </>
                   ))}
                   {question.document ? (
                       <Button variant="outline-info" style={{paddingLeft:"10px",borderRadius:"20px",marginRight:"10px"}} href={question.document} target="_blank">Document Link</Button>
                   ):(
                       <p>There is no document link for this question.</p>
                   )}
                   {question.email === userEmail ?(
                        <p>You Cannot Answer A Question Asked By You.</p>
                   ):(answerShow===""?(
                        <Button variant="outline-info" style={{paddingLeft:"10px",borderRadius:"20px",marginRight:"10px"}} onClick={()=>setAnswerShow(question.id)}>Show Answer Form</Button>
                   ):(answerShow===question.id?(<div className="answer">
                        <Form>  
                        <Form.Group controlId="formBasicAnswer">
                            <Form.Label>Answer: </Form.Label>
                            <Form.Control as="textarea" row={5} type="text" placeholder='Your Answer ' required={true} name="ans" value={answer.ans} onChange={InputEvent}/>
                        </Form.Group>
                    <Button variant="outline-info" onClick={()=>{
                        if(answer.ans ===""){
                            toast.dark('Please Fill The Form !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                        }else{
                            db.collection("answers").add({
                            questionId:question.id,
                            userPhoto:userPhoto,
                            userName:userName,
                            userEmail:userEmail,
                            answer:answer.ans,
                            timestamp:firebase.firestore.FieldValue.serverTimestamp()
                        }).then(()=>{
                            setAnswer({
                                ans:""
                            })
                            toast.dark('Answer has been posted.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                        }).catch(err=>alert(err))
                        
                        }
                        
                    }} style={{paddingLeft:"10px",borderRadius:"20px",marginRight:"10px"}}>Submit This Answer</Button>
                     <Button variant="outline-danger" style={{paddingLeft:"10px",borderRadius:"20px",marginRight:"10px"}} onClick={()=>{
                         setAnswer({
                             ans:""
                         })
                         setAnswerShow("")
                     }} >Close This Answer Form</Button>
                     </Form>
                     </div>):(
                         <p style={{color:"red"}}>You Need To Close Other Answer Tab To See This Answer Tab</p>
                     )
                    
                   )
                       
                   )

                   }
               </Card.Body>
                )}
               
           </Card>
           <br />
           </div>
           )}
       </Row>

   </div>
):(
    <div style={{textAlign:"center"}}>
        <h2 style={{color:'cyan'}}>There Are No Questions Asked Yet!</h2>
        <Button variant="outline-info" style={{paddingLeft:"10px",borderRadius:"20px",alignSelf:'center'}} as={Link} to="/ask">Go To Ask Question Page</Button>
    </div>
)
}
            <ToastContainer />
        </div>
        </>
    )
}

export default Home
