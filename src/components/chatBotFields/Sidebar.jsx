import React, { useRef, useState } from "react";
import readXlsxFile from "read-excel-file";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import UploadIcon from "@mui/icons-material/Upload";
import "./chatBotFieldsStyle.css"
import { showToast } from "../commonToast/toastService";

export default (props) => {
  const {messageFor,setmessageFor} = props;
  const [headText, setHeadText] = useState([]);
  const [fileName, setFileName] = useState(null);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("id", event.target.id);
    event.dataTransfer.setData("value", event.target.innerText);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleUpload = (e) => {
    try {
      let files = e.target.files[0];
      let fileName = files.name.split(".");
      if (fileName[1] !== "xlsx") {
        throw "please Upload Excel file";
      }
      setFileName(fileName[0]);
      readXlsxFile(e.target.files[0]).then((rows) => {
        setHeadText(rows[0]);
      });
    } catch (error) {
      showToast('Please upload Excel files',"error")
    }
  };

  const chooseMessagePlatform = (e)=>{
    const {value} = e.target;
    if(messageFor.includes(value)){
      let removedArr = messageFor.filter(val=>val !== value);
      setmessageFor([...removedArr])
    }
    else{
      setmessageFor([...messageFor,value])
    }

  }

  return (
    <>
      <aside style={{ backgroundColor: "#d7ffef", backgroundImage: "linear-gradient(to right, #d7ffef , #f3faf2)" ,position:"relative"}}>
        
        <h2
          style={{
            color: "rgb(4 0 39)",
            marginTop: "15px",
            fontFamily: "serif",
            fontSize: "18px",
          }}
          className="description"
        >
          Drag Nodes To Create Flow
        </h2>
        {/* <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        >
          Input Node
        </div> */}
        <div
          className="dndnode"
          id="groupnode_0"
          onDragStart={(event) => onDragStart(event, "textupdater")}
          draggable
        >
          Group
        </div>
        <div
          className="dndnode output"
          id="button"
          onDragStart={(event) => onDragStart(event, "buttonNode")}
          draggable
        >
          Button
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "textAreaUpdater")}
          draggable
        >
          Text
        </div>
        <hr></hr>
        <div style={{position:"relative"}}> 
        <h2 style={{ color: "rgb(4 0 39)",fontFamily:"serif",fontSize:"18px",fontWeight:"600" }}> Messaging Platforms:</h2> 
       <div>
          <input type="checkbox" id="whatsapp" value="whatsapp" checked={messageFor.includes('whatsapp')} onChange={(e)=>chooseMessagePlatform(e)}/>  <label htmlFor="whatsapp" className="messageLabel">Whatsapp</label>
        </div>
        <div>
        <input type="checkbox" id="messenger" value="messenger" checked={messageFor.includes('messenger')}   onChange={(e)=>chooseMessagePlatform(e)}/>  <label htmlFor="messenger" className="messageLabel">Messenger</label>
        </div>
        <hr></hr>

        <h2 style={{ color: "rgb(4 0 39)",fontFamily:"serif",fontSize:"18px",fontWeight:"600" }}>Excel Column</h2>
        <form>
          <label
            htmlFor="excelupload"
            className="uploadExcel"
          >
            <UploadIcon />
            {fileName ? fileName : "Please Upload Excel"}
            <input
              id="excelupload"
              type="file"
              onChange={(e) => handleUpload(e)}
              style={{ display: "none" }}
            />
          </label>
        </form>
      
       
        {headText.length > 0 ? (
          <>
            <Stack direction="column" spacing={1} className="stackname">
              {headText.map((text, i) => {
                return (
                  <Chip
                    className="chipname"
                    label={text}
                    onDelete={() => console.log("delete")}
                    key={i}
                    id={i}
                    onDragStart={(event) => onDragStart(event, "headtext")}
                    draggable
                  />
                );
              })}
            </Stack>
          </>
        ) : (
          ""
        )}
        
             
        </div>
      </aside>
    </>
  );
};
