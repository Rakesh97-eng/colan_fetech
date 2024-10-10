import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./commonComp.css";

export default function DashCard({ cardItem,dashboardValue }) {
  return (
    <>
      <div className="cardcontainer">
        {cardItem.map((cards, i) => {
          const { value, icon, name,id } = cards;
          return (
            <Card key={i} className="card">
              <CardContent className="uppercontent">
                <Typography
                  sx={{ fontSize: 14 }}
                  gutterBottom
                  className="cardText"
                >
                  {name}
                </Typography>
                <img src={icon} width="50" height="50" />
              </CardContent>
              <CardContent sx={{ padding: "0px 15px" }}>
                <Typography sx={{ fontSize: "38px", padding: "0px",fontWeight:"600" }}>
                  {dashboardValue?dashboardValue[id]:""}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
