// import { useEffect } from "react";
// import { useNodesState, useEdgesState } from "reactflow";
// import FlowPage from "../../components/common/reactflow";
// import "../../index.css";

// const ChatBot = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   useEffect(() => {
//     let nodeObject = localStorage.getItem("object");
//     let nodeObjectJson = JSON.parse(nodeObject);
//     setNodes(nodeObjectJson.flowElements.nodes);
//     setEdges(nodeObjectJson.flowElements.edges);
//   }, [setEdges, setNodes]);

//   return (
//     <>
//       <div className="dndflow">
//         <FlowPage nodes={nodes} edges={edges} />
//       </div>
//     </>
//   );
// };

// export default ChatBot;
