import React from 'react';
import './InfoBox.css'
import {Card,Typography} from '@material-ui/core';

function InfoBoxes({title,cases,isRed,active,total,...props }) {
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${
      isRed && "infoBox--red"
    }`}>
    
        {/* {Title} */}
        <Typography color ="textSecondary" className="infoBox__title">{title}</Typography>
         {/* {No of cases} */}
         <h2 className="infoBox__cases">{cases}</h2>
          {/* {Total} */}
          <Typography color ="textSecondary" className="infoBox__total"> {total} Total </Typography>
    </Card>
  )
}

export default InfoBoxes;