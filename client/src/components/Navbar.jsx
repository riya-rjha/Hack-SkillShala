import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = ["About Us", "Services", "Roadmap", "Free Test"];

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          {/* Left - Logo & Company Name */}
          <Box className="logo-section">
            <img src="/logo.png" className="logo" />
            <Typography variant="h6" className="company-name">
              SkillShala
            </Typography>
          </Box>

          {/* Center - Nav Links */}
          {!isMobile && (
            <Box className="nav-links">
              {navItems.map((item) => (
                <Button key={item} className="nav-button">
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {/* Right - Login & Hamburger Menu */}
          <Box className="login-box">
            {!isMobile ? (
              <Link to='/login'>
              <Button variant="contained" className="login-button">
                Student Login
              </Button>
              </Link>
            ) : (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {navItems.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem button>
              <ListItemText primary="Student Login" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
