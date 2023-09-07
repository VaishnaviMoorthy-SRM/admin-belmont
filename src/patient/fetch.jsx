import "../Components/styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./loadingspin";
import { useNavigate } from "react-router-dom";
import { LineChart } from "@mui/x-charts";
import {
  ResponsiveChartContainer,
  LinePlot,
  useDrawingArea,
  useYScale,
  useXScale,
} from "@mui/x-charts";
const Fetch = () => {
  const [PatientID, setPatientId] = useState("");
  const [tendep0, settendep0] = useState([]);
  const [tendep10, settendep10] = useState([]);
  const [tendep20, settendep20] = useState([]);

  const [iscaleed, setIscaleed] = useState(false);
  const navigateTo = useNavigate();

  const handlePatientID = (e) => {
    setPatientId(e.target.value);
  };
  // let dep10Values = [];
  useEffect(() => {
    // Make the first API call to inputss
    const fetchData = async () => {
      try {
        setIscaleed(false);
        const response = await axios.get(
          "https://us-east-1.aws.data.mongodb-api.com/app/application-0-erzts/endpoint/getten"
        );
        console.log("response", response.data);
        settendep0(response.data.slice(0, 10).map((item) => item.Str10));
        console.log("usestate0", tendep0);
        settendep10(response.data.slice(0, 10).map((item) => item.Dep10));
        console.log("usestate10", tendep10);
        settendep20(response.data.slice(0, 10).map((item) => item.Dep20));
        console.log("usestate20", tendep20);

        setIscaleed(true);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(PatientID);
      const pID = PatientID;
      navigateTo(`/patient/${pID}`);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="leftDiv">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="hero-div2">
            <h1 className="hero-title2">
              Your Mental <br></br> Health Matters
            </h1>
            <h3 className=" hero-text2">Rediscover Happiness</h3>
            <h2 className="hero-desc2">
              At Belmont Private Hospital, we proudly provide evidence-based
              mental health treatment delivered by an experienced team of
              healthcare professionals. <br />
              We’re here to help with inpatient and day therapy treatment
              options to help you or a loved one with their mental health
              recovery.
            </h2>
          </div>
        </div>
        <div className="rightDiv">
          <div className="">
            <h1 className="title2">Enter the following Details</h1>
            <div className="inputGroup2">
              <label htmlFor="PatientID">Patient ID :</label>
              <input
                type="text"
                placeholder="Enter Patient ID"
                id="PatientID"
                onChange={(e) => handlePatientID(e)}
              />
            </div>

            <button className="button-292" onClick={handleSubmit}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
      <div className="outbot">
        <div className="bottomgr">
          <h2>Consolidated Graph for Depression Values</h2>
          {iscaleed ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <LineChart
                xAxis={[
                  {
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    label: "No of Patients",
                  },
                ]}
                yAxis={[
                  { id: "linearAxis", scaleType: "linear" },
                  { id: "logAxis", scaleType: "log" },
                ]}
                series={[
                  {
                    data: tendep0,
                    name: "RX#0",
                    curve: "linear",
                    label: "RX#0",
                  },
                  {
                    data: tendep10,
                    name: "RX#10",
                    curve: "linear",
                    label: "RX#10",
                  },
                  {
                    data: tendep20,
                    name: "RX#20",
                    curve: "linear",
                    label: "RX#20",
                  },
                  // { data: [10,20,0], name: "madra", curve: "linear", label: "madrass" },
                ]}
                width={500}
                height={300}
              ></LineChart>
            </div>
          ) : (
            <div>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Fetch;
