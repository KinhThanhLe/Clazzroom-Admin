import React, { useState } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Addproduct = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Clear the error for the changed input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the changed input
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Check fields to ensure they are not empty
    Object.keys(values).forEach((key) => {
      if (!values[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    // If there are errors, display error messages
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // If no errors, handle sending data or any other action here
      const newUser = {
        full_name: values.fullName,
        email: values.email,
        password: values.password,
        role: "admin",
      };
      axios
        .post("http://13.236.44.51:3001/api/users/register", newUser)
        .then((res) => {
          navigate("/admin/list-account");
        })
        .catch((error) => {
        })
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Account</h3>
      <div>
        <form onSubmit={handleSubmit} className="d-flex gap-3 flex-column">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              value={values.fullName}
              style={{ height: "40px" }} // Adjust height as needed
            />
            <div className="error">{errors.fullName}</div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              style={{ height: "40px" }} // Adjust height as needed
            />
            <div className="error">{errors.email}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              style={{ height: "40px" }} // Adjust height as needed
            />
            <div className="error">{errors.password}</div>
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            style={{ background: "green" }}
          >
            Add Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
