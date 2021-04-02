import React,{useState,useEffect} from 'react'
import {db} from '../firebase'
import Card from 'react-bootstrap/Card'
import { ToastContainer, toast } from 'react-toastify';
import { Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap'
function Admin() {
    const [data,setData]=useState(
        []
     )
     const [renderAns,setRenderAns]=useState([])
     useEffect(()=>{
       db.collection("questions").where("report", "==", "true")
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
                     description:doc.data().description,
                     timestamp2:doc.data().timestamp,
                     relation:doc.data().relation,
                     desctiption:doc.data().description,
                     
                 }
             )
             )
         )
     }
     )},[])
 
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
    return (
        <>
            <div style={{textAlign:"center"}}>
                <span style={{fontSize:"150%"}}>Here are the questions reported by others: </span>
                <hr />
            </div>
        <div className="container-fluid col-10 mx-auto">
        <Row gy="3" style={{paddingTop:"5%",justifyContent:"space-around"}}>
           {data.map(question=>
           <div key={question.id} id={question.id}><Card style={{ margin:"20px",width: '100%' }} className="cards">
                
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
                   {question.document ? (
                       <Button variant="outline-info" style={{paddingLeft:"10px",borderRadius:"20px",marginRight:"10px"}} href={question.document} target="_blank">Document Link</Button>
                   ):(
                       <p>There is no document link for this question.</p>
                   )}
                   {renderAns.map(answer=>(
                       <>
                        
                        <div style={{marginTop:"20px",marginBottom:"20px"}}>
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
                        </>))}
                        <Button variant="outline-success"  style={{paddingLeft:"10px",paddingRight:"10px",marginLeft:"5px",marginRight:"5px",borderRadius:"20px"}} onClick={()=>{
                            db.collection("questions").doc(question.id).update({
                                report:"false"
                            }).then(()=>{
                                toast.dark('Report has been removed', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                });
                            }).catch(err=>alert(err))
                        }} >Remove Report</Button>
                   <Button variant="outline-danger" style={{paddingLeft:"10px",borderRadius:"20px"}} onClick={async()=>{
                       await db.collection("questions").doc(question.id).delete().then(()=>{
                        toast.dark('Question Has Been Deleted', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    });

                        
                       }).catch(err=>alert(err))
                   }}>Delete This Question</Button>
               </Card.Body>
           </Card>
           <br />
           </div>
           )}
       </Row>
       <ToastContainer />
   </div>
</>
            
    )
}

export default Admin
