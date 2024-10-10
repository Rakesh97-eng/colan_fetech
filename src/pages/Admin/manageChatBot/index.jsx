import { useEffect, useState } from "react";
import "./manageChatbot.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteChatbotApi, getallChatBotApi, sendWhatsappmsgApi } from "../../../redux/action/adminAction";
import { adminSelector } from "../../../redux/slice/adminSlice";
import CustomizedTables from "../../../components/common/commonTable";
import { chatBotTableTitle } from "../../../components/common/tableData";
import AddButton from "../../../components/common/Button/addButton";
import { useNavigate } from "react-router-dom";
import AuthHoc from "../../../components/authHoc/authHoc";
import { deleteClientChatbotApi, getClientChatbotApi, getclientconfigApi, userActivePlanApi } from "../../../redux/action/userAction";
import { userSelector } from "../../../redux/slice/userSlice";
import { getLocalRoles } from "../../../utils/findids/helperutils";
import ButtonTooltips from "../../../components/common/toolTip";
import { Button } from "@mui/material";

const ManageChatBot = (props) => { 
  const [dataLoading,setDataloading] = useState(true);
  const [activePlan,setActivePlan] = useState({})
  const [allowToAdd,setAllowToAdd] = useState(0)
  const userRole =getLocalRoles() 
  const dispatch = useDispatch();
  const {isauthenticated} = props;
  const navigate = useNavigate();
  const {userActivePlandata,getclientChatbotData,addClientChatbotLoading,deleteclientChatbotData,getclientChatbotDataLoading,getClientConfig} = useSelector(userSelector)
  const { getAllChatbotData, chatBotData, editChatBotById ,chatBotDataisLoading,getAllchatBotDataisLoading,updateclientChatbotDataLoading} =
    useSelector(adminSelector);


  const handleRoute = () => {
    navigate(`/dashboard/flowpage`, { state: { action: "Add" } });
  };
  useEffect(() => {
      if(userRole === "User"){
        dispatch(getClientChatbotApi())
        dispatch(userActivePlanApi())
        dispatch(getclientconfigApi())
      }
      else{
        dispatch(getallChatBotApi());
      }
  }, [ editChatBotById,chatBotData,chatBotDataisLoading,deleteclientChatbotData,addClientChatbotLoading,updateclientChatbotDataLoading]);


  useEffect(()=>{
    if(userActivePlandata?.plan){
     let activeplan =  userActivePlandata?.plan?.filter((plan)=>plan?.is_current_plan );
     setActivePlan(activeplan[0])
    }

  },[userActivePlandata])
  
  useEffect(()=>{
    chatBotDataisLoading === true || getclientChatbotDataLoading == true ? setDataloading(true) : setDataloading(getAllchatBotDataisLoading)
  },[chatBotDataisLoading,getAllchatBotDataisLoading,getclientChatbotDataLoading])

  const handleDelete = (data)=>{
    if(userRole === "User"){
      dispatch(deleteClientChatbotApi(data.chatbot_id))
    }
    else{
      dispatch(deleteChatbotApi(data.chatbot_id))
    }
  }

  const handleTriggerChat = (chatdata)=>{
    let data = {
      client_id:chatdata.client,
      chatbot_id:chatdata.chatbot_id
    }
    dispatch(sendWhatsappmsgApi(data))
  }

let disableValue = userRole === "User"?getClientConfig?.length>0 ?getclientChatbotData?.length  >= activePlan?.no_of_chatbots:true:false ;
  return (
    <>
      <div className="managebotContainer commonbox">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <p style={{fontSize:"24px",fontWeight:"600"}}>Manage Chatbot</p>

       {/* <AddButton buttonText={"Add"} handleClick={handleRoute} /> */}
        <ButtonTooltips showtip={getclientChatbotData?.length >= activePlan?.no_of_chatbots || getClientConfig?.length === 0} tipText={getClientConfig?.length == 0?"Please add Configuration":"Limit is Reached"}>
           {isauthenticated.add && <Button  sx={{background:disableValue?"#a0abc7":"#00E785",color:disableValue?"":"black",  "&:hover": {
          backgroundColor:
           disableValue
              ? "#FF3939 !important"
              : "#00e785 !important",
        },}} disabled={userRole === "User"?getClientConfig?.length>0 ?getclientChatbotData?.length  >= activePlan?.no_of_chatbots:true:false }  onClick={handleRoute}>Add+</Button>}
        </ButtonTooltips>
        </div>
        <CustomizedTables
          columns={chatBotTableTitle}
          rows={userRole==="User"?getclientChatbotData:getAllChatbotData}
          dataLoading = {dataLoading }
          paginationStatus={true}
          navigatepath={"flowpage"}
          onDelete = {handleDelete}
          isDeleteAllowed={isauthenticated.delete}
          isEditAllowed={isauthenticated.change}
          triggerChat = {handleTriggerChat}
        />
      </div>
    </>
  );
};
export default AuthHoc(ManageChatBot,"chatbots");
