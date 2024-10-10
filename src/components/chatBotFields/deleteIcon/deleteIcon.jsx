import "./deleteIcon.css";
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector } from "react-redux";
const DeleteIcon = ({onDeleteInstance,deleteId})=>{
    let deleteNodeInstance = useSelector((state)=>state.flow.instanceNode);
    
    const onDeleteNode = () => {
        let deleteNode = deleteNodeInstance?.getNodes()
          .filter((element) => element.id === deleteId);
          deleteNodeInstance.deleteElements({ nodes: deleteNode });
      };

    return (
        <ClearIcon  fontSize="small" className="iconstyle" onClick={()=>{onDeleteNode()}}/>
    )
}

export default DeleteIcon;