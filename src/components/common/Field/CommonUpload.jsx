import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import "../commonComp.css";

const CommonUpload = (props) => {
  const { label, onFileChange, id,filename ="Choose files",customStyle=null,name} = props
  const [images, setImages] = useState("Choose files");
  useEffect(()=>{
    setImages(filename)
  },[filename])
  return (
    <div className={customStyle?"":"row "}>
      <div className={customStyle?"":"col-lg-4"} style={customStyle}> 
        <div >
          <label style={{ fontSize: "14px", fontWeight: "600" }}>{label}</label>
        </div>
        <div style={{width:"50%"}}>
          <div className="input-group uploadbtn">
            <div className="custom-file ">
              <label className="custom-file-label" htmlFor={id} style={{position:"relative"}} >
              <input
                type="file"
                name={name}
                className="custom-file-input "
                id={id}
                onChange={(e) => onFileChange(e)}
                // multiple
                // style={{ width: "150px" }}
              />
               <p style={{position:"absolute",top:"5px"}}> {images}</p>
              </label>
            </div>
            {/* Uncomment this button if you want to add an upload button */}
            {/* <div className="input-group-append">
              <button className="uploadBtn" type="button" onClick={handleUploadButtonClick}>
                Upload
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonUpload;
