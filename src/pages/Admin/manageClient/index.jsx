import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AuthHoc from "../../../components/authHoc/authHoc";
import AddButton from "../../../components/common/Button/addButton";
import CustomizedTables from "../../../components/common/commonTable";
import { ClientDataHead } from "../../../components/common/tableData";
import AddClientModal from "../../../components/modal/addClientModal";
import { useModalClose } from "../../../hooks/useModalClose";
import { deleteclientApi, deleteClientApi, deleteRegisterApi, getClientApi, getSubscriptionApi } from "../../../redux/action/adminAction";
import { adminSelector } from "../../../redux/slice/adminSlice";
import "../../../styles/App.css";

const ManageClients = (props) => {
   const {isauthenticated } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const ref = useModalClose(modalOpen,setModalOpen)
  const dispatch = useDispatch();
  const { getClientDetail, clientDetail,getClientDetailisLoading,deleteDataIsLoading ,clientDetailisLoading,deleteData,getSubscriptionDetail, subscriptionDetail} = useSelector(adminSelector);
  const paginationRowsOptions = [5, 10, 20, 50, 100];

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleDelete = (client)=>{
    dispatch(deleteclientApi(client.id))
    
  }
  useEffect(() => {
    if(!clientDetailisLoading && !deleteDataIsLoading){
      dispatch(getClientApi());
    }
  }, [clientDetail,deleteData]); // Add getClientDetail as a dependency

    useEffect(()=>{
      if(modalOpen){
        dispatch(getSubscriptionApi());
      }
    },[modalOpen])

  return (
    <>
      <div className="commonbox">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <p style={{fontSize:"24px",fontWeight:"600"}}>Manage Clients</p>
        {/* <Button className="addBtn" onClick={handleModalOpen}>
          +Add
        </Button> */}
        {/* Moving to commmon Button */}
        {isauthenticated?.add && <AddButton buttonText={"Add"} handleClick={handleModalOpen}/>}
        </div>
       
      {isauthenticated?.view === true &&  <CustomizedTables
          columns={ClientDataHead}
          rows={getClientDetail}
          paginationStatus={true}
          rowsPerPageOptions={paginationRowsOptions}
          isDeleteAllowed={isauthenticated.delete}
          isEditAllowed={isauthenticated.change}
          onDelete = {handleDelete}
          dataLoading = {getClientDetailisLoading}
          subscriptionData={getSubscriptionDetail}
          navigatepath={'receivedclient'}
          
        />}
        <AddClientModal ref={ref} openModal={modalOpen} setOpenModal={handleModalClose} clientsubscriptiondetail={getSubscriptionDetail}/>
     
      </div>

    </>
  );
};

export default AuthHoc(ManageClients,"clients");
// export default ManageClients

// make a hoc
// get the permission and validatae
//isadd,isview,isedit,isdelete

