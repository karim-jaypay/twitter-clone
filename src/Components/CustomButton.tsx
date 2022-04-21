import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import React, { ReactNode } from "react";

interface IButton {
  variant?: "text" | "outlined" | "contained" | undefined;
  children: ReactNode;
  onClick?: React.MouseEventHandler;
  sx?: any;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const CustomButton = ({
  variant,
  children,
  onClick,
  sx,
  type,
  disabled,
}: IButton) => {
  const CButton = styled(Button)(`
    font-weight: bold;
    width: 400px;
    padding: 15px;
    border-radius: 30px;
    background-color: ${
      variant ? "transparent" : "rgb(29, 155, 240)"
    } !important;
    color: ${variant ? "rgb(29, 155, 240)" : "white"};
    border: ${variant && "1px solid rgb(207, 217, 222)"};
    `);
  return (
    <CButton
      type={type}
      sx={sx}
      variant={variant ? variant : "contained"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </CButton>
  );
};

export default CustomButton;
