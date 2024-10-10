import { forwardRef } from "react"
import solutionimg from "../../../assests/images/solutions.png"
import useAnimateOnIntersect from "../../../hooks/useAnimation"
import LandingApiHoc from "../landingHoc"
const Solutions = forwardRef((props,ref)=>{
    const {landData} = props;
    // const ref = useAnimateOnIntersect({ rootMargin: "-800px" }, [
    //   {
    //     selector: "#slideright",
    //     animationClass: "animate__slideInRight",
    //   },
    
    // ],'id')
    return (
        <section id="solutions" className="solutions" ref={ref}>
        <div className="container">
          <div className="section-title">
            <h2>Solutions</h2>
          </div>

     
          <div className="row">
            <div className="col-md-6">
            {landData?.map((data)=>{
             return <div className="solution-content">
                <p className="solution-content-head" style={{fontSize:"34px",fontWeight:"600"}}> Find the best <span style = {{color:"#00e785"}}> {data?.header}</span> for you</p>
                <br />
                <p className="solution-content-description" style={{height:"100px",overflow:"hidden"}}>{data?.description}</p>
                <br />
                </div>
            })
          }
            </div>
            <div className="col-md-6  animate__animated " id="slideright">
              <img src={solutionimg} style={{width:"100%",height:"100%"}} alt="#"/>
            </div>
          </div>
        </div>
  
      </section>
    )
})

export default LandingApiHoc(Solutions,"/solutions/")