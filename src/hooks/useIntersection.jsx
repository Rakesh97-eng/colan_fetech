import { useState, useEffect, useRef, useCallback } from 'react';

const useIntersection = (callback, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  const stableCallback = useCallback(callback, []);

  useEffect(() => {
    if (!ref.current || isIntersecting) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        stableCallback();
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      if (observer && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options, isIntersecting, stableCallback]);

  return ref;
};

export default useIntersection;
