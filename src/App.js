import {
  Card,
  FormControl,
  MenuItem,
  Select,
  CardContent
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { InfoBox } from "./Components/InfoxBox/InfoBox";
import numeral from "numeral";
import "./styles.css";
import statedata from "./Utils/data";
import { prettyPrintStat } from "./Utils/util";
import { Table } from "./Components/Table/Table";
import { LineGraph } from "./Components/LineGraph/LineGraph";

export default function App() {
  const [selectcountries, setselectcountires] = React.useState([]);
  const [currentstate, setcurrentstate] = React.useState("MH");
  const [countrydata, setcountrydata] = React.useState({});
  const [currentdistricts, setcurrentdistricts] = React.useState([]);
  const [casestype, setcasestype] = React.useState("cases");
  const [label, setlabel] = React.useState([]);
  const [numsdata, setnumsdata] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://data.covid19india.org/v4/min/data.min.json")
      .then((res) => {
        console.log(res.data);
        let countries = res.data;
        let count = 0;
        let empty = [];
        for (let key in countries) {
          let datachange = {
            statecode: key,
            statename: statedata[count]
          };
          empty.push(datachange);
          count++;
        }
        setselectcountires(empty);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("https://data.covid19india.org/v4/min/data.min.json")
      .then((res) => {
        let updated = res.data;
        let empty = [];
        for (let key in updated) {
          if (key === currentstate) {
            setcountrydata(updated[key]);
            empty = updated[key]["districts"];
          }
        }
        let update = [];
        let update1 = [];
        let update2 = [];
        for (let key in empty) {
          let newdata = {
            x: empty[key]["total"]["confirmed"],
            y: key
          };
          update.push(newdata);
          update1.push(empty[key]["total"]["confirmed"]);
          update2.push(key);
        }
        update = update.sort((a, b) => (a.x > b.x ? -1 : 1));
        setcurrentdistricts(update);
        setlabel(update2);
        setnumsdata(update1);
      });
  }, [currentstate]);

  const onChangeState = (e) => {
    setcurrentstate(e.target.value);
  };

  const Returnproper1= (data)=>{
   let str = "Date:- ";
   for(let j =0; j<=9;j++){
       str += data[j]
   }

   return str
  }

  const Returnproper= (data)=>{
    let str1 = "Time:- ";
    for(let j =11; j<=18;j++){
        str1 += data[j]
    }
 
    return str1
   }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker India</h1>
          <FormControl className="app__dropdown">
            <Select
              value={currentstate}
              onChange={onChangeState}
              variant="outlined"
            >
              {selectcountries.map((el) => {
                return (
                  <MenuItem value={el.statecode} key={el.statecode}>
                    {el.statename}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        {countrydata["total"] !== undefined && (
          <div className="app__stats">
            <InfoBox
              onClick={(e) => setcasestype("cases")}
              title="Coronavirus Cases"
              isRed
              Total={numeral(countrydata["total"]["confirmed"]).format("0.0a")}
              cases={
                countrydata["delta"] === undefined
                  ? prettyPrintStat(countrydata["delta7"]["confirmed"])
                  : prettyPrintStat(countrydata["delta"]["confirmed"])
              }
              Period={
                countrydata["delta"] === undefined ? "Last 7 Days" : "Today"
              }
              active={casestype === "cases"}
            />
            <InfoBox
              onClick={(e) => setcasestype("recovered")}
              title="Recovered"
              Total={numeral(countrydata["total"]["recovered"]).format("0.0a")}
              cases={
                countrydata["delta"] === undefined
                  ? prettyPrintStat(countrydata["delta7"]["recovered"])
                  : prettyPrintStat(countrydata["delta"]["recovered"])
              }
              Period={
                countrydata["delta"] === undefined ? "Last 7 Days" : "Today"
              }
              active={casestype === "recovered"}
            />
            <InfoBox
              onClick={(e) => setcasestype("deaths")}
              title="Deaths"
              Total={numeral(countrydata["total"]["deceased"]).format("0.0a")}
              cases={
                countrydata["delta"] === undefined
                  ? prettyPrintStat(countrydata["delta7"]["deceased"])
                  : prettyPrintStat(countrydata["delta"]["deceased"])
              }
              Period={
                countrydata["delta"] === undefined ? "Last 7 Days" : "Today"
              }
              active={casestype === "deaths"}
            />
          </div>
        )}
        <LineGraph label={label} numsdata={numsdata}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Total Cases By Districts</h3>
            <Table countries={currentdistricts} />
            <h3>Last Updated Time</h3>
            <h2>{countrydata["total"] !== undefined && Returnproper1(countrydata["meta"]["last_updated"])}</h2>
             <h2>{countrydata["total"] !== undefined && Returnproper(countrydata["meta"]["last_updated"])}</h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
