import React,{useState,useEffect} from 'react'
import {db} from '../firebase'
import {Link} from 'react-router-dom'
function Home({userPhoto,userName,userEmail}) {
    const [data,setData] = useState()
    const [dataPrivate,setDataPrivate] = useState()
    useEffect(()=>{
        const publicRoom=async()=>{
            await db.collection("rooms").where("type","==","public")
            
              .onSnapshot(function(querySnapshot){
                  
             setData(
                 querySnapshot.docs.map((doc) => ({

                     id:doc.id,
                     icon:doc.data().icon,
                     name:doc.data().name
                        }
                    )
                    )
                )
            })
        }
        const privateRoom = async()=>{
            await db.collection("rooms").where("type","==","private").where('users','array-contains',{[userName]:userEmail})
            
            .onSnapshot(function(querySnapshot){
                
            setDataPrivate(
               querySnapshot.docs.map((doc) => ({

                   id:doc.id,
                   icon:doc.data().icon,
                   name:doc.data().name,
                   users:doc.data().users
                      }
                  )
                  )
              )
          })
        }
        publicRoom()
        privateRoom()
    },[])
    const url="/room/"
    return (
        <div>
            {data?(<div>
                {data.map(details=><Link to={url.concat(details.id)} key={details.id} style={{paddingTop:"5px",textDecoration:"none",color:"gray"}} >
                    <div>                    
                        <img src={details.icon} style={{borderRadius:"50%",marginRight:"20px",marginLeft:"5px"}} width="40" height="40"  />
                        <span style={{fontSize:"1.75rem"}} >{details.name}</span>
                        <hr />
                    </div>
                </Link>)}
            </div>):(<div></div>)}
            {dataPrivate?(<div>
                {dataPrivate.map(details=><Link to={url.concat(details.id)} key={details.id} style={{paddingTop:"5px",textDecoration:"none",color:"gray"}} >
                    <div>                    
                        <img src={details.icon} style={{borderRadius:"50%",marginRight:"20px",marginLeft:"5px"}} width="40" height="40"  />
                        <span style={{fontSize:"1.75rem"}} >{details.name}</span>
                        <hr />
                    </div>
                </Link>)}
            </div>):(<div></div>)}
            <footer style={{position: "fixed",bottom: 0,textAlign: "center",alignSelf: "center",width: "100%",display: "inline"}} >
            <hr />
            <p>Developed By Daksh Desai</p> 
            <a href="https://github.com/DakshDesaiCoder" style={{textDecoration: "none",color:"gray",fontSize: "medium"}} target="_blank" className="fa fa-github"></a>   
            </footer>
        </div>
    )
}

export default Home
