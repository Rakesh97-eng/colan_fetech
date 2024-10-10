import React from "react";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import PhoneNumber from "react-phone-number-input";

// padding: 8px;
// border: 1px gray solid;
// border-radius: 3px;

const CommonTextFields = ({
  id,
  label,
  formik,
  customStyles,
  disabled,
  name,
  values,
  placeholder,
  customChange,
  type = "text",
  required,
  ...props
}) => {
  const handleChange = (e) => {
    formik.handleChange(e);
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        // spacing={2}
      >
        <label>{label}</label>
     { name=== "manage_data"?<PhoneNumber className="phone_number_field"  placeholder="Enter phone number" value={formik?.values[id]} onChange={customChange ? customChange : handleChange} />
     :<TextField
          fullWidth
          id={id}
          name={name}
          margin="normal"
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          onChange={customChange ? customChange : handleChange} // Add onChange handler
          value={formik?.values[id] || values}
          error={Boolean(formik?.touched[id] && formik?.errors[id])}
          helperText={<>{formik?.touched[id] && formik?.errors[id]}</>}
          onBlur={formik?.handleBlur}
          variant="outlined"
          sx={{
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
            width: "50%",
            mt: 0,
            mb: 0,
            borderRadius: "10px",
            "& .MuiOutlinedInput-input": customStyles?.OutlinedInput,
          }}
          {...props}
        />}
      </Stack>
    </>
  );
};

export default CommonTextFields;
