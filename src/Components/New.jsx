import React from "react";
import "./styles.css";
import axios from "axios";

const New = () => {
  const handleSubmit = () => {
    // event.preventDefault();

    const apiURL =
      "https://ap-south-1.aws.data.mongodb-api.com/app/data-ckqiw/endpoint/data/v1/action/findOne";
    const apiKeey =
      "F70QwGblFVQJIoXQzhbqQotwUmmFMlds6Rl6J8FNLzB1RmK4ytSnoYxfRtXsO2dy";
    const postData = {
      collection: "stats",
      database: "health",
      dataSource: "Cluster0",
      filter: { UR: 27147 },
    };
    axios
      .post(apiURL, postData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": apiKeey,
        },
      })
      .then((response) => {
        console.log("Post request successful:", response.data);
        // Reset the form after successful submission
        // setPostData({ name: "", description: "" });
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
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

          {/* <Link to="/test" className="hero-button">
            <p className="mr-2">Get Started</p>
            <i className="fa-solid fa-arrow-right "></i>
          </Link> */}
        </div>
      </div>
      <div className="rightDiv">
        <div className="card2">
          <h1 className="title2">Enter the following Details</h1>
          <div className="inputGroup2">
            <label for="Age">Patient ID :</label>
            <input type="email" placeholder="Enter Patient ID" id="email" />
          </div>

          <button className="button-292" onClick={handleSubmit}>
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default New;
