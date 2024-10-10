import { MenuItem, TextField, inputLabelClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UilAngleDown } from "@iconscout/react-unicons";
import { Capitalize } from "../../../utils/findids/helperutils";

function CommonDropDown({
  id,
  label,
  formik,
  options,
  sx,
  customStyles,
  defaultValue = "",
  value,
  disabled,
  required,
  customChange,
  statusChecker = false,
}) {
  const [selectedValue, setSelectedValue] = useState();
  useEffect(() => {
    setSelectedValue(formik.values[id] || defaultValue || value);
  }, [defaultValue, formik.values, id, value]);
  const showOption = (option) => {
    let optiontext;
    switch (label) {
      case "Subscription Plan":
        optiontext = ` ${Capitalize(option.interval)}ly-${option?.plan_name|| "Tier"}`;
        // optiontext = ` ${option.plan_period}-${option.subscription_plan}`;
        break;
      case "Billing":
        optiontext = `${option.subscription_plan}-${option?.billing}`;
        break;

      default:
        optiontext = option?.label || option?.designation;
        break;
    }
    return optiontext;
  };
  return (
    <div className="formik-select-wrapper" style={{minWidth:"300px"}}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
       {label ? <label style={{ fontSize: "16px" }}>
          {label}
          {required && <span  className="field-required">*</span>}
        </label>:""}
        <TextField
          size="small"
          id={id}
          select
          fullWidth
          margin="normal"
          name={id}
          disabled={disabled}
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (customChange) customChange(e);
          }}
          value={formik.values[id] || defaultValue}
          className="select-menu-item"
          variant="outlined"
          error={Boolean(formik.touched[id] && formik.errors[id])}
          helperText={<>{formik.touched[id] && formik.errors[id]}</>}
          sx={{
            ".MuiOutlinedInput-notchedOutline": sx?.outlinedInput,
            "& .MuiOutlinedInput-input": customStyles?.OutlinedInput,
            ...sx?.root,
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
            width: "50%",
            mt: 0,
            mb: 0,
          }}
          InputProps={{
            ...customStyles?.startAdornment,
            sx: {
              color: selectedValue === defaultValue ? "black" : "black",
              [`&.${inputLabelClasses.shrink}`]: {
                color: selectedValue === defaultValue ? "#bbbbbb" : "black",
              },
              ...sx?.inputProps,
            },
          }}
          SelectProps={{
            IconComponent: UilAngleDown,
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: "250px",
                },
              },
            },
          }}
        >
          {selectedValue === defaultValue && (
            <MenuItem value={defaultValue} hidden>
              {selectedValue}
            </MenuItem>
          )}
          {options?.map((option,index) => (
            //we can use option.subscription

            <MenuItem
              key={index}
              value={
                option?.designation_id ||
                option?.id ||
                option?.value
              }
              sx={{ color: option.active ? "grey" : "inherit" }}
              disabled={option.disabled}
            >
              {statusChecker && (
                <div
                  className={option.active ? "active-dot" : "non-active-dot"}
                ></div>
              )}
              {showOption(option)}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
}

export default CommonDropDown;
