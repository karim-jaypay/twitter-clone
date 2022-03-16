import React, { useState } from "react";

import SignupModal from "../Components/SignupModal/SignupModal";

import welcome from "../public/welcome.png";
import logo from "../public/logo.png";
import { Grid } from "@mui/material";
import CustomButton from "../Components/CustomButton";

export default function Welcome(props) {
  const [showModal, setShowModal] = useState(false);

  const togglemodal = () => {
    setShowModal(!showModal);
  };

  //bottom links
  const bottomLinks = [
    "About",
    "Help Center",
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Ads info",
    "Blog",
    "Status",
    "Careers",
    "Brand Resources",
    "Advertising",
    "Marketing",
    "Twitter for Business",
    "Developers",
    "Directory",
    "Settings",
    "@ 2021 Twitter, Inc.",
  ];

  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <img
            src={welcome}
            alt="welcome"
            className="w-100"
            style={{ height: 721, objectFit: "cover" }}
          />
        </Grid>
        <Grid item md={6} p={5}>
          <img
            src={logo}
            alt="twitter"
            width={57}
            height={57}
            style={{ objectFit: "contain" }}
          />

          <h1 style={{ fontSize: 70 }}>Happening now</h1>

          <h2 style={{ fontSize: "35px" }}>Join Twitter today.</h2>

          <Grid item mt={5}>
            <CustomButton onClick={() => setShowModal(true)}>
              Sign up
            </CustomButton>
            <CustomButton
              sx={{ marginTop: 4 }}
              variant={"outlined"}
              href="/login"
            >
              Sign in
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        className="footer_info text-center"
        style={{ color: "grey" }}
        my={2}
      >
        {bottomLinks.map((item, index) => (
          <span
            key={`link${index}`}
            style={{
              margin: "0px 10px 10px 10px",
              cursor: `${index !== bottomLinks.length - 1 && "pointer"}`,
            }}
          >
            {item}
          </span>
        ))}
      </Grid>

      <SignupModal
        key={showModal}
        show={showModal}
        history={props.history}
        onHide={() => togglemodal()}
      />
    </>
  );
}
