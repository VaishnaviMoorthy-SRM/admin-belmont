import "./styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
const New = () => {
  const [Patient, setPatientId] = useState("");
  const [isCalled, setIsCalled] = useState(false);
  const [apiOutput, setModelOutput] = useState({});

  let Patientstat = { age: 0, rmt: 0.0, dep: 0 };
  let modelOutput = { RX: 0, final_depression: 0, no_of_session: 0 };
  const handlePatientID = (e) => {
    setPatientId(e.target.value);
  };

  const handleSubmit = async () => {
    let arg = Patient;
    // let Patientstat = { age: 0, rmt: 0.0, dep: 0 };
    const apiURL = `https://us-east-1.aws.data.mongodb-api.com/app/application-0-erzts/endpoint/find?arg1=${arg}`;
    console.log(Patient);
    await axios
      .get(apiURL)
      .then((response) => {
        // console.log("Get request successful:", response.data);
        // Reset the form after successful submission
        Patientstat["age"] = response.data["AGE"];
        Patientstat["rmt"] = response.data["RMT %"];
        Patientstat["dep"] = response.data["Depression"];
        console.log("first call to database", Patientstat);
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
    // const modelURL = `https://rtms-sitting-predictions-production.up.railway.app/god?age=${Patientstat["age"]}&rmt=${Patientstat["rmt"]}&dep=${Patientstat["dep"]}`;
    const modelURL = `http://127.0.0.1:5000/god?age=${Patientstat["age"]}&rmt=${Patientstat["rmt"]}&dep=${Patientstat["dep"]}`; // testing URl

    await axios
      .get(
        modelURL,
        (Headers = {
          "Access-Control-Allow-Origin": "*",
        })
      )
      .then(async (response) => {
        // console.log("Get request successful:", response.data);
        modelOutput["RX"] = response.data["RX#10"];
        modelOutput["final_depression"] = response.data["final_depression"];
        modelOutput["no_of_session"] = response.data["no_of_session"];
        console.log("second call to model", modelOutput);
        await setModelOutput(modelOutput);
        console.log("usestate data", apiOutput);
        // Reset the form after successful submission
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });

    setIsCalled(true);
  };

  return (
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
            We’re here to help with inpatient and day therapy treatment options
            to help you or a loved one with their mental health recovery.
          </h2>
        </div>
      </div>
      <div className="rightDiv">
        {isCalled ? (
          <div>
            <h1 className="title2">RX#10 : {}</h1>
            <h1 className="title2">Final Depression : {}</h1>
            <h1 className="title2">No of Sessions : {}</h1>
          </div>
        ) : (
          <div className="card2">
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
        )}
      </div>
    </div>
  );
};

export default New;
