import "../Components/styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
  const [fetchedinput, setFetchedinput] = useState(null);
  const navigateTo = useNavigate();
  const handlePatientID = (e) => {
    setPatientId(e.target.value);
  };

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
                  data: [35, 16, 26, 34, 42, 12, 42, 42, 36, 16],
                  name: "RX#0",
                  curve: "linear",
                  label: "RX#0",
                },
                {
                  data: [22, 8, 14, 22, 36, 12, 16, 18, 36, 12],
                  name: "RX#10",
                  curve: "linear",
                  label: "RX#10",
                },
                {
                  data: [26, 4, 14, 20, 20, 4, 6, 24, 42, 4],
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
        </div>
      </div>
    </>
  );
};

export default Fetch;
