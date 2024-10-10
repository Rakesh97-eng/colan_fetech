import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import "./chatBotFieldsStyle.css"
const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {

  return (
    <>
    

    <div className="text-updater-node">
      <Handle className='chathandle' type="target" position={Position.Top} isConnectable={isConnectable} />

    </div>
   

    </>

  );
}

export default TextUpdaterNode;
