import { useCallback } from "react";
  // function buildJSON(nodes, edges, nodeId, oldid) {
  //   const node = nodes.find((n) => n.id === nodeId);
  //   if (!node) {
  //     return null;
  //   }
  //   const result = {
  //     message: node.data.label || node.data.response,
  //   };
  //   if (nodeId.split("_")[0] == "groupnode") {
  //     const buttonnodeId = nodes.filter((n) => n.parentNode === nodeId);
  //     const outgoingEdges = buttonnodeId.map((node) => {
  //       let availableoutgoing = edges.filter(
  //         (edge) => edge.source === node.id
  //       )[0];
  //       if (availableoutgoing) {
  //         return availableoutgoing;
  //       } else {
  //         return node;
  //       }
  //     });
  //     // const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
  //     if (outgoingEdges.length > 0) {
  //       result.options = outgoingEdges.map((edge) => {
  //         if (edge?.source) {
  //           const currentNode = nodes.find((n) => n.id === edge?.source);
  //           const followUpNode = nodes.find((n) => n.id === edge?.target);

  //           if (currentNode?.parentNode) {
  //             if (followUpNode) {
  //               oldId = followUpNode.id;
  //               return {
  //                 response: currentNode.data.label,
  //                 follow_up: buildJSON(
  //                   nodes,
  //                   edges,
  //                   followUpNode.id,
  //                   currentNode.id
  //                 ),
  //               };
  //             }
  //           } else {
  //             oldId = followUpNode?.id;
  //             return {
  //               message: currentNode?.data.label,
  //               follow_up: buildJSON(
  //                 nodes,
  //                 edges,
  //                 followUpNode?.id,
  //                 currentNode?.id
  //               ),
  //             };
  //           }
  //         } else {
  //           return {
  //             response: edge.data.label,
  //           };
  //         }
  //       });
  //     }
  //   } else {
  //     const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
  //     if (outgoingEdges.length > 0) {
  //       result.options = outgoingEdges.map((edge) => {
  //         const currentNode = nodes.find((n) => n.id === edge.source);

  //         const followUpNode = nodes.find((n) => n.id === edge.target);
  //         if (oldId == currentNode.id) {
  //           oldId = followUpNode.id;
  //           let lastEdge = edges.find((n) => n.source == currentNode.id);
  //           let lastNode = nodes.find((n) => n.id == lastEdge.target);
  //           return {
  //             // response: lastNode.data.label,
  //             follow_up: buildJSON(
  //               nodes,
  //               edges,
  //               followUpNode.id,
  //               currentNode.id
  //             ),
  //           };
  //         } else if (oldId !== currentNode.id) {
  //           oldId = followUpNode.id;
  //           return {
  //             message: currentNode.data.label,
  //             follow_up: buildJSON(
  //               nodes,
  //               edges,
  //               followUpNode.id,
  //               currentNode.id
  //             ),
  //           };
  //         }

  //         if (currentNode.parentNode) {
  //           oldId = currentNode.id;
  //           return {
  //             response: currentNode.data.label,
  //             follow_up: buildJSON(
  //               nodes,
  //               edges,
  //               followUpNode.id,
  //               currentNode.id
  //             ),
  //           };
  //         } else {
  //           return {
  //             follow_up: buildJSON(
  //               nodes,
  //               edges,
  //               followUpNode.id,
  //               currentNode.id
  //             ),
  //           };
  //         }
  //       });
  //     }
  //   }

  //   return result;
  // }
const useBuildJson = (nodes, edges, nodeId)=>{
    let oldId;
    const buildJSON = useCallback( (nodes, edges, nodeId)=>{

        const node = nodes.find((n) => n.id === nodeId);
        if (!node) {
          return null;
        }
        const result = {
          message: node.data.label || node.data.response,
        };
        if (nodeId.split("_")[0] == "groupnode") {
          const buttonnodeId = nodes.filter((n) => n.parentNode === nodeId);
          const outgoingEdges = buttonnodeId.map((node) => {
            let availableoutgoing = edges.filter(
              (edge) => edge.source === node.id
            )[0];
            if (availableoutgoing) {
              return availableoutgoing;
            } else {
              return node;
            }
          });
          // const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
          if (outgoingEdges.length > 0) {
            result.options = outgoingEdges.map((edge) => {
              if (edge?.source) {
                const currentNode = nodes.find((n) => n.id === edge?.source);
                const followUpNode = nodes.find((n) => n.id === edge?.target);
    
                if (currentNode?.parentNode) {
                  if (followUpNode) {
                    oldId = followUpNode.id;
                    return {
                      response: currentNode.data.label,
                      follow_up: buildJSON(
                        nodes,
                        edges,
                        followUpNode.id,
                        currentNode.id
                      ),
                    };
                  }
                } else {
                  oldId = followUpNode?.id;
                  return {
                    message: currentNode?.data.label,
                    follow_up: buildJSON(
                      nodes,
                      edges,
                      followUpNode?.id,
                      currentNode?.id
                    ),
                  };
                }
              } else {
                return {
                  response: edge.data.label,
                };
              }
            });
          }
        } else {
          const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
          if (outgoingEdges.length > 0) {
            result.options = outgoingEdges.map((edge) => {
              const currentNode = nodes.find((n) => n.id === edge.source);
    
              const followUpNode = nodes.find((n) => n.id === edge.target);
              if (oldId == currentNode.id) {
                oldId = followUpNode.id;
                let lastEdge = edges.find((n) => n.source == currentNode.id);
                let lastNode = nodes.find((n) => n.id == lastEdge.target);
                return {
                  // response: lastNode.data.label,
                  follow_up: buildJSON(
                    nodes,
                    edges,
                    followUpNode.id,
                    currentNode.id
                  ),
                };
              } else if (oldId !== currentNode.id) {
                oldId = followUpNode.id;
                return {
                  message: currentNode.data.label,
                  follow_up: buildJSON(
                    nodes,
                    edges,
                    followUpNode.id,
                    currentNode.id
                  ),
                };
              }
    
              if (currentNode.parentNode) {
                oldId = currentNode.id;
                return {
                  response: currentNode.data.label,
                  follow_up: buildJSON(
                    nodes,
                    edges,
                    followUpNode.id,
                    currentNode.id
                  ),
                };
              } else {
                return {
                  follow_up: buildJSON(
                    nodes,
                    edges,
                    followUpNode.id,
                    currentNode.id
                  ),
                };
              }
            });
          }
        }
    
        return result;
    },[nodes, edges,nodeId])
  return {buildJSON}
}

export default useBuildJson;