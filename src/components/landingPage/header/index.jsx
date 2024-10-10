// import { Container, Nav } from "react-bootstrap";
// import "../landingpage.css";
// import headerlogo from "../../../assests/images/connex VM - LOGO C4 (1) 2.png"
// import { useNavigate } from "react-router-dom";
// const Header = () => {
//   const navigate = useNavigate()
//   return (
//     <>
//       <header
//         id="header"
//       >
//         <Container className="container d-flex align-items-center justify-content-between " >
//           <h1 className="logo">
//             <a href="index.html">
//               <img src={headerlogo} alt="" />
//             </a>
//           </h1>
        
//           <Nav id="navbar" className="navbar" >
           
//              <Nav.Item>
//                 <Nav.Link className="nav-link scrollto " href="#hero" style={{margin:"10px"}}>
//                   Home
//                 </Nav.Link>
//               </Nav.Item>
//              <Nav.Item>
//                 <Nav.Link className="nav-link scrollto" href="#about" style={{margin:"10px"}}>
//                   About Us
//                 </Nav.Link>
//               </Nav.Item>
//              <Nav.Item>
//                 <Nav.Link className="nav-link scrollto" href="#services" style={{margin:"10px"}}>
//                   Features
//                 </Nav.Link>
//               </Nav.Item>
//              <Nav.Item>
//                 <Nav.Link className="nav-link scrollto" href="#team" style={{margin:"10px"}}>
//                   Pricing
//                 </Nav.Link>
//               </Nav.Item>
//              <Nav.Item>
//                 <Nav.Link className="nav-link scrollto" href="#contact" style={{margin:"10px"}}>
//                   Contact Us
//                 </Nav.Link>
//               </Nav.Item>
              
            
//             <i className="bi bi-list mobile-nav-toggle"></i>
//             <button className="landinglogin"  onClick={()=>navigate('/bookdemo')} >
//                Book Now
//               </button>
//             <button className="landinglogin"  onClick={()=>navigate('/login')}>
//                 Login/Register
//               </button>
//           </Nav>
        

    
//         </Container>
//       </header>
//     </>
//   );
// };
// export default Header;


import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import "../landingpage.css";
import "./header.css";
import headerlogo from "../../../assests/images/connex VM - LOGO C4 (1) 2.png";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
const Header = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <header id="header">
        <Container className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <a href="index.html">
              <img src={headerlogo} alt="" />
            </a>
          </h1>
          <Nav id="navbar" className="navbar">
            <Nav.Item>
              <Nav.Link className="nav-link scrollto" href="#hero" style={{ margin: "10px" }}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link scrollto" href="#about" style={{ margin: "10px" }}>
                About Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link scrollto" href="#services" style={{ margin: "10px" }}>
                Features
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link scrollto" href="#team" style={{ margin: "10px" }}>
                Pricing
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="nav-link scrollto" href="#contact" style={{ margin: "10px" }}>
                Contact Us
              </Nav.Link>
            </Nav.Item>
            <button className="landinglogin" onClick={() => navigate('/bookdemo')}>
              Book Now
            </button>
            <button className="landinglogin" onClick={() => navigate('/login')}>
              Login/Register
            </button>
          </Nav>
            {/* <i className="bi bi-list mobile-nav-toggle" onClick={toggleDrawer}></i> */}
            <MenuIcon className="bi bi-list mobile-nav-toggle" onClick={toggleDrawer} />
        </Container>
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        {/* <button className="drawer-close" onClick={toggleDrawer}>Button</button> */}
        <CloseIcon className="drawer-close" onClick={toggleDrawer}/>
        <Nav className="drawer-nav">
          <Nav.Item>
            <Nav.Link className="nav-link scrollto" href="#hero">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-link scrollto" href="#about">
              About Us
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-link scrollto" href="#services">
              Features
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-link scrollto" href="#team">
              Pricing
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-link scrollto" href="#contact">
              Contact Us
            </Nav.Link>
          </Nav.Item>
          <button className="landinglogin" onClick={() => navigate('/bookdemo')}>
              Book Now
            </button>
            <button className="landinglogin" onClick={() => navigate('/login')}>
              Login/Register
            </button>
        </Nav>
      </div>
      </header>
    </>
  );
};

export default Header;
