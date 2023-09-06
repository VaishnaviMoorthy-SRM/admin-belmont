import { useState } from "react";
import Fetch from "./patient/fetch";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Pgraph from "./patient/pgraph";
import NavBar from "./Components/NavBar";
import { Outlet, useParams } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Fetch />} />
          {/* Display Fetch on the homepage */}
          <Route
            path="/patient/:patientID"
            element={<NewComponentWithPatientID />}
          />
        </Routes>
      </Router>
    </>
  );
}

function NewComponentWithPatientID() {
  const { patientID } = useParams();
  return <Pgraph patientID={patientID} />;
}

export default App;
