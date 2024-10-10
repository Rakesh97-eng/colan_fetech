import React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const CommonSwitch = ({ label, id, formik,isPeriod = false }) => {
  const [ischecked,setIsChecked] = useState(false)
  useEffect (()=>{
    setIsChecked(formik?.values[id])
  },[formik?.values])
  const FlexContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  });
  const IOSSwitch = styled((SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...SwitchProps}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#FF3939" : "#00E785",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#FF3939" : "#00E785",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  return (
    // <FlexContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label style={{ fontSize: "16px", width: "100%" }}>
          {label}
          {/* {required && <span className="field-required">*</span>} */}
        </label>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography>{isPeriod?"Yearly":"Inactive"}</Typography>
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ marginLeft: 3 }}
                defaultChecked
                checked={ischecked}
                onChange={formik?.handleChange}
                name={id}
              />
            }
          />
          <Typography>{isPeriod?"Monthly":"Active"}</Typography>
        </div>
      </div>
    // </FlexContainer>
  );
};

export default CommonSwitch;
