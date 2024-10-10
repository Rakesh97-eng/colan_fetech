import { useEffect } from "react";
import { useRef } from "react"

export const useModalClose = (modalState,handleModal)=>{
    const ref = useRef();

    useEffect(()=>{
        const handleClose = (e)=>{
            if(e.target?.role !== "option" &&!ref?.current?.contains(e.target) && ref?.current && modalState){
                handleModal(false)
            }
        }

        document.addEventListener('mousedown',handleClose)
        return ()=>{
            document.removeEventListener('mousedown',handleClose)
        }
    },[modalState])

    return ref
}