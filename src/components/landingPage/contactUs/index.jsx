
import call from "../../../assests/images/call.png"
import email from "../../../assests/images/email.png"
import address from "../../../assests/images/address.png"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { contactusapi } from '../../../redux/action/authAction';
import useAnimateOnIntersect from "../../../hooks/useAnimation";
const ContactUs = ()=>{
  const dispatch = useDispatch();
  const [contactdata,setContactdata] = useState({
    name:"",email:"",
    subject:"",
    message:""
  })

  const handleChange = (e)=>{
    const {name,value} = e?.target;
    setContactdata({...contactdata,[name]:value})
  }

 const handleSubmit = (e)=>{
  e.preventDefault();
  dispatch(contactusapi(contactdata))
 }

 const ref = useAnimateOnIntersect({ rootMargin: "-300px" }, [
  {
    selector: ".slideright",
    animationClass: "animate__slideInUp",
  },
],"class");
    return(
       <>
        <section id="contact" className="contact" ref={ref}>
        <div className="container" data-aos="fade-up">
  
          <div className="section-title">
            <h2>Contact Us</h2>
          </div>
  
          <div className="row mt-1 d-flex justify-content-end" data-aos="fade-right" data-aos-delay="100">
  
            <div className="col-lg-5  animate__animated slideright">
              <div className="info">
                <div className="address" style={{display:"flex"}}>
                 <div>
                 <img src={address} style={{width:"60px" ,height:"60px"}}/>
                 </div>
                 <div>

                  <p style={{fontSize:"24px",fontWeight:"600",color:"#030028"}} >Location:</p >
                  <p>A108 Adam Street, New York, NY 535022</p>
                 </div>
                </div>
  
                <div className="email" style={{display:"flex"}}>
                 
                <div>
                 <img src={email} style={{width:"60px" ,height:"60px"}}/>
                 </div>
                 <div>
                  <p style={{fontSize:"24px",fontWeight:"600",color:"#030028"}} > Email:</p >
                  <p>info@example.com</p>
                  </div>
                </div>
  
                <div className="phone" style={{display:"flex"}}>
                <div>
                 <img src={call} style={{width:"60px" ,height:"60px"}}/>
                 </div>
                 <div>
                  <p style={{fontSize:"24px",fontWeight:"600",color:"#030028"}} >Call:</p >
                  <p>+1 5589 55488 55s</p>
                </div>
                </div>
  
              </div>
  
            </div>
  
            <div className="col-lg-6 mt-5 mt-lg-0 animate__animated slideright" data-aos="fade-left" data-aos-delay="100">
  
              <form  className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="name" onChange={handleChange} placeholder="Your Name" required/>
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" name="email" id="email" onChange={handleChange} placeholder="Your Email" required/>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name="subject" id="subject" onChange={handleChange} placeholder="Subject" required/>
                </div>
                <div className="form-group mt-3">
                  <textarea className="form-control" id="message" name="message" rows="5" onChange={handleChange} placeholder="Message" required></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div className="text-center"><button type='submit' onClick={handleSubmit}>Send Message</button></div>
              </form>
  
            </div>
  
          </div>
  
        </div>
      </section>
       </>
    )
}
export default ContactUs