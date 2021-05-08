import React from "react";
import {Bar} from "react-chartjs-2";





export const LineGraph = ({label:Checklab, numsdata})=>{

  return(
   <Bar
    data={{
      labels:[...Checklab],
      datasets:[{
        label:"Total Cases District Wise",
         data:numsdata,
         backgroundColor: [
          'rgba(255, 99, 132, 0.6)'
         ],
         borderColor: [
          'rgba(255, 99, 132, 1)',
         ]
       }]
    }}>
    
     </Bar>
  )
}