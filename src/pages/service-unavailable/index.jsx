import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import service from "../../assests/images/serviceunavailable.png"
import AddButton from "../../components/common/Button/addButton"

const ServiceUnavailable = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const[count,setCount] = useState(0);
    const[showlogin,setShowLogin] = useState(false)
    const intervalRef = useRef(null);
    const pathname = location.pathname;

    const handleNavigate = ()=>{
        navigate('/login');
        sessionStorage.clear()
    }
    useEffect(()=>{ 
        
        let timeout;
        // timeout = setTimeout(()=>{
        //     navigate(-1)
        // },3000)
        intervalRef.current =   setInterval(()=>{
                setCount(prev=>prev+1)
        },[1000])

        return ()=>{
            clearTimeout(timeout)
            clearInterval(intervalRef.current)
        }
    },[])

    useEffect(()=>{
        if(count >= 5){
            clearInterval(intervalRef.current);
            setShowLogin(true)
        }
        
    },[count])
    return (
        <>
        <div style={{display:"flex",justifyContent:"center"}}>
            <img src={service} style={{objectFit:"contain",width:"40%",height:"40%"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
           {showlogin? <p>Issue with the service now, Please try after sometimes</p>:<p>Please wait for {count} seconds before we fix this for you.</p>}
           {showlogin && <AddButton buttonText={"Back to Login"} handleClick={handleNavigate}/>}
        </div>
        </>
    )
}
export default ServiceUnavailable