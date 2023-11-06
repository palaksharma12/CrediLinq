import React, { Fragment, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import '../css/DisplayUser.css'

const DisplayUser = (id) => {
  const {company_uen} = useParams();
  const [name, setName] = useState("");
  const [filename, setFilename] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/${company_uen}`);
      const jsonData = await response.json();

      setName(jsonData.company_name);
      setFilename(jsonData.file_name);

      console.log(filename)
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUser();
  });
  
  const file = process.env.PUBLIC_URL + `/uploads/${filename}`;
  console.log(file);
  return (
    <Fragment>
      <div className="container mt-0 ">
      <table class="table text-center">
        <thead>
          <tr>
            <th>Company UEN</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
            <tr key={company_uen}>
              <td>{company_uen}</td>
              <td>
                {name}
              </td>
            </tr>
        </tbody>
      </table>
      <iframe src = {file} width="100%" height="800vh"/>
      </div>

    </Fragment>
  );
};

export default DisplayUser;