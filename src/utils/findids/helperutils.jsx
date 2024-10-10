import { ADMIN_BASE_URL, USER_BASE_URL } from "../../redux/api/configURL";

export const getUserId = () => {
  return sessionStorage.getItem("UId");
};

export const getLocalRoles = () => {
  return sessionStorage.getItem("roles");
};

export const findDesignation = (method) => {
  let designationText;
  switch (method) {
    case 1:
      designationText = "Employee";
      break;
    case 2:
      designationText = "Manager";
      break;

    default:
      break;
  }
  return designationText;
};

export function roleBasedURL(role) {
  let roleurl;
  switch (role) {
    case "Admin":
      roleurl = ADMIN_BASE_URL;
      break;
    case "Subadmin":
      roleurl = ADMIN_BASE_URL;
      break;
    default:
      roleurl = USER_BASE_URL;
      break;
  }
  return roleurl;
}

export function designationData(designations) {
  //   [{ value: 3, label: "Accountant" },
  //   { value: 2, label: "Manager" },
  //   { value: 1, label: "Employee" },
  // ]
  return designations?.map((val) => {
    return { value: val.id, label: val.name };
  });
}

export function optionData(options) {
  return options?.map((val) => {
    return { value: val.id, label: val.username };
  });
}

// export function generateWhatsAppTemplate(nodes, edges) {
//   const nodeMap = {};
//   const template = {};
//   let preventarr = [];

//   // Step 1: Parse the nodes array and create a map of node IDs to data
//   nodes.forEach((node) => {
//     const { data } = node;
//     if (!nodeMap[data.groupId] && data.groupId) {
//       nodeMap[data.groupId] = {
//         type: "button",
//         body: { text: data.label },
//         action: {
//           buttons: nodes
//             .filter((node) => node.parentNode === data.groupId)
//             .map((node) => {
//               preventarr.push(node.id)
//               return {
//                 type: "reply",
//                 reply: { id: node.data.nodeId, title: node.data.label },
//               }
//             }),
//         },
//       };
//     }
//     else{
//       if(!preventarr.includes(data.id) && !nodeMap[node.id]){
//         preventarr.push(node.id)
//         nodeMap[data.nodeId] = {
//           type:"button",
//           body:{text:data.label}
//         }
//       }
//     }

//   });

//   for(let key in nodeMap){
//     if(key !== "undefined" && key.split('_')[0]==="groupnode"){
//       let nodemaparr = nodeMap[key].action.buttons.map((button)=>edges.filter((edge)=>edge.source===button.reply.id)[0])
//       nodemaparr.map((btnnodes)=>{
//         // btnnodes.map((btnnode)=>{
//           if(nodeMap[btnnodes.target]){
//             template[btnnodes.source] = nodeMap[btnnodes.target]
//           }

//         // })
//     })
//     }
//   }

//   let starting_template = nodeMap["groupnode_0"]
//   let whatsapptemplate = {...template,starting_template}
//   return whatsapptemplate;
//   // Step 2: Iterate through the edges array and generate WhatsApp template
//   // edges.forEach(edge => {
//   //   const sourceNode = nodeMap[edge.source];
//   //   const targetNode = nodeMap[edge.target];

//   //   // If source node is a button, create WhatsApp template
//   //   if (sourceNode?.parentNode) {
//   //     if (!template[sourceNode.parentNode]) {
//   //       template[sourceNode.parentNode] = {
//   //         type: "button",
//   //         body: { text: sourceNode.label },
//   //         action: { buttons: [] }
//   //       };
//   //     }
//   //     template[sourceNode.parentNode].action.buttons.push({
//   //       type: "reply",
//   //       reply: { id: targetNode.nodeId, title: targetNode.label }
//   //     });
//   //   }
//   // });

//   // return template;
// }

export function generateWhatsAppTemplate(nodes, edges) {
  const nodeMap = {};
  const template = {};
  let preventarr = [];
  let startingtemplate = {};
  // Step 1: Parse the nodes array and create a map of node IDs to data
  nodes.forEach((node) => {
    const { data } = node;
    if (!nodeMap[data.groupId] && data.groupId) {
      if (data?.groupId.split("_")[0] === "startinggroupnode") {
        startingtemplate = {
          name: "start",
          language: "en_US",
          category: "MARKETING",
          components: [
            {
              type: "BODY",
              text: data.label,
            },
            {
              type: "BUTTONS",
              buttons: nodes
                .filter((node) => node.parentNode === data.groupId)
                .map((node) => {
                  preventarr.push(node.id);
                  return {
                    type: "QUICK_REPLY",
                    text: node.data.label,
                    //  payload: node.data.nodeId,
                  };
                }),
            },
          ],
        };
      }

      nodeMap[data.groupId] = {
        type: "button",
        body: { text: data.label },
        action: {
          buttons: nodes
            .filter((node) => node.parentNode === data.groupId)
            .map((node) => {
              preventarr.push(node.id);
              return {
                type: "reply",
                reply: { id: node.data.nodeId, title: node.data.label },
              };
            }),
        },
      };
    } else {
      if (!preventarr.includes(data.id) && !nodeMap[node.id]) {
        preventarr.push(node.id);
        if (data.nodeId === "endingnode") {
          nodeMap[data.nodeId] = {
            type: "text",
            text: { body: data.label },
          };
        } else {
          nodeMap[data.nodeId] = {
            type: "button",
            body: { text: data.label },
          };
        }
      }
    }
  });
  for (let key in nodeMap) {
    if (
      key !== "undefined" &&
      key.split("_")[0] !== "dndnode" &&
      key.split("_")[0] !== "startingdndnode" &&
      key.split("_")[0] !== "endingnode"
    ) {
      let nodemaparr = nodeMap[key].action.buttons.map(
        (button) => edges.filter((edge) => edge.source === button.reply.id)[0]
      );
      nodemaparr.map((btnnodes) => {
        // btnnodes.map((btnnode)=>{
        if (nodeMap[btnnodes?.target]) {
          if (btnnodes?.source.split("_")[0] === "startingdndnode") {
            template[nodeMap[btnnodes?.source].body?.text] =
              nodeMap[btnnodes?.target];
          } else {
            template[btnnodes?.source] = nodeMap[btnnodes?.target];
          }
        }

        // })
      });
    }
  }

  let starting_template = nodeMap["startinggroupnode_0"];
  let whatsapptemplate = { ...template, starting_template: startingtemplate };
  return whatsapptemplate;
}

export async function generateMessengerTemplate(nodes, edges) {
  let tempParentObj = {};
  let messengerObj = {};  
  function TemplateFunction() {
    return {
      recipient: { id: "fbid" },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: `${this.text}`,
            buttons: [],
          },
        },
      },
    };
  }
  function ButtonCreation() {
    return {
      type: "postback",
      title: `${this.btnText}`,
      payload: `${this.btnNodeId}`,
    };
  }

//taking nodes and creating a temp obj with groupnodes
  await nodes.map((node) => {
    const { data } = node;
    if (data?.groupId) {
      let textObj = {
        text: data?.label,
      };
      tempParentObj[data?.groupId] = TemplateFunction.call(textObj);
    } else if (node?.parentNode) {
      let buttonObj = {
        btnText: data?.label,
        btnNodeId: data?.nodeId,
      };
      tempParentObj[
        node?.parentNode
      ]?.message?.attachment?.payload?.buttons.push(
        ButtonCreation.call(buttonObj)
      );
    } else if (node?.id === "endingnode") {
      tempParentObj[data?.nodeId] = {
        recipient: { id: "fbid" },
        message: {
          text: "Thank you for participating in our survey!",
        },
      };
    }
  });
  //getting keys of temp obj to check with edges
  let keyArr = Object.keys(tempParentObj);

  //looping through edges to change the name of the groupnode as target node id and update in messenger
  
  await keyArr.map((keys) => {
    edges.map((edge) => {
      if (edge.target === keys) {
        if (tempParentObj[keys]) {
          messengerObj[edge?.source == 1 ? "firstGroupNode" : edge?.source] =
            tempParentObj[keys];
        }
      }
    });
  });

  return messengerObj;
}

export const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
