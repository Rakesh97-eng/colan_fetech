import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox, TablePagination } from "@mui/material";
import { Fragment } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import "./commonComp.css";
import { useLocation, useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ButtonTooltips from "./toolTip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#030028",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#C4CDD5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function RowActions({
  handleEdit = "",
  onDelete,
  row,
  isDeleteAllowed,
  isEditAllowed,
}) {
  return (
    <>
      {handleEdit
        ? isEditAllowed && (
            <DriveFileRenameOutlineIcon
              onClick={() => handleEdit(row)}
              className="edit-icon"
              style={{color:"#5686e1",fontWeight:"550"}}
            />
          )
        : ""}
      {isDeleteAllowed && (
        <DeleteIcon className="edit-icon" onClick={() => onDelete(row)} />
      )}
    </>
  );
}

function StatusButton({ value }) {
  const backgroundColor = value === 1 || value === true ? "#00E785" : "#FF3939";
  const text = value === 1 || value === true ? "Active" : "Inactive";
  const color = value ? "black" : "white";

  return (
    <Button
      className="activeBtn"
      sx={{
        backgroundColor,
        color,
        fontSize: "12px",
        width: "80px",
        "&:hover": {
          backgroundColor:
            value === 2 || value === false
              ? "#FF3939 !important"
              : "#00e785 !important",
        },
      }}
    >
      {text}
    </Button>
  );
}

function PublishButton({ value, text,triggerChat, rowdata }) {
  // && rowdata?.msg_temp_status === true
// && rowdata?.msg_temp_status === true
  const backgroundColor = value === 1 || value === true ?"#00E785":"#a0abc7";
  const disabled = value === 1 || value === true  ? false:true;
  const color = value ? "black" : "white";
  return (
    <>
    <ButtonTooltips showtip={disabled}>
    <Button
      className="activeBtn"
      disabled ={disabled}
      sx={{
        backgroundColor,
        color,
        fontSize: "12px",
        width: "80px",
        "&:hover": {
          backgroundColor:
            value === 2 || value === false
              ? "#FF3939 !important"
              : "#00e785 !important",
        },
      }}
      onClick={() => triggerChat(rowdata)}
    >
      {text}
    </Button>
    </ButtonTooltips>
  
  
    </>

  );
}

