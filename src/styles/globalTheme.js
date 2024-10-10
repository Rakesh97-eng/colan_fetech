import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#00e785", // Custom primary color
    },
    secondary: {
      main: "#5DBA40", // Custom secondary color
    },
  },

  typography: {
    button: {
      fontSize: "14px",
      fontWeight: "600",
    },
  },
});
