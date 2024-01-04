import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import { Select } from "antd";
import Dropzone from "react-dropzone";


const Addproduct = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "", // Thêm trường fullName
      email: "", // Trường email
      password: "", // Trường password
    },
    validationSchema: yup.object({
      fullName: yup.string().required("Full Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Gửi dữ liệu hoặc xử lý dữ liệu ở đây
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Account</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Full Name"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          <div className="error">
            {formik.touched.fullName && formik.errors.fullName}
          </div>

          <CustomInput
            type="email"
            label="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>

          <CustomInput
            type="password"
            label="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;


