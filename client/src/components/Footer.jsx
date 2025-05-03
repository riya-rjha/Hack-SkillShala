import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <AppBar position="static" className="footer">
        <Toolbar className="toolbar">
        <Button className="nav-button">Skill Assessment</Button>
        <Button className="nav-button">Skill Assessment</Button>
        <Button className="nav-button">Skill Assessment</Button>
        <Button className="nav-button">Skill Assessment</Button>
      </Toolbar>
    </AppBar>
    </>
    
    
  );
};

export default Footer;
