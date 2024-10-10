import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import FlowPage from "../../../../components/chatBot/reactflow";
import "../manageChatbot.css";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  addChatBotApi,
  editChatByIdApi,
  getChatBotByIdApi,
  getClientApi,
} from "../../../../redux/action/adminAction";
import { adminSelector } from "../../../../redux/slice/adminSlice";
import { authSelector } from "../../../../redux/slice/authSlice";
import useBuildJson from "../../../../hooks/useBuildJson";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  generateMessengerTemplate,
  generateWhatsAppTemplate,
  getLocalRoles,
  optionData,
} from "../../../../utils/findids/helperutils";
import CommonDropDown from "../../../../components/common/Field/CommonDropDown";
import { addPayment } from "../../../../redux/slice/flowSlice";
import ButtonTooltips from "../../../../components/common/toolTip";
import AuthHoc from "../../../../components/authHoc/authHoc";
import {
  addClientChatbotApi,
  getClientChatbotApi,
  getClientChatbotByIdApi,
  updateClientChatbotApi,
} from "../../../../redux/action/userAction";
import { GetProfileApi } from "../../../../redux/action/authAction";
import { userSelector } from "../../../../redux/slice/userSlice";
const label = { inputProps: { "aria-label": "Switch demo" } };



//This create the default cards in ui 
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },

  {
    width: 110,
    height: 128,
    id: "endingnode",
    type: "textAreaUpdater",
    position: {
      x: 621.0719533014453,
      y: 71.43999250740507,
    },
    data: {
      nodeId: "endingnode",
      label: "Thanks",
    },
    selected: true,
    positionAbsolute: {
      x: 621.0719533014453,
      y: 71.43999250740507,
    },
    dragging: false,
  },

  {
    id: "startinggroupnode_0",
    data: {
      // label: "Welcome to chat",
      nodeId: "startinggroupnode_0",
      groupId: "startinggroupnode_0",
    },
    type: "textupdater",
    width: 178,
    height: 250,
    dragging: false,
    position: {
      x: 350.7682475555234,
      y: 50.9753779885467,
    },
    selected: false,
    positionAbsolute: {
      x: 119.7682475555234,
      y: -137.9753779885467,
    },
  },
  {
    id: "startingdndnode_1",
    data: {
      label: "Yes",
      nodeId: "startingdndnode_1",
    },
    type: "buttonNode",
    width: 143,
    height: 35,
    dragging: false,
    position: {
      x: 23.673231475733047,
      y: 124.87180300336183,
    },
    selected: false,
    parentNode: "startinggroupnode_0",
    positionAbsolute: {
      x: 143.44147903125645,
      y: -13.103574985184878,
    },
  },
  {
    id: "startingdndnode_2",
    data: {
      label: "No",
      nodeId: "startingdndnode_2",
    },
    type: "buttonNode",
    width: 143,
    height: 35,
    dragging: false,
    position: {
      x: 23.673231475733047,
      y: 174.87180300336183,
    },
    selected: false,
    parentNode: "startinggroupnode_0",
    positionAbsolute: {
      x: 143.44147903125645,
      y: -13.103574985184878,
    },
  },
];

const intialEdges = [
  {
    id: "reactflow__edge-1-groupnode_0",
    source: "1",
    target: "startinggroupnode_0",
    className: "customnode",
    markerEnd: {
      type: "arrowclosed",
      color: "black",
      width: 20,
      height: 20,
    },
    sourceHandle: null,
    targetHandle: null,
  },
];
const CreateChat = (props) => {
  let userRole = getLocalRoles();
  const reactFlowWrapper = useRef(null);
  //added custom hook with teh buildjson function to create the json
  const { buildJSON } = useBuildJson();
  const location = useLocation();
  const navigate = useNavigate();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [messageFor, setMessageFor] = useState(["whatsapp"]);
  let { action = "", arrayIndex = "" } = location?.state || {};
  let dispatch = useDispatch();
  const { getUserProfile } = useSelector(authSelector);
  const { getChatBotDataByIdisLoading, getChatBotDataById, getClientDetail } =
    useSelector(adminSelector);
  const { getclientChatbotDatabyId, getclientChatbotDatabyIdLoading } =
    useSelector(userSelector);
  const { msg_temp_err_msg, msg_temp_status } = getChatBotDataById;
  const [chatbotData, setChatbotData] = useState({
    clientName: "",
    chatbotName: "",
    question: "",
    status: false,
  });

  const formik = useFormik({
    initialValues: {
      clientName: "",
      chatbotName: "",
      status: false,
    },

    validationSchema: Yup.object({
      chatbotName: Yup.string().required("Chatbot name is required"),
    }),
    onSubmit: () => {
      saveElements();
    },
  });
  const onStop = (event, node) => {};
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  useEffect(() => {
    const hasFlowData =
      getChatBotDataById?.flow_data || getclientChatbotDatabyId?.flow_data;
    const isEditAction = action === "Edit";

    if (hasFlowData && isEditAction) {
      let saved_flow_data =
        userRole == "User" ? getclientChatbotDatabyId : getChatBotDataById;
      let nodeObject = { ...saved_flow_data?.flow_data };
      let savedNodeObject = { ...nodeObject?.nodes };
      dispatch(addPayment(savedNodeObject.length + 5));
      formik.setFieldValue("clientName", saved_flow_data?.client);
      formik.setFieldValue("chatbotName", saved_flow_data?.Chatbot_name);
      formik.setFieldValue("status", saved_flow_data?.status);
      setNodes(() => nodeObject?.nodes || {});
      setEdges(nodeObject?.edges);
    } else {
      setNodes(initialNodes);
      setEdges(intialEdges);
    }

    return () => {
      setNodes(initialNodes);
      setEdges(intialEdges);
    };
  }, [
    getChatBotDataById,
    action,
    setNodes,
    setEdges,
    getclientChatbotDatabyId?.flow_data,
    dispatch,
  ]);


  useEffect(() => {
    dispatch(GetProfileApi());
    if (arrayIndex > 0) {
      if (userRole === "User") {
        dispatch(getClientChatbotByIdApi(arrayIndex));
      } else {
        dispatch(getChatBotByIdApi(arrayIndex));
      }
    }
  }, [arrayIndex, dispatch, setNodes, setEdges]);

  useEffect(() => {
    dispatch(getClientApi());
  }, []);

  const saveElements = async () => {
    const startingNodeId = "1";

    let messengerData;
    let whatsdata;
    messageFor.forEach(async (val) => {
      if (val == "messenger") {
        messengerData = await generateMessengerTemplate(
          reactFlowInstance.toObject().nodes,
          reactFlowInstance.toObject().edges
        );
      } else {
        whatsdata = generateWhatsAppTemplate(
          reactFlowInstance.toObject().nodes,
          reactFlowInstance.toObject().edges
        );
      }
    });

    let savedElements = {
      flow_data: reactFlowInstance.toObject(),
      Chatbot_name: formik.values.chatbotName,
      // question: formik.values.question,
      status: formik.values?.status,
      json_content: whatsdata,
      chatbot_type: 1,
      client:
        userRole === "User"
          ? sessionStorage.getItem("UId")
          : formik.values.clientName,
    };
    if (action == "Edit") {
      if (userRole === "User") {
        dispatch(updateClientChatbotApi(arrayIndex, savedElements));
      } else {
        dispatch(editChatByIdApi(arrayIndex, savedElements));
      }
    } else {
      if (userRole === "User") {
        dispatch(addClientChatbotApi(savedElements, dispatch));
      } else {
        dispatch(addChatBotApi(savedElements,formik.values.clientName));
      }
    }
    navigate("/dashboard/chatbot");
  };

  const handleStatus = (e) => {
    // setChatbotData({ ...formik.values, status: !formik.values.status });
    formik.setFieldValue("status", !formik.values.status);
  };
  return (
    <>
      <div className="commonbox" style={{ position: "relative" }}>
        <div className="dndflowheader">
          <p style={{ fontSize: "24px", fontWeight: "600" }}>Manage Chatbot</p>
          <div className="dndflowfields">
            <div className="dndflowinput">
              <label>{userRole === "User" ? "User Name" : "Client Name"}</label>

              {userRole === "User" ? (
                <input
                  value={
                    getclientChatbotDatabyId?.client_name ||
                    getUserProfile?.username
                  }
                  disabled
                />
              ) : (
                <CommonDropDown
                  id="clientName"
                  disabled={action === "Edit"}
                  defaultValue={getChatBotDataById?.Chatbot_name || ""}
                  formik={formik}
                  options={optionData(getClientDetail)}
                />
              )}
            </div>
            <div className="dndflowinput">
              <label>Chatbot Name</label>
              <span>
                <input
                  value={formik?.values?.chatbotName}
                  name="chatbotName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.chatbotName && formik.errors.chatbotName ? (
                  <div className="errors" style={{ color: "red" }}>
                    {formik.errors.chatbotName}
                  </div>
                ) : null}
              </span>
            </div>

            <ButtonTooltips
              showtip={!msg_temp_status ?? true}
              tipText={
                msg_temp_err_msg !== null
                  ? msg_temp_err_msg
                  : "Waiting for Whatsapp to approve templates  "
              }
            >
              <div className="dndactive">
                <label>Status:</label>
                <span>Inactive</span>
                <Switch
                  disabled={!getChatBotDataById?.msg_temp_status ?? true}
                  {...label}
                  name="status"
                  checked={formik?.values?.status}
                  value={formik?.values?.status}
                  onChange={(e) => handleStatus(e)}
                />
                <span>Active</span>
              </div>
            </ButtonTooltips>
          </div>
        </div>

        <div className="dndflow">
          <FlowPage
            nodes={nodes}
            ref={reactFlowWrapper}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            setEdges={setEdges}
            setReactFlowInstance={setReactFlowInstance}
            reactFlowInstance={reactFlowInstance}
            onDragOver={onDragOver}
            setNodes={setNodes}
            onStop={onStop}
            onSave={formik.handleSubmit}
            messageFor={messageFor}
            setmessageFor={setMessageFor}
          />
        </div>
      </div>
    </>
  );
};

export default CreateChat;
