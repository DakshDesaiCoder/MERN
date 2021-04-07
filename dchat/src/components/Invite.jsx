import React,{useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {Card,Button} from 'react-bootstrap'
import {db} from '../firebase'
import firebase from 'firebase'
function Invite({userName,userEmail}) {
    let {roomId} = useParams()
    const [data,setData] = useState()
    let history = useHistory()
    useEffect(()=>{
        const read = async()=>{
            db.collection("rooms").where("type","==","private").where("uuid",'==',roomId)
              .onSnapshot(function(querySnapshot){
                  setData(querySnapshot.docs.map((doc)=>({
                    id:doc.id,
                    roomName:doc.data().name,
                    createdBy:doc.data().adminName,
                  })))
              })
        }
        read()
    },[])
    return (
        <div>
            {data?(
                <div style={{margin:"20px"}} >
                    {data.map(details=>
                        <Card style={{padding:"10px"}} >
                            <Card.Body>You  are invited to join: {details.roomName} created by: {details.createdBy}.</Card.Body>
                            <Button onClick={async()=>{
                                db.collection("rooms").doc(details.id).update({
                                    users:firebase.firestore.FieldValue.arrayUnion({[userName]:userEmail})
                                }).then(()=>{
                                    history.push(`/room/${details.id}`)
                                }).catch(err=>{alert(err)})
                            }} >Join Group as {userName}</Button>
                        </Card>
                    )}
                </div>
            ):(
                <h1>There is no group or group in public now.</h1>
            )}
        </div>
    )
}

export default Invite
