import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import useIntersection from "../../../hooks/useIntersection";
import usePublicApi from "../../../hooks/usePublicApi";

const LandingApiHoc = (LandingComp,path)=>{
    const CommonComp = ()=>{
        const [landData,setLandingData] = useState([])
        const [hasFetched, setHasFetched] = useState(false);
        const publicApi = usePublicApi();
        const fetchData =  useCallback(async () => {
            if (!hasFetched) {
              const apiData = await publicApi("GET", path);
              setLandingData(apiData);
              setHasFetched(true);
            }
          }, [hasFetched, publicApi, path]);
        

        const ref = useIntersection(fetchData, { threshold: 0.8 });
        return <LandingComp landData={landData} ref={ref}/>
    }

    return CommonComp
}
export default LandingApiHoc;