import { Handle, Position } from "reactflow";
import DeleteIcon from "./deleteIcon/deleteIcon";
import { InputHoc } from "../chatHoc/inputHoc";
import "./chatBotFieldsStyle.css";
function ButtonNode(props) {
  const { dataone, isConnectable, handleChange, inputValue,id } = props;
  let buttonStyle = {
    backgroundColor: "#daded9",
    border: "none",
    // width: "80px",
    // height: "40px",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: " -4px 5px 5px 0px rgba(225, 230, 226)",
    padding:"10px",
    color:"#388de8",
    fontSize:"16px !important",
    fontWeight:"bold"
  };

  const findeId = id.split('_')[0] === "startingdndnode"
  return (
    <>
      <div style={{ position: "relative",color:"blue" }}>
      <Handle
        type="source"
        className='chathandleright chathandle'
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ borderColor: "black !important" }}
      />
        
      <Handle
        type="target"
        className='chathandle'
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ borderColor: "grey !important" }}
      />
      
        <input
          type="text"
          value={inputValue}
          className="activeborder "
          style={buttonStyle}
          onChange={(e) => handleChange(e)}
        />
        <span className="customhandle">

        </span>
       { !findeId&&<DeleteIcon deleteId={dataone.nodeId} />}
      </div>
    </>
  );
}

export default InputHoc(ButtonNode);
