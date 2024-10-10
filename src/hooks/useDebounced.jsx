// import { callback } from "chart.js/dist/helpers/helpers.core";
import React, { useEffect, useCallback, useRef } from "react";

const useDebounceEffect = (callback,delay)=>{
  const timeoutRef = useRef(null);

  useEffect(()=>{
    return ()=>{
      if(timeoutRef.current){
        clearTimeout(timeoutRef.current)
      }
    }
    
  },[])

  const debounceEffect = (...args)=>{
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(()=>{
      callback(...args);
    },delay)
  }
  return debounceEffect
}
export default useDebounceEffect