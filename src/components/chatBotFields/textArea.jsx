import { Handle, Position } from "reactflow";
import "../../index.css";
import DeleteIcon from "./deleteIcon/deleteIcon";
import {InputHoc} from "../chatHoc/inputHoc";
import "./chatBotFieldsStyle.css"
const TextAreaUpdater = ({   isConnectable,handleDelete,handleChange,handleDrop,inputValue,dataone,selected }) => {

  return (
    <>
      <Handle  className='chathandle' type="target" position={Position.Left} />
      <Handle className='chathandle' type="source" position={Position.Right} />
      <div className="textareacontainer" style={{position:"relative",boxShadow:selected?"6px 4px 19px -6px rgba(0,0,0,0.75)":""}}>
        <div
          className="textareadiv quickdiv"
          style={{ backgroundColor: "#db5290" }}
        >
          {" "}
          Response{" "}
        </div>
        <div>
          <textarea
            rows="5"
            cols="15"
            className="grouptextarea activeborder"
            value={inputValue}
            onChange={(event) => handleChange(event)}
            onDrop={(e)=>handleDrop(e)}
          ></textarea>
        </div>
        <DeleteIcon  deleteId={dataone.nodeId}/>
      </div>
    </>
  );
};
export default InputHoc(TextAreaUpdater);
