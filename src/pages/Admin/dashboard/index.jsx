import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "../../../components/chart/barChart";
import DashCard from "../../../components/common/card";
import CustomizedTables from "../../../components/common/commonTable";
import { dashboardTableHead } from "../../../components/common/tableData";
import ResponseList from "../../../components/responseList";
import { dashbordDataApi, getEarningsApi } from "../../../redux/action/adminAction";
import { adminSelector } from "../../../redux/slice/adminSlice";
import { CardItem } from "../../../utils/constants/cardItem";
import "./dashboardStyle.css";

const Dashboard = () => {
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const dispatch = useDispatch();
  const { EarningsDetail,dashboardData } = useSelector(adminSelector);

  const paginationRowsOptions = [5, 10, 20, 50, 100];

  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getEarningsApi());
    dispatch(dashbordDataApi())
  }, []);

  return (
    <div className="dashboardcontainer">
      {/* dashboardValue={dashboardData} */}
      <DashCard cardItem={CardItem} dashboardValue={dashboardData}/>
      <div className="statistics">
        <div className="barContainer">
          <div>
            <p className="barheader">Activity</p>
            <p className="barheader">Total Statistics</p>
          </div>
          <Divider />
          <BarChart />
        </div>
        <div className="responsechart">
          <ResponseList />
        </div>
      </div>
      <div className="commonbox">
        <p style={{fontSize:"24px",fontWeight:"600"}}>Earnings</p>

        <br />
        <CustomizedTables
          columns={dashboardTableHead}
          rows={EarningsDetail}
          paginationStatus={true}
          rowsPerPageOptions={paginationRowsOptions}
          page={page}
          size={size}
          handleChangePage={handlePageChange}
          // dataLoading = {adminDataLoading}
          handleChangeRowsPerPage={handlePerRowsChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
