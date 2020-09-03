import React, { useState, useEffect } from "react";
import Hero from "../Hero/Hero";
import axios from "axios";
import { Link } from "react-router-dom";
const UserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await axios.get(`/api/user`);
    setData(res.data);
  };
  if (data.length === 0)
    return (
      <React.Fragment>
        <Hero data="List of user" />
        <h2 className="text-center mt-5">No data found...</h2>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <Hero data="List of user" />
      <div className="container mt-5">
        <table className="table table-responsive table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, id) => {
              return (
                <tr key={id}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/view/${item._id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
            {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default UserList;
