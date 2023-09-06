// PatientDetails.js
import React from "react";
import "../Components/styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import {
  ResponsiveChartContainer,
  LinePlot,
  useDrawingArea,
  useYScale,
  useXScale,
} from "@mui/x-charts";
const pgraph = ({ patientID }) => {
  const navigateTo = useNavigate();
  const [age, setAge] = useState(36);
  const [anx0, setAnx0] = useState(22);
  const [dep0, setDep0] = useState(34);
  const [gender, setGender] = useState("male");
  const [mscore0, setMscore0] = useState(24);
  const [rmt, setRmt] = useState("43%");
  const [str0, setStr0] = useState(18);

  //outputs
  const [str10, setStr10] = useState(12);
  const [str20, setStr20] = useState(2);
  const [dep10, setDep10] = useState(22);
  const [dep20, setDep20] = useState(20);
  const [anx10, setAnx10] = useState(4);
  const [anx20, setAnx20] = useState(2);
  const [mscore10, setms10] = useState(7);
  const [noses, setSes] = useState(24);

  const [outputData, setoutputData] = useState(null);

  let RXA = [anx0, anx10, anx20];
  let RXD = [dep0, dep10, dep20];
  let RXS = [str0, str10, str20];
  let xLabels = [0, 10, 20];

  const maddata = [parseInt(mscore0), parseInt(mscore10)];

  useEffect(() => {
    // Make the first API call to inputss
    axios
      .get(
        `https://us-east-1.aws.data.mongodb-api.com/app/application-0-erzts/endpoint/readinp?arg1=${patientID}`
      )
      .then((response) => {
        // Save the response in state
        setAge(response.data.AGE);
        setAnx0(response.data.Anx0);
        setDep0(response.data.Dep0);
        setGender(response.data.GENDER);
        setMscore0(response.data.MScore0);
        setRmt(response.data["RMT %"]);
        setStr0(response.data.Str0);
        console.log("inputs: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API 1:", error);
      });

    // Make the second API call to outputs
    axios
      .get(
        `https://us-east-1.aws.data.mongodb-api.com/app/application-0-erzts/endpoint/readout?arg1=${patientID}`
      )
      .then((response) => {
        // Save the response in state
        console.log("outputs: ", response.data);
        setDep10(response.data.Dep10);
        setDep20(response.data.Dep20);
        setAnx10(response.data.Anx10);
        setAnx20(response.data.Anx20);
        setStr10(response.data.Str10);
        setStr20(response.data.Str20);
        setms10(response.data.MScore10);
        setSes(response.data["# of TREATMENTS"]);
      })
      .catch((error) => {
        console.error("Error fetching data from API 2:", error);
      });
  }, []); // The empty dependency array ensures this runs only once on component mount

  const handleBack = async () => {
    try {
      navigateTo(`/`);
    } catch (error) {
      console.error("Error navigating back:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="rightDiv">
          <div className="card2">
            <h1 className="title2">Patient Inputs</h1>
            {/* <h1>{inputData.AGE}</h1> */}
            <h2>PatientID : {patientID}</h2>
            <h2>Age : {age}</h2>
            <h2>Gender : {gender}</h2>
            <h2>RMT % : {rmt}</h2>
            <h2>Depression RX#0 : {dep0}</h2>
            <h2>Stress RX#0 : {str0}</h2>
            <h2>Anxiety RX#0 : {anx0}</h2>
            <h2>MADRS Score RX#0 : {mscore0}</h2>
          </div>
        </div>
        <div className="rightDiv">
          <div className="card2">
            <h1 className="title2">Predicted Outputs</h1>
            <h2>PatientID : {patientID}</h2>
            <h2>Depression RX#10 : {dep10}</h2>
            <h2>Depression RX#20 : {dep20}</h2>
            <h2>Stress RX#10 : {str10}</h2>
            <h2>Stress RX#20 : {str20}</h2>
            <h2>Anxiety RX#10 : {anx10}</h2>
            <h2>Anxiety RX#20 : {anx20}</h2>
            <h2>MADRS Score RX#10 : {mscore10}</h2>
          </div>
          {/* <button className="button-292" onClick={handleBack}>
            <span>Back</span>
          </button> */}
        </div>
      </div>
      <div className="outbot">
        <div className="bottomgr">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <LineChart
              xAxis={[{ data: xLabels, label: "No of Sessions" }]}
              yAxis={[
                { id: "linearAxis", scaleType: "linear" },
                { id: "logAxis", scaleType: "log" },
              ]}
              series={[
                { data: RXA, name: "RXA", curve: "linear", label: "Anxiety" },
                {
                  data: RXD,
                  name: "RXD",
                  curve: "linear",
                  label: "Depression",
                },
                { data: RXS, name: "RXS", curve: "linear", label: "Stress" },
                // { data: [10,20,0], name: "madra", curve: "linear", label: "madrass" },
              ]}
              width={500}
              height={300}
            ></LineChart>
            <LineChart
              xAxis={[{ data: [0, 10], label: "No of Sessions" }]}
              yAxis={[
                { id: "linearAxis", scaleType: "linear" },
                { id: "logAxis", scaleType: "log" },
              ]}
              series={[
                {
                  data: maddata,
                  name: "Madras Score",
                  curve: "linear",
                  label: "MADRAS Score",
                },
              ]}
              width={400}
              height={250}
            ></LineChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default pgraph;
