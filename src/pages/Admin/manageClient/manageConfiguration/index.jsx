import { getConfig } from "@testing-library/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AddButton from "../../../../components/common/Button/addButton";
import CommonTextFields from "../../../../components/common/Field/CommonTextFIelds";
import { addclientconfigApi, getclientconfigApi } from "../../../../redux/action/userAction";
import { userSelector } from "../../../../redux/slice/userSlice";
import ConfirmConfig from "./confirmConfiguration";

const ManageClientConfiguration = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {data} = location?.state;
    const {getClientConfig} = useSelector(userSelector);
    const [modalOpen,setModalOpen] = useState(false)
    const [configType,setConfigType] = useState(null)
    const [chatConfigData,setChatConfigData] = useState({
        1:{
            app_id:"",phone_id:"",token:"",business_account_id:""
        },
        2:{
            app_id:"",page_id:"",token:""
        }
    })

    useEffect(()=>{
        dispatch(getclientconfigApi(data?.id))
    },[data?.id])

    useEffect(()=>{
        if(getClientConfig?.length>0){
            let newConfig = {...chatConfigData};
            getClientConfig.map((getConfig)=>{
                const{chatbot_type,config_params} = getConfig;
                if(chatbot_type == 1){
                    newConfig[chatbot_type] = {...config_params}
                }
                else{
                    newConfig[chatbot_type] = {...config_params}
                }
        })
        setChatConfigData({...newConfig})
        }
    },[getClientConfig])


    const updateConfiguration = (type)=>{
      setModalOpen(true)
      setConfigType(type)
    }

    const configonChange = (type,e)=>{
      setChatConfigData({...chatConfigData,[type]:{...chatConfigData[type],[e?.id]:e?.value}})
    }


    const submitConfiguration = ()=>{
      let apiData = {
        config_params:{...chatConfigData[configType]},
        "chatbot_type": configType,
        "client_id": data?.id
      }
      console.log("apidataaaaaaaaaaaaaaa",apiData);
      dispatch(addclientconfigApi(apiData))
      setModalOpen(false)
    }

    
  return (
    <>
      <div className="commonbox">
        <p style={{ fontSize: "24px", fontWeight: "600" }}>
          Manage Configuration
        </p>
     
        <div>
          <p style={{ fontSize: "18px", fontWeight: "600" }}>Whatsapp</p>
          <CommonTextFields placeholder={"No Data Available"} id={"app_id"} label={"Account Id"} customChange={(e)=>configonChange('1',e?.target)}  values={chatConfigData?.[1]?.app_id}/>
          <br></br>
          <CommonTextFields placeholder={"No Data Available"} id={"phone_id"} label={"Phone Id"} customChange={(e)=>configonChange('1',e?.target)} values={chatConfigData?.[1]?.phone_id}/>
          <br></br>
          <CommonTextFields placeholder={"No Data Available"} id={"token"} label={"Whatsapp Token"} customChange={(e)=>configonChange('1',e?.target)} values={chatConfigData?.[1]?.token}/>
          <br></br>
          <CommonTextFields placeholder={"No Data Available"} id={"business_account_id"} label={"Business Id"} customChange={(e)=>configonChange('1',e?.target)} values={chatConfigData?.[1]?.business_account_id} />
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:"10px"}}>
          <AddButton handleClick={()=>updateConfiguration(1)} buttonText={"Update Whatsapp"}></AddButton>
        </div>
        <hr></hr>
        <div>
          <p style={{ fontSize: "18px", fontWeight: "600" }}>Messenger</p>
          <CommonTextFields placeholder={"No Data Available"} id={"app_id"} label={"App Id"} values={chatConfigData?.[2]?.app_id} />
          <br></br>
          <CommonTextFields placeholder={"No Data Available"} id={"phone_id"} label={"Phone Id"} values={chatConfigData?.[2]?.page_id}/>
          <br></br>
          <CommonTextFields placeholder={"No Data Available"} id={"token"} label={"Messenger Token"} values={chatConfigData?.[2]?.token} />
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:"10px"}}>
          <AddButton handleClick={()=>updateConfiguration(2)} buttonText={"Update Messenger"}></AddButton>
        </div>
      </div>

      <ConfirmConfig open={modalOpen} configType={configType} setOpen={setModalOpen} updateConfiguration={submitConfiguration} />
    </>
  );
};

export default ManageClientConfiguration;
