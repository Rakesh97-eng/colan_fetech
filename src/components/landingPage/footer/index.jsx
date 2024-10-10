import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Google } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import useAnimateOnIntersect from '../../../hooks/useAnimation';
const Footer = () => {
  const ref = useAnimateOnIntersect({ rootMargin: "-800px" }, [
    {
      selector: ".flipicon",
      animationClass: "animate__flipInX",
    },
  
  ],'class')
  return (
    <>

    <footer id="footer" ref={ref}>
    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-4 col-md-6 footer-links">
            <p style={{fontSize:"20px",fontWeight:"600",color:"white"}}>USEFUL LINKS</p>
            <ul>
              <div className="row">
                <div className="col-lg-6">
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Features</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                </div>
                <div className="col-lg-6">
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Pricing</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Solutions</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Blogs</a></li>
                </div>
              </div>
           
            </ul>
          </div>


          <div className="col-lg-4 col-md-6 footer-contact">
            <p style={{fontSize:"20px",fontWeight:"600"}}>CONTACT US</p>
            <p>
              A108 Adam Street <br></br>
              New York, NY 535022<br></br>
              United States <br></br><br></br>
              <strong>Phone:</strong> +1 5589 55488 55<br></br>
              <strong>Email:</strong> info@example.com<br></br>
            </p>

          </div>

          <div className="col-lg-3 col-md-6 footer-info">
            <p style={{fontSize:"20px",fontWeight:"600"}}>FOLLOW US</p>
     
            <div className="social-links mt-3">
              {/* <a href="#" className="flipicon animate__animated twitter"><TwitterIcon fontSize='20px'/></a>
              <a href="#" className="flipicon animate__animated facebook"><FacebookIcon fontSize='20px'/></a>
              <a href="#" className="flipicon animate__animated instagram"><InstagramIcon fontSize='20px'/></a>
              <a href="#" className="flipicon animate__animated google-plus"><Google fontSize='20px'/></a> */}
              <a href="https://www.linkedin.com/company/connexuk/" className="flipicon animate__animated linkedin"><LinkedInIcon fontSize='20px'/></a>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright Connex. All Rights Reserved
      </div>
      {/* <div className="credits">

        Designed by <a>Colan Infotech</a>
      </div> */}
    </div>
  </footer>
  
    </>
  );
};


export default Footer