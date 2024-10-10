import { Carousel } from "react-bootstrap";
import { sliderData } from "../../../utils/constants/landingpageData";
import "../landingpage.css";
import backarrow from "../../../assests/images/backarrow.png"
import frontarrow from "../../../assests/images/nextarrow.png"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import 'animate.css';

const LandingSlider = () => {
  return (
    <>
    <div className="bg-slide">
      <section
        id="hero"
        className="container d-flex justify-cntent-center align-items-center"
      >
        <Carousel indicators={false}   interval={null} style={{position:"static"}}>
        {/* <Carousel indicators={false}  nextIcon={<ArrowCircleRightIcon  style={{color:"rgb(0 230 138)"}}/>} prevIcon={<ArrowCircleLeftIcon style={{color:"#00e785"}}/>} interval={null} style={{position:"static"}}> */}
          {sliderData.map((data) => {
            const { sliderhaed, sliderPara } = data;
            return (
              <Carousel.Item>
                <div style={{ textAlign: "center",color:"white" }}>
                  <h3 className=" animate__animated animate__slideInDown">{sliderhaed}</h3>
                  <p  className=" animate__animated animate__slideInUp">{sliderPara}</p>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </section>
    </div>

    </>
  );
};
export default LandingSlider;
