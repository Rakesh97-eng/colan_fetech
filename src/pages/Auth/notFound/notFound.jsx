import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NotFound = ()=>{
    const navigate = useNavigate();
    useEffect(  ()=>{
        setTimeout(()=>{
            sessionStorage.setItem('ur',0);
            navigate('/')
        },300)
    },[])

    return (
        <>
            Redirecting to Login
        </>
    )
}

export default NotFound