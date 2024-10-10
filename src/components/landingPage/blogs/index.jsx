import Icons from "../../../assests/images/Icons.png";
import User from "../../../assests/images/User.png";
import blog1 from "../../../assests/images/Blog (2).png";
import blog2 from "../../../assests/images/Blog (1).png";
import { Icon } from "@mui/material";
import useAnimateOnIntersect from "../../../hooks/useAnimation";
import { useState } from "react";
import LandingApiHoc from "../landingHoc";
import { forwardRef } from "react";
import { useEffect } from "react";
const Blogs = forwardRef((props, ref) => {
  const { landData } = props;
  const [blogdata, setBlogdata] = useState(landData ||[]);
  const [showCount,setShowCount] = useState(3);

  useEffect(()=>{
    setBlogdata(landData.slice(0,showCount))
  },[landData,showCount])

  const animeref = useAnimateOnIntersect(
    { rootMargin: "-800px" },
    [
      {
        selector: ".setup-card",
        animationClass: "animate__slideInDown",
      },
    ],
    "class"
  );
  return (
    <>
      <section
        className="Blogs"
        ref={(el) => {
          animeref.current = el;
          ref.current = el;
        }}
      >
        <div className="section-title">
          <h2>OUR BLOGS</h2>
        </div>
        <div
          className="Card-edit"
          style={{
            display: "flex",
            justifyContent: "space-arround",
            flexWrap: "wrap",
          }}
        >
          {blogdata?.map((blog) => {
            const { image, header, description, author, created_at } = blog;
            return (
              <div
                className="card setup-card animate__animated"
                id="#animateblogs"
              >
                <img
                  className="card-img-top"
                  src={image}
                  style={{padding:"10px"}}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p
                    className="card-title"
                    style={{ fontSize: "24px", fontWeight: "600" }}
                  >
                    {/* Build your dream Software & Engineering System */}
                    {header}
                  </p>
                  <p className="card-text" style={{ padding: "15px 0px" }}>
                    {/* This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer. */}
                    {description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: " space-between",
                    }}
                  >
                    <div className="Cfooter-setup">
                      <img
                        src={Icons}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p>{created_at?.split('T')[0]}</p>
                    </div>
                    <div className="Cfooter-setup">
                      <img
                        src={User}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p>{author}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div id="#animateblogs" className="card setup-card animate__animated">
            <img className="card-img-top" src={blog2} alt="Card image cap" />
            <div className="card-body">
              <p
                className="card-title"
                style={{ fontSize: "24px", fontWeight: "600" }}
              >
                Build your dream Software & Engineering System
              </p>
              <p className="card-text" style={{ padding: "15px 0px" }}>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div
                style={{ display: "flex", justifyContent: " space-between" }}
              >
                <div className="Cfooter-setup">
                  <img src={Icons} style={{ width: "20px", height: "20px" }} />
                  <p>Oct 25, 2023</p>
                </div>
                <div className="Cfooter-setup">
                  <img src={User} style={{ width: "20px", height: "20px" }} />
                  <p>Mark Stonis</p>
                </div>
              </div>
            </div>
          </div>
          <div id="#animateblogs" className="card setup-card animate__animated">
            <img className="card-img-top" src={blog1} alt="Card image cap" />
            <div className="card-body">
              <p
                className="card-title"
                style={{ fontSize: "24px", fontWeight: "600" }}
              >
                Build your dream Software & Engineering System
              </p>
              <p className="card-text" style={{ padding: "15px 0px" }}>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div
                style={{ display: "flex", justifyContent: " space-between" }}
              >
                <div className="Cfooter-setup">
                  <img src={Icons} style={{ width: "20px", height: "20px" }} />
                  <p>Oct 25, 2023</p>
                </div>
                <div className="Cfooter-setup">
                  <img src={User} style={{ width: "20px", height: "20px" }} />
                  <p>Mark Stonis</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div style={{display:"flex",justifyContent:"flex-end"}}>

          <button style={{border:"none",backgroundColor:"transparent",textDecoration:"underline"}} onClick={()=>setShowCount(showCount+3)}>Show more</button>
        </div> */}
      </section>
    </>
  );
});

export default LandingApiHoc(Blogs, "/blogs/");
