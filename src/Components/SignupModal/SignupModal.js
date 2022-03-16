import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { registerUserFirstStep } from "../../redux/actions";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";

import { years, days, months } from "../../Services/getDates";

import SecondSignup from "../SecondStepSignupModal/SecondSignup";

import logo from "../../public/logo.png";

import "../../Styles/SignupModal.scss";
import CustomButton from "../CustomButton";

function SignupModal({ show, history, onHide, result }) {
  const dispatch = useDispatch();

  // current modal
  const [modal, setModal] = useState(show);
  const onClose = () => {
    setModal(false);
  };

  // second sign up modal
  const [showModal, setShowModal] = useState(false);

  const [email_err, setEmail_err] = useState(false);

  useEffect(() => {
    if (result?.error) {
      setEmail_err(true);
    } /*  else {
      setShowModal(true);
      setModal(false);
    } */
  }, [result]);

  // yup form validation
  const schema = yup.object().shape({
    name: yup.string().required("What's your name?"),
    email: yup.string().email("Invalid email").required("Required"),
    day: yup.number().required("Required"),
    month: yup.string().required(),
    year: yup.number().required(),
  });
  // add user function
  const add_user = (values) => {
    dispatch(registerUserFirstStep(values));
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      month: "",
      day: "",
      year: "",
    },
    validationSchema: schema,
    onSubmit: (values) => add_user(values),
  });
  console.log(result);

  return (
    <>
      <Dialog
        open={modal}
        onClose={onClose}
        fullWidth={600}
        onBackdropClick={onHide}
        PaperProps={{ style: { overflowX: "hidden" } }}
      >
        <DialogTitle className="text-center w-100">
          <Grid container>
            <div
              className="ms-auto"
              style={{ cursor: "pointer" }}
              onClick={() => onHide()}
            >
              X
            </div>

            <img
              className="justify-content-center"
              src={logo}
              alt="twitter"
              style={{
                objectFit: "contain",
                margin: "0 auto",
                paddingRight: "4rem",
              }}
              width={40}
            />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <h2>Create your account</h2>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              style={{ marginBottom: "3%" }}
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              style={{ marginBottom: "3%" }}
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e);
                setEmail_err(false);
              }}
              error={
                formik.touched.email &&
                (Boolean(formik.errors.email) || email_err)
              }
              helperText={
                formik.errors.email
                  ? "required"
                  : email_err && "Email already taken"
              }
            />

            <h2>Date of birth</h2>
            <div>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </div>
            <Grid container spacing={2} style={{ margin: "5% 0" }}>
              <Grid xs={4}>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    name="month"
                    value={formik.values.month}
                    label="Month *"
                    onChange={formik.handleChange}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Day</InputLabel>
                  <Select
                    name="day"
                    onChange={formik.handleChange}
                    value={formik.values.day}
                    label="Day *"
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    name="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                    label="Year *"
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className="text-center">
              <CustomButton type="submit">Continue</CustomButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/*  <SecondSignup
        show={showModal}
        history={history}
        onHide={() => {
          setShowModal(false);
        }}
        data={result.user}
      /> */}
    </>
  );
}

function mapStateToProps(state) {
  const { auth } = state;
  return { result: auth };
}

export default connect(mapStateToProps)(SignupModal);
