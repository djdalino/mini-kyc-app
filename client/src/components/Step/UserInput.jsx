import React, { useState, useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
import axios from "axios";
const UserInput = () => {
  const { count, setCount } = useContext(HeaderContext);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    const { first_name, last_name, email } = user;
    e.preventDefault();
    if (first_name === "" || last_name === "" || email === "null") {
      console.log("Fill the form");
    } else {
      try {
        // const local = "http://localhost:5000";
        const data = {
          first_name: first_name,
          last_name: last_name,
          email: email
        };
        const res = await axios.post(`/api/user`, data);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setCount(count + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mx-auto my-5 px-3" style={{ maxWidth: "375px" }}>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              id="first_name"
              value={user.first_name}
              onChange={onChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              id="last_name"
              value={user.lastname}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email_address">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email_address"
            value={user.email}
            onChange={onChange}
            placeholder="john@gmail.com"
          />
        </div>
        <div className="d-flex align-items-center justify-content-center mt-5">
          <button type="submit" className="btn btn-lg px-5 btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInput;
