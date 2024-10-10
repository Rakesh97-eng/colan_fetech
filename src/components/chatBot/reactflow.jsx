import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MarkerType,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  addEdge,
  useNodesState,
  Background,
  useReactFlow,
  
} from "reactflow";
import { memo } from "react";
import Sidebar from "../chatBotFields/Sidebar";
import ButtonNode from "../chatBotFields/buttonNode";
import TextAreaUpdater from "../chatBotFields/textArea";
import TextUpdaterNode from "../chatBotFields/TextUpdaterNode";
import "reactflow/dist/style.css";
import { useSelector } from "react-redux";
import AlertUser from "../modal/paymentModal";
import { NodeContext } from "../../nodecontext/nodeContext";
import { useDispatch } from "react-redux";
import { addInstance } from "../../redux/slice/flowSlice";
import { adminSelector } from "../../redux/slice/adminSlice";
import { showToast } from "../commonToast/toastService";


const FlowPage = forwardRef((props, ref) => {
  const {
    // updateNode,\
    setNodes,
    nodes,
    reactFlowInstance,
    edges,
    onNodesChange,
    onEdgesChange,
    setReactFlowInstance,
    onDragOver,
    onStop,
    setEdges,
    onSave,
    messageFor,
    setmessageFor
  } = props;

  const { getChatBotDataById } = useSelector(adminSelector);
  // const removeEdges = useReactFlow();

  const reactFlowWrapper = useRef(null);
  let contextdata = useContext(NodeContext);
  let { value, changeId, changeValue } = contextdata;
  const [nodeNum, setNodeNum] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [nodeTypes, setNodeTypes] = useState({
    textupdater: TextUpdaterNode,
    buttonNode: ButtonNode,
    textAreaUpdater: TextAreaUpdater,
  });
  let dispatch = useDispatch();
 

  const onEdgeClickEvent = (event,edge) => {
    setEdges(edges.filter((e) => e.id !== edge.id));
  };

  const nodesRef = useRef(nodes);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes, setNodes]);

  const getId = () => {
    let oldNodeId = nodesRef.current?.filter((node) =>
      node.id.includes("dndnode")
    );
    let nodeId = oldNodeId[oldNodeId.length - 1]?.id?.split("_")[1];
    let id = nodeId ? parseInt(nodeId) + 1 : 0;
    return `dndnode_${id++}`;
  };

  const getGroupId = () => {
    let oldGroudNodeId = nodesRef.current?.filter((node) =>
      node.id.includes("groupnode")
    );
    let groupId =
      parseInt(oldGroudNodeId[oldGroudNodeId.length - 1]?.id?.split("_")[1]) +
        1 || 0;
    return `groupnode_${groupId++}`;
  };

  const { payPrice } = useSelector((state) => state.flow);

  const onConnect = (params) =>{
    let parentNode = nodes?.find((node)=>params?.source === node?.id);
    console.log("parentNode",params.parentNode);

   

    
    setEdges((eds) => {
      // To avoid loop in flow working here..........
      // let repeatedTarget = eds?.find((edge)=>edge?.parentNode == params?.target);
      // console.log("repeatedTarget", repeatedTarget?.target ,params?.parentNode,params);
      // if(repeatedTarget && repeatedTarget?.target == params?.parentNode){
      //   return 
      // }
      // console.log("paramaaa",params,nodes,edges,eds);
      params.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "black",
      };
      params.className = "customnode";
      params.parentNode = parentNode?.parentNode;
      // params.type = "custom-edge"
      return addEdge(params, eds);
    });
  }




  //updating node from context value
  useEffect(() => {
    updateNode(changeId, value);
  }, [value, setNodes]);

  const updateNode = (id, value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: value,
          };
        }
        return node;
      })
    );
  };
  // reactFlowInstance.addNodes(nodes)
  // reactFlowInstance.addEdges(edges)

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      let parentGroupId = event.target.id;
      let parentWrapper = event.target.classList[0];
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let type = event.dataTransfer.getData("application/reactflow");
      let droppingid = event.dataTransfer.getData("id");
      const parentPosition = reactFlowInstance
        .getNodes()
        .find((element) => element.id === parentGroupId)?.position;
      if (typeof type === "undefined" || !type) {
        return;
      }
      // restricting the dropping of buttion without group
      if(parentWrapper ===  "react-flow__pane"  &&droppingid === "button" ){
        showToast("Dropping button outside group is restricted","error")
        return;
      }
      if (type === "headtext") return;
      let newNode;
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      if (parentGroupId.split("_").includes("groupnode")) {
        const adjustedPosition = {
          x: position.x - parentPosition.x - 40,
          y: position.y - parentPosition.y - 40,
        };
        let nodeId = getId();
        newNode = {
          id: nodeId,
          type: type,
          position: adjustedPosition,
          parentNode: parentGroupId,
          data: { nodeId: nodeId },
          // onChangeInput: updateTextUpdaterInput },
        };
      } else if (
        parentWrapper === "react-flow__pane" &&
        droppingid.split("_").includes("groupnode")
      ) {
        let nodeID = getGroupId();
        newNode = {
          id: nodeID,
          type: type,
          position,
          data: {
            groupId: nodeID,
            nodeId: nodeID,
            // onChangeInput: updateTextUpdaterInput,
          },
        };
      } else {
        let nodeId = getId();
        newNode = {
          id: nodeId,
          type: type,
          position,
          data: { nodeId: nodeId },
          // , onChangeInput: updateTextUpdaterInput },
        };
      }
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  useEffect(() => {
    setNodeNum(nodes.length);
    dispatch(addInstance({ instance: reactFlowInstance }));
  }, [nodes, dispatch, setNodes, getChatBotDataById]);
  const Payment = () => {
    setOpenModal(true);
  };


  const isValidConnection = (connection)=>connection?.source != "1";
  return (
    <>
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          id="flowpaper"
          ref={reactFlowWrapper}
          style={{ position: "relative" }}
        >
          <AlertUser open={openModal || false} setOpenModal={setOpenModal} />

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            className="react-flow-subflows-example"
            onDrop={nodeNum < payPrice ? onDrop : Payment}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            selectNodesOnDrag={true}
            onNodeDragStop={onStop}
            fitView
            onEdgeDoubleClick= {onEdgeClickEvent}
            isValidConnection={isValidConnection}
     
          >
            <Background
              style={{ backgroundColor: "#f3faf2" }}
              variant="cross"
              gap={12}
              size={2}
            />
          </ReactFlow>
          {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover> */}
          <button
            onClick={() => onSave()}
            style={{
              backgroundColor: "rgb(0 230 138)",
              color: "#040027",
              fontWeight: "bolder",
              height: "30px",
              borderRadius: "5px",
              fontSize: "20px",
              position: "absolute",
              bottom: "5px",
              right: "0px",
              border: "none",
            }}
          >
            Submit
          </button>
        </div>
        <Sidebar messageFor={messageFor} setmessageFor={setmessageFor} />
      </ReactFlowProvider>
    </>
  );
});
export default FlowPage;
