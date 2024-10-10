import "../landingpage.css";
import aboutus from "../../../assests/images/aboutus.png";
import "./aboutus.css";
import { useState } from "react";
import useAnimateOnIntersect from "../../../hooks/useAnimation";
import LandingApiHoc from "../landingHoc";
import { forwardRef } from "react";

const AboutUs = forwardRef((props,ref) => {
  const {landData} = props;

  const [showmore, setShowMore] = useState(false);

  const handleReadmore = () => {
    setShowMore(!showmore);
  };


  const animeref = useAnimateOnIntersect({ rootMargin: "-300px" }, [
    {
      selector: "#animatefirstcontent",
      animationClass: "animate__slideInLeft",
    },
    {
      selector: "#animatesecondcontent",
      animationClass: "animate__slideInRight",
    },
  ],"id");
  return (
    <>
      <section id="about" class="about" ref={(el)=>{ref.current = el;animeref.current=el}}>
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>About Us</h2>
            <p style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            Welcome to Connex!
            </p>
          </div>

          <div
            className="row content "
            style={{ display: "flex", alignItems: "center" }}
          >
            <div class="col-lg-6 animate__animated" id="animatefirstcontent">
              <img src={aboutus} style={{ width: "80%", height: "100%" }} />
            </div>
            <div
              class="col-lg-6 pt-4 pt-lg-0 animate__animated"
              id="animatesecondcontent"
            >
              <p
                className="abouts-view"
                style={{ overflowY: showmore ? "scroll" : "hidden" }}
              >
                <p dangerouslySetInnerHTML={{ __html: landData?.about_content }}/>
                {!showmore && <div className="gradient-overlay"></div>}
              </p>
              <a class="btn-learn-more" onClick={handleReadmore}>
                {showmore ? "Show Less" : "Show More"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
})
export default LandingApiHoc(AboutUs,"/list_aboutus/");
