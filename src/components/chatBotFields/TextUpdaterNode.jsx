import { Handle, NodeResizeControl, NodeResizer, Position } from "reactflow";
import DeleteIcon from "./deleteIcon/deleteIcon";
import { InputHoc } from "../chatHoc/inputHoc";
import "./chatBotFieldsStyle.css";
function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ff0071"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}
const handleStyle = { left: 10 };

function TextUpdaterNode({
  isConnectable,
  handleDelete,
  handleChange,
  handleDrop,
  inputValue,
  dataone,
  selected,
  id,
  ...rest
}) {
  const controlStyle = {
    background: "transparent",
    border: "none",
  };

  let findId = id.split('_')[0] === "startinggroupnode"

  return (
    <>
      {/* <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl> */}
      <div
        className="text-updater-node groupnode groupnodediv"
        style={{ position: "relative",boxShadow:selected?"6px 4px 19px -6px rgba(0,0,0,0.75)":"" }}
        id={dataone.groupId}
      >
        {/* <Handle
          type="source"
          className='chathandle'
          position={Position.Top}
          isConnectable={isConnectable}
        /> */}
        <div className="textareadiv quickdiv">Quick Reply</div>
        <label className="groupLabel">Message:</label>
        <br></br>
        <textarea
          style={{width:"100%",border:"1px solid lightgrey",borderRadius:"5px"}}
          className="groupinput activeborder"
          rows="5"
          cols="20"
          // value={data.label}
          value={inputValue}
          onChange={(event) => handleChange(event)}
          onDrop={(e) => handleDrop(e)}
        ></textarea>
        <Handle
          type="target"
          className='chathandle'
          position={Position.Left}
          isConnectable={isConnectable}
        />
        {!findId&&<DeleteIcon deleteId={dataone.nodeId} />}
      </div>
    </>
  );
}

export default InputHoc(TextUpdaterNode);
