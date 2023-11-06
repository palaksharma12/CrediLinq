import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddUser from "./components/AddUser";
import Navbar from "./components/Navbar";
import DisplayUser from "./components/DisplayUser";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<AddUser />} />
            <Route path="/user/:company_uen" element={<DisplayUser />} />
            <Route path="*" element={<AddUser />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  )
}
export default App;