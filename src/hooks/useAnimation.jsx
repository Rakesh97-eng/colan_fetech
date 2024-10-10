import { useEffect, useState, useRef } from 'react';

const useAnimateOnIntersect = (options, animations,cssselector)=>{

    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        options
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
        observer.disconnect();
      };
    }, [options]);
  
    useEffect(() => {
      if (isIntersecting && ref.current) {
          animations.forEach(({ selector, animationClass }) => {
            let element
        if(cssselector === "class"){
             element = ref.current.querySelectorAll(selector);
             if (element) {
                element.forEach((el)=>el.classList.add(`${animationClass}`))
              }
        }
        else{
            element = ref.current.querySelector(selector);
            if (element) {
                element.classList.add(`${animationClass}`);
              }
        }
         
        });
      }
    }, [isIntersecting, animations]);
  
    return ref;
  };
  
  export default useAnimateOnIntersect;
