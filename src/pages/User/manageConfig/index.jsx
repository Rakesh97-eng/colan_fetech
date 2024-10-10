import CommonTextFields from "../../../components/common/Field/CommonTextFIelds";
import AddButton from "../../../components/common/Button/addButton";
import "./manageConfig.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addclientconfigApi,
  editclientConfigApi,
  getclientconfigApi,
} from "../../../redux/action/userAction";
import { userSelector } from "../../../redux/slice/userSlice";
import ButtonTooltips from "../../../components/common/toolTip";

const ClipBoard = () => {
  return (
    <span
      style={{
        position: "absolute",
        right: "5px",
        top: "8px",
        cursor: "pointer",
        color: "grey",
      }}
    >
      <ContentCopyIcon />
    </span>
  );
};

const ManageConfig = () => {
  const [editWhatsapp, setEditWhatsapp] = useState(true);
  const [editMessenger, setEditMessenger] = useState(true);
  const [isEdit,setIsEdit] = useState(false)
  const dispatch = useDispatch();
  const { getClientConfig } = useSelector(userSelector);
  const [configData, setConfigData] = useState({
    messengerToken: "",
    whatsappToken: "",
    app_Id: "",
    phoneId: "",
    business_account_id: "",
    page_id: "",
  });
  let helperObj = {
    app_id: "app_Id",
    phone_id: "phoneId",
    business_account_id: "business_account_id",
    page_id: "page_id",
  };
  useEffect(() => {
    // let cid =  sessionStorage.getItem("UId");
    dispatch(getclientconfigApi());

    return ()=>{
      setIsEdit(false)
    }
  }, []);
  useEffect(() => {
    let availableObj = {};
    if (getClientConfig?.length > 0) {
      setIsEdit(true)
      getClientConfig.map((val) => {
        let params = val?.config_params;
        let chatbotType = val?.chatbot_type;
        for (let key in params) {
          let tokenkey = chatbotType === 1 ? "whatsappToken" : "messengerToken";
          key === "token"
            ? (availableObj[tokenkey] = params[key])
            : (availableObj[helperObj[key]] = params[key]);
        }
      });
    }
    setConfigData({ ...configData, ...availableObj });
  }, [getClientConfig]);
  const handleToggle = (type) => {
    if (type == "messenger") {
      setEditMessenger(false);
      setEditWhatsapp(true);
    } else {
      setEditMessenger(true);
      setEditWhatsapp(false);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfigData({ ...configData, [name]: value });
  };
  const handleSubmit = () => {
    let value = {
      chatbot_type: editWhatsapp ? 2 : 1,
      config_params: {
        business_account_id: configData.business_account_id,
        page_id: configData.page_id,
        app_id: configData.app_Id,
        token: editWhatsapp
          ? configData.messengerToken
          : configData?.whatsappToken,
        phone_id: configData.phoneId,
        client_id: sessionStorage.getItem("UId"),
      },
      client_id: sessionStorage.getItem("UId"),
    };
    if(isEdit) {
      dispatch(editclientConfigApi(value))
    }
    else{
      dispatch(addclientconfigApi(value));
    }
  };
  return (
    <div className="commonbox">
      {/* <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> */}
      <p style={{ fontSize: "24px", fontWeight: "600" }}>
         Manage Configuration
      </p>
      <input
        style={{ marginRight: "5px" }}
        type="checkbox"
        id="whatsapp"
        checked={!editWhatsapp}
        onChange={() => handleToggle("whatsapp")}
      />
      <label className="configLabel" htmlFor="whatsapp">
        WhatsApp
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
          gap: "10px",
        }}
      >
        <div style={{ position: "relative" }}>
          <CommonTextFields
            customChange={handleChange}
            values={configData.phoneId}
            disabled={editWhatsapp}
            label={"WhatsApp Id (Phone Id)"}
            placeholder={"Enter your Whatsapp Id"}
            name={"phoneId"}
          />
          {/* {!editWhatsapp && <ClipBoard />} */}
        </div>
        <div style={{ position: "relative" }}>
          <CommonTextFields
            customChange={handleChange}
            values={configData?.whatsappToken}
            disabled={editWhatsapp}
            label={"WhatsApp Token"}
            placeholder={"Enter your Whatsapp Token"}
            name={"whatsappToken"}
          />
          {/* {!editWhatsapp && <ClipBoard />} */}
        </div>
        <div style={{ position: "relative" }}>
          <CommonTextFields
            customChange={handleChange}
            values={configData?.business_account_id}
            disabled={editWhatsapp}
            label={"Business Account_id"}
            placeholder={"Enter your Business Account id"}
            name={"business_account_id"}
          />
          {/* {!editWhatsapp && <ClipBoard />} */}
        </div>
        <div style={{ position: "relative" }}>
          <CommonTextFields
            customChange={handleChange}
            values={configData?.app_Id}
            disabled={editWhatsapp}
            label={"App Id"}
            placeholder={"Enter your Whatsapp phone id"}
            name={"app_Id"}
          />
          {/* {!editWhatsapp && <ClipBoard />} */}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonTooltips showtip={editWhatsapp} tipText="Select Whatsapp to Edit Whatsapp config">

        <AddButton
          disable={editWhatsapp}
          buttonText={isEdit?"Edit":"Add"}
          handleClick={handleSubmit}
          />
          </ButtonTooltips>
      </div>
      <br></br>
      <input
        style={{ marginRight: "5px" }}
        type="checkbox"
        id="messenger"
        checked={!editMessenger}
        onChange={() => handleToggle("messenger")}
      />
      <label className="configLabel" htmlFor="messenger">
        Messenger
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
          gap: "10px",
        }}
      >
        <div style={{ position: "relative" }}>
          <CommonTextFields
            customChange={handleChange}
            values={configData?.appId}
            disabled={editMessenger}
            label={"Messenger Id (App Id)"}
            placeholder={"Enter your Messenger Id"}
            name={"appId"}
          />
          {/* {!editMessenger && <ClipBoard />} */}
        </div>
        {/* <br></br> */}
        <div style={{ position: "relative" }}>
          <CommonTextFields
            customChange={handleChange}
            values={configData?.messengerToken}
            disabled={editMessenger}
            label={"Messenger Token"}
            placeholder={"Enter your Messenger Id"}
            name={"messengerToken"}
          />
          {/* {!editMessenger && <ClipBoard />} */}
        </div>
        {/* <br></br> */}
        <div style={{ position: "relative" }}>
          <CommonTextFields
            customChange={handleChange}
            values={configData?.page_id}
            disabled={editMessenger}
            label={"Page Id"}
            placeholder={"Enter your page id"}
            name={"page_id"}
          />
          {/* {!editMessenger && <ClipBoard />} */}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonTooltips showtip={editMessenger} tipText="Select Messenger to edit Messenger config">

        <AddButton
          disable={editMessenger}
          buttonText={isEdit?"Edit":"Add"}
          handleClick={handleSubmit}
          />
          </ButtonTooltips>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ManageConfig;
