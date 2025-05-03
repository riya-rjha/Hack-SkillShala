import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import "./MainContent.css";
import Image1 from '../assets/Image1.png';
import Globe from "./Globe";

const MainContent = () => {
  return (
    <Box className="main-container"
    >
      <Grid
        container
        spacing={4}
        sx={{ height: "100%" }}
        alignItems="center"
      >
        {/* Left Side - Text */}
        <Grid item size={{ md: 12, lg: 6 }}>
          <Box>
            <Typography variant="h4" gutterBottom
              className="left-box-content"
            >
              Upskilling, an all-in-one platform for all students, developers &
              job professionals.
            </Typography>
            <Typography variant="body1" paragraph>
              From interactive courses and coding challenges to career guidance
              and project-based learning — everything you need is under one
              roof.
            </Typography>
            <Button variant="contained" sx={{backgroundColor:"#18E4C7"}}>Get Started</Button>
          </Box>
        </Grid>

        {/* Right Side - Image */}
        <Grid item size={{ md: 12, lg: 6 }}>
          {/* <Box
            component="img"
            src={Image1}
            alt="Main Content"
            className="right-box-content"
          /> */}
          <Box sx={{
            height: "31.25rem", width: "100%"
          }}
          className="right-box-content"
          >
            <Globe />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContent;
