import React from "react";
import "./Table.css";
import numeral from "numeral";

export const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map((el) => {
       return <tr>
          <td>{el.y}</td>
          <td>
            <strong>{numeral(el.x).format("0.0")}</strong>
          </td>
        </tr>;
      })}
    </div>
  );
};
