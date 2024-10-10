import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ResponseCardItem } from "../utils/constants/cardItem";
import "./comp.css";

export default function ResponseList() {
  return (
    <div className="responsecontainer">
      <Typography
        style={{
          height: "7%",
          margin: "10px 15px",
          fontWeight: "600",
          color: "#1E1B39",
        }}
      >
        Reason For Dropping Off{" "}
      </Typography>
      <Divider />
      <List sx={{ height: "92%" }}>
        {ResponseCardItem.map((response,i) => {
          const { icon, name, comment } = response;
          return (
            <>
              <ListItem key={i} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={icon} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography sx={{fontWeight:"600"}}>{name}</Typography>}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </div>
  );
}
