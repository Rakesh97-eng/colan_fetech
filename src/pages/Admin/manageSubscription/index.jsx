import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AuthHoc from "../../../components/authHoc/authHoc";
import AddButton from "../../../components/common/Button/addButton";
import CustomizedTables from "../../../components/common/commonTable";
import { SubscriptionDataHead } from "../../../components/common/tableData";
import AddSubscriptionModal from "../../../components/modal/addSubscriptionModal";
import { useModalClose } from "../../../hooks/useModalClose";
import { deleteRegisterApi, deleteSubscriptionApi, getSubscriptionApi } from "../../../redux/action/adminAction";
import { adminSelector } from "../../../redux/slice/adminSlice";
import "../../../styles/App.css";

const ManageSubscription = (props) => {
   const {isauthenticated } = props;

  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const [modalOpen, setModalOpen] = useState();
  const ref = useModalClose(modalOpen,setModalOpen)
  const dispatch = useDispatch();
  const { getSubscriptionDetail, subscriptionDetail,getSubscriptionDetailisLoading ,deleteSubscriptionLoading,subscriptionDetailisLoading} =
    useSelector(adminSelector);
  const paginationRowsOptions = [5, 10, 20, 50, 100];


  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleDelete = (data)=>{
    let id = data?.id;
    dispatch(deleteSubscriptionApi(id))
  }

  useEffect(() => {
    dispatch(getSubscriptionApi());
  }, [subscriptionDetail]);

  return (
    <>
      <div className="commonbox">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <p style={{fontSize:"24px",fontWeight:"600"}}>Manage Subscription</p>

        {/* <Button className="addBtn" onClick={handleModalOpen}>
          + Add
        </Button> */}
       {isauthenticated?.add && <AddButton handleClick={handleModalOpen} buttonText={"+Add"}/>}
        </div>
       {isauthenticated?.view && <CustomizedTables
          columns={SubscriptionDataHead}
          rows={getSubscriptionDetail||[]}
          paginationStatus={true}
          rowsPerPageOptions={paginationRowsOptions}
          page={page}
          size={size}
          isDeleteAllowed={isauthenticated.delete}
          isEditAllowed={isauthenticated.change}
          onDelete = {handleDelete}
          handleChangePage={handlePageChange}
          dataLoading = {getSubscriptionDetailisLoading || deleteSubscriptionLoading || subscriptionDetailisLoading}
          handleChangeRowsPerPage={handlePerRowsChange}
        />}
        <AddSubscriptionModal
          ref={ref}
          openModal={modalOpen}
          setOpenModal={setModalOpen}
        />
      </div>
    </>
  );
};

export default AuthHoc(ManageSubscription,"subscriptions");
// export default ManageSubscription;
