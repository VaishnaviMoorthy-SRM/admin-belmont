import React from 'react';
import './styles.css';

const New = () => {
    return (
      <div className="container">
        <div className="leftDiv">
{/*         
        <div className=" left-side-gradient-div"> </div>
        <div className=" right-side-gradient-div"> </div> */}
        <div className="hero-div2">
          <h1 className="hero-title2">
            Your Mental <br></br> Health Matters
          </h1>
          <h3 className=" hero-text2">Rediscover Happiness</h3>
          <h2 className="hero-desc2">
            At Belmont Private Hospital, we proudly provide evidence-based
            mental health treatment delivered by an experienced team of
            healthcare professionals. <br/>We’re here to help with inpatient and day
            therapy treatment options to help you or a loved one with their
            mental health recovery.
          </h2>

          {/* <Link to="/test" className="hero-button">
            <p className="mr-2">Get Started</p>
            <i className="fa-solid fa-arrow-right "></i>
          </Link> */}
      
      </div>
        </div>
        <div className="rightDiv">
        
        <div className="card2">
          <h1 className="title2">
            Enter the following Details
          </h1>
          <div className="inputGroup2">
          <label for="Age">Patient ID :</label>
          <input type="email" placeholder="Enter Patient ID" id="email"/>
        </div>
        
        <button className="button-292"><span>Submit</span></button>
        </div>
      </div>
        </div>);
  }
  
  export default New;