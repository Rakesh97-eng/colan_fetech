import React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Stack } from "@mui/material";

const CommonTextArea = (props) => {
  const { label, id, placeholder, values, name, customchange } = props;
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? grey[900] : grey[50]
        };
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === "dark" ? blue[600] : blue[200]
          };
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );
  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <label>{label}</label>
        {/* <Textarea
        name={name}
        onChange={customchange}
         value={values}
          aria-label="minimum height"
          minRows={3}
          sx={{
            width: "50%",
            mt: 0,
            mb: 0,
            borderRadius: "10px",
          }}
          placeholder={placeholder}
        /> */}
        <textarea
          style={{
            width: "50%",
            mt: 0,
            mb: 0,
            borderRadius: "8px",
            margin:"0px 0px 2% 0px",
            borderColor:"#bdc3bd",
            padding:"5px",
            color: "#000000b8",
          }}
          name={name}
          onChange={customchange}
          value={values}
        />
      </Stack>
    </div>
  );
};

export default CommonTextArea;
