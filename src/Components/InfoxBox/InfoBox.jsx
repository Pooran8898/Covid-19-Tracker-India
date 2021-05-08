import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css"


export const InfoBox = ({ title, cases, Total, Period, active, isRed, ...props })=>{


  return(
    <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
       <CardContent >
          <Typography color="textSecondary" className="infoBox__title" gutterBottom>{title}</Typography>
           <h4 className="infoBox__Period">{Period}</h4>
           <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
          <Typography className="infoBox__total" color="textSecondary">{Total} Total</Typography> 
         </CardContent>
      </Card>
  )
}