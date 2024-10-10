import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CustomizedTables from "../../../../components/common/commonTable";
import { ClientDataHead, manageDataTableHead } from "../../../../components/common/tableData";
import { getManualUploadDataApi } from "../../../../redux/action/userAction";
import { userSelector } from "../../../../redux/slice/userSlice";
import xlsx from "json-as-xlsx"
import AddButton from "../../../../components/common/Button/addButton";


const ReceivedClients = () => {
  let location = useLocation();
  const{data} = location.state;
  const [modalOpen, setModalOpen] = useState();
  const dispatch = useDispatch();
  const { getTableData,manualUpload,fileData,getTableDataLoading } = useSelector(userSelector);
  const paginationRowsOptions = [5, 10, 20, 50, 100];


  const handleModalOpen = () => {
    setModalOpen(true);
  };



  const downloadExcel = ()=>{
    let data = [
      {
        sheet: "Clients",
        columns:manageDataTableHead,
        content: getTableData
      },
    
    ]
    let settings = {
      fileName: "MySpreadsheet", // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: true, // Display the columns from right-to-left (the default value is false)
    }
    
    xlsx(data, settings) 
  }

  useEffect(() => {
    dispatch(getManualUploadDataApi(data?.id));
  }, [manualUpload,fileData]); // Add getClientDetail as a dependency

  return (
    <>
      <div className="commonbox">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <p style={{fontSize:"24px",fontWeight:"600"}}>Manage Clients</p>
        {/* <Button className="addBtn" onClick={downloadExcel}>
          Download
        </Button> */}
        <AddButton handleClick={downloadExcel} buttonText={"Download"}/>
        </div>
       
        <CustomizedTables
          columns={manageDataTableHead}
          rows={getTableData}
          paginationStatus={true}
          rowsPerPageOptions={paginationRowsOptions}
          dataLoading = {getTableDataLoading}
          
        />
       
       <Button className="approvebtn" onClick={handleModalOpen}>
          Approve
        </Button>
      </div>

    </>
  );
};

export default ReceivedClients;