function CustomizedTables({
  rows = [],
  columns,
  onDelete,
  handleChange,
  paginationStatus,
  dataLoading = false,
  subscriptionData,
  navigatepath = "",
  isEditAllowed,
  isDeleteAllowed,
  triggerChat,
  ...props
}) {
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const paginationRowsOptions = [5, 10, 20, 50, 100];

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/")[2];

  const startIndex = size * page + 1;
  const endIndex = Math.min((size + 1) * page, rows?.length);
  const totalEntries = rows?.length;

  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };


  const handlePageChange = async (event, newPage) => {
    setSize(newPage);
  };
  const handleEdit = (data,path="") => {
    const id = data?.chatbot_id;
    navigate(`/dashboard/${path || navigatepath || `edit${pathname}`}`, {
      state: { action: "Edit", arrayIndex: id, data },
    });
  };

  let roleObj = {
    1: "Employee",
    2: "Manager",
    3: "Accountant",
  };

  let getbilling = (value) => {
    if(value?.length>0){
      if (value) {
        return  "$"+value[0]?.billing
      } else {
        return "$500";
      }
    }
    else{
      return "No Data"
    }
  };

  let getplan = (value) => {
    if(value?.length>0){
      if (value) {
        return value[0]?.subscription_plan
      } else {
        return "Tier-1";
      }
    }
    else{
      return "No data"
    }
  };
  return (
    <Paper elevation={0}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <StyledTableCell
                  sx={{ textAlign: "center", margin: "auto" }}
                  key={i}
                  align={column.align}
                >
                  {column.id === "Action" ||
                  column.id === "clientAction" ||
                  column.id === "receiveddata"
                    ? isEditAllowed || isDeleteAllowed
                      ? column.label
                      : ""
                    : column.label}
                  {/* {column.label} */}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* ## table has empty data ## */}
          {rows == "" ||
          rows == undefined ||
          rows == null ||
          rows?.content?.length === 0 || dataLoading === true? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  {dataLoading ? (
                    <div>
                      {Array.from(Array(3).keys()).map((val, i) => (
                        <div
                          key={i}
                          style={{ margin: "2px" }}
                          className="skeleton"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    " There are no records to display"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows?.slice(size * page, size * page + page).map((row, i) => (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={i}
                  sx={{ textAlign: "center", margin: "auto" }}
                >
                  {columns.map((column) => {
                    const value =
                      column.id === "id" ? (
                        startIndex + i
                      ) : column.id === "plan" ? (
                        <div className="planbutton">
                          {getplan(row[column.id])}
                        </div>
                      ) : column.id === "Action" ? (
                        <RowActions
                          handleEdit={handleEdit}
                          onDelete={onDelete}
                          row={row}
                          isDeleteAllowed={isDeleteAllowed}
                          isEditAllowed={isEditAllowed}
                        />
                      ) : column.id === "is_active" ||column.id === "status" ? (
                        <StatusButton value={row[column.id]} />
                      ) : column.id === "designation" ? (
                        roleObj[row["designation"]]
                      ) : column.id === "description" ||
                        column.id === "question" ? (
                        <>
                          {row[column.id] ? (
                            row[column.id]
                          ) : (
                            <span style={{ color: "rgb(157 143 143 / 96%)" }}>
                              No Data to Display
                            </span>
                          )}
                        </>
                      ) : column.id === "edit" ||
                        column.id === "delete" ||
                        column.id === "change" ||
                        column.id === "add" ? (
                        <>
                          <Checkbox
                            checked={row[column.id]}
                            disabled={row.disable}
                            name={column.id}
                            onChange={(e) => handleChange(e, row)}
                          />
                        </>
                      ) : column.id === "view" ? (
                        <>
                          <Checkbox
                            checked={row[column.id]}
                            name={column.id}
                            onChange={(e) => handleChange(e, row)}
                          />
                        </>
                      ) : column.id === "clientAction" ? (
                        <RowActions
                          onDelete={onDelete}
                          row={row}
                          isDeleteAllowed={isDeleteAllowed}
                        />
                      ) : column.id === "receiveddata" ? (
                        isEditAllowed && (
                          <p
                            style={{ margin: 0 }}
                            onClick={() => handleEdit(row)}
                            className="viewtext"
                          >
                            View
                          </p>
                        )
                      ): column.id === "configuration" ? (
                       
                          <p
                            style={{ margin: 0 }}
                            onClick={() => handleEdit(row,'manageclientconfig')}
                            className="viewtext"
                          >
                            View
                          </p>
                        
                      )  : column.id === "price" ? (
                        row[column.id] ? (
                          <>
                          <span style={{fontWeight:"800"}}>$</span><span style={{fontSize:"14px",fontWeight:"600"}}>{row[column.id]}/{row?.interval}</span>
                          </>
                        ) : (
                          getbilling(row["plan"])
                        )
                      ) : column.id === "Publish" ? (
                        <PublishButton
                        value = {row["status"]}
                          text={"Publish"}
                          triggerChat={triggerChat}
                          rowdata={row}
                        />
                      ) : (
                        row[column.id]
                      );

                    return (
                      <Fragment key={column.id}>
                        <StyledTableCell
                          className="tablecontainer"
                          sx={{ textAlign: "center", margin: "auto" }}
                        >
                          {value}
                        </StyledTableCell>
                      </Fragment>
                    );
                  })}
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {paginationStatus && (
        <div
          className="pagination-info"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ paddingTop: "10px", fontSize: "14px" }}>
            Showing {startIndex} to {endIndex} of {totalEntries} entries
          </p>
          <TablePagination
            rowsPerPageOptions={paginationRowsOptions}
            component="div"
            count={rows?.length || 0}
            rowsPerPage={page}
            page={size}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handlePerRowsChange}
            className="pagination-text"
          />
        </div>
      )}
    </Paper>
  );
}

export default CustomizedTables;
