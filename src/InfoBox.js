import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import './InfoBox.css';

function InfoBox({ title, cases, isRed,active,total,...props}) {
  return (
    <Card className={`infoBox ${active && 'infobox__selected'} 
     ${isRed && 'infobox__isRed'}`}
    onClick={props.onClick}
    >
      <CardContent>
        {/* title */}
        <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
        {/* number of cases */}
        <h2 className={`infoBox__cases ${!isRed && 'infobox__casesgreen'}`}>{cases}</h2>
        <Typography className="infobox__totle" color="textSecondary">{total} Total</Typography>
        {/* total */}
      </CardContent>
    </Card>
  );
}

export default InfoBox;
