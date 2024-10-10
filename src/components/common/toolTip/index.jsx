import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function ButtonTooltips({ children, showtip,tipText=null }) {
  return (
    <div>
      {showtip ? (
        <HtmlTooltip
          title={
            <React.Fragment>
              {tipText?tipText:"To publish Whatsapp chat please Change the status to active"}
            </React.Fragment>
          }
        >
          <span>{children}</span>
        </HtmlTooltip>
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
}
