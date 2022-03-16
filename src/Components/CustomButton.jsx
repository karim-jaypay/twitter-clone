import { Button } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'



const CustomButton = ({ variant, children, onClick, sx, href, type }) => {

    const CButton = styled(Button)(`
    font-weight: bold;
    width: 400px;
    padding: 15px;
    border-radius: 30px;
    background-color: ${variant ? "transparent" : "rgb(29, 155, 240)"} !important;
    color: ${variant ? "rgb(29, 155, 240)" : "white"};
    border: ${variant && "1px solid rgb(207, 217, 222)"};
    `)
  return (
    <CButton type={type} sx={sx} variant={variant ? variant : "container"} onClick={onClick} href={href}>{children}</CButton>
  )
}

export default CustomButton