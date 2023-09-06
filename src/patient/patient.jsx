import "../Components/styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Patient = () => {
  const [isCalled, setIsCalled] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [RXD_out, setRXD] = useState([]);
  const [RXA_out, setRXA] = useState([]);
  const [RXS_out, setRXS] = useState([]);
  const [fdep_out, setfdep] = useState("");
  const [fstress_out, setfstress] = useState("");
  const [fanx_out, setfanx] = useState("");
  const [Msco_out, setMsco] = useState("");
  const [ses_out, setses] = useState("");
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    depressionLevel: "",
    stressLevel: "",
    anxietyLevel: "",
    rmtPercentage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAPICall = async () => {
    // Here, you can use the formData object for your API call logic
    // Example: Make an API call with formData


    console.log(formData);
    const modelURL = `http://127.0.0.1:5000/getdata?age=${formData.age}&rmt=${formData.rmtPercentage}&dep=${formData.depressionLevel}&stress=${formData.stressLevel}&anx=${formData.anxietyLevel}`; // testing URl
    await axios
      .get(
        modelURL,
        (Headers = {
          "Access-Control-Allow-Origin": "*",
        })
      )
      .then(async (response) => {
        console.log("Get request successful:", response.data);
        // modelOutput["RX"] = response.data["RX"];
        // modelOutput["final_depression"] = response.data["final_depression"];
        // modelOutput["no_of_session"] = response.data["no_of_session"];
        // console.log("second call to model", modelOutput);

        setRXD(response.data.RXA)
        setRXA(response.data.RXA)
        setRXS(response.data.RXS)
        setfdep(response.data.finald)
        setfstress(response.data.finals)
        setfanx(response.data.finala)
        setses(response.data.no_of_session)
        setMsco(response.data.MADRS)

        setDataFetched(true);
        // Reset the form after successful submission
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
    setIsCalled(true);
  };


  const handleBack = () => {
    setIsCalled(false);
    setDataFetched(false);
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
            <h1 className="title2">RXd : {RXD_out}</h1>
            <h1 className="title2">RXa : {RXA_out}</h1>
            <h1 className="title2">RXs : {RXS_out}</h1>
            <h1 className="title2">fa : {fanx_out}</h1>
            <h1 className="title2">fs : {fstress_out}</h1>
            <h1 className="title2">fd : {fdep_out}</h1>
            <h1 className="title2">madr : {Msco_out}</h1>
            <h1 className="title2">No of Sessions : {ses_out}</h1>
            {/* {dataFetched ? (
              <Graph RXA={RXA_out} RXS={RXS_out} RXD = {RXD_out} len = {ses_out} />
            ) : (
              <p>Data is not available for the graph.</p>
            )} */}
            <button className="button-292" onClick={handleBack}>
              <span>Back</span>
            </button>
          </div>
        ) : (
          <div className="card2">
            <h1 className="title2">Enter the following Details</h1>

            <div className="makeinputcol">
              <div className="inputGroup2">
                <label htmlFor="age">Age :</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="inputGroup2">
                <label htmlFor="gender">Gender :</label>
                <input
                  type="text"
                  placeholder="Enter Gender"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="inputGroup2">
                <label htmlFor="depressionLevel">Depression Level :</label>
                <input
                  type="text"
                  placeholder="Enter Depression Level"
                  id="depressionLevel"
                  name="depressionLevel"
                  value={formData.depressionLevel}
                  onChange={handleChange}
                />
              </div>
              <div className="inputGroup2">
                <label htmlFor="stressLevel">Stress Level :</label>
                <input
                  type="text"
                  placeholder="Enter Stress Level"
                  id="stressLevel"
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleChange}
                />
              </div>
              <div className="inputGroup2">
                <label htmlFor="anxietyLevel">Anxiety Level :</label>
                <input
                  type="text"
                  placeholder="Enter Anxiety Level"
                  id="anxietyLevel"
                  name="anxietyLevel"
                  value={formData.anxietyLevel}
                  onChange={handleChange}
                />
              </div>
              <div className="inputGroup2">
                <label htmlFor="rmtPercentage">RMT % :</label>
                <input
                  type="text"
                  placeholder="Enter RMT Percentage"
                  id="rmtPercentage"
                  name="rmtPercentage"
                  value={formData.rmtPercentage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="button-292" onClick={handleAPICall}>
              <span>Submit</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patient;
