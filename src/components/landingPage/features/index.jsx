import "../landingpage.css";
import f1 from "../../../assests/images/f1.png";
import LandingApiHoc from "../landingHoc";
import { forwardRef } from "react";
const Features = forwardRef((props,ref) => {
   const{landData} = props
  return (
    <>
      <section id="services" className="services" ref={ref}>
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Features</h2>
            <p style={{display:"flex",justifyContent:"center"}}>
            Welcome to Connex's Features Page!
            </p>
          </div>

          <div className="row">
            {landData.map((features) => {
              return (
                <div
                  className="col-md-6 d-flex align-items-stretch"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="icon-box">
                    <i>
                      <img src={features.image ?? f1} style={{ width: "45px" }} />
                    </i>
                    <h4 className="font-28">
                      <p>{features.header}</p>
                    </h4>
                    <p>
                     {features.content}
                    </p>
                  </div>
                </div>
              );
            })}
         
          </div>
        </div>
      </section>
    </>
  );
})

export default LandingApiHoc(Features,'/features/');
