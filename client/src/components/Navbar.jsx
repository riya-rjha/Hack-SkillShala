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
  Avatar,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const navItems = ["About Us", "Services", "Roadmap"];

  // Drawer toggle for mobile
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Open profile menu
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close profile menu
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  // Logout function
  const handleLogout = () => {
    // Clear token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    handleProfileClose();
    navigate("/"); // redirect to login page
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#6b55b1" }}>
        <Toolbar>
          {/* Left - Logo & Company Name */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                border: "2px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <img
                src="./assets/Image1.png"
                alt="Logo"
                style={{ width: 30, height: 30, borderRadius: "50%" }}
              />
            </Box>
            <Typography variant="h6" sx={{ color: "white" }}>
              SkillShala
            </Typography>
          </Box>

          {/* Center - Nav Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, flexGrow: 2, justifyContent: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  color="inherit"
                  component={Link}
                  to={`/${item.replace(/\s/g, "").toLowerCase()}`}
                >
                  {item}
                </Button>
              ))}
              <Button
                  key={"test-setup"}
                  color="inherit"
                  component={Link}
                  to={`/test-setup`}
                >
                  TEST
                </Button>
            </Box>
          )}

          {/* Right - Login / Profile */}
          <Box>
            {!username ? (
              <Button
                variant="contained"
                color="#18e4c7"
                component={Link}
                to="/login"
              >
                Student Login
              </Button>
            ) : (
              <>
                {!isMobile ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32 }}>
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography sx={{ color: "white" }}>{username}</Typography>
                    <Button
                      variant="outlined"
                      sx={{ color: "white", borderColor: "white" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Box>
                ) : (
                  <IconButton color="inherit" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                  </IconButton>
                )}
              </>
            )}
          </Box>
        </Toolbar>

        {/* Drawer for Mobile Menu */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <List>
              {navItems.map((text) => (
                <ListItem
                  button
                  key={text}
                  component={Link}
                  to={`/${text.replace(/\s/g, "").toLowerCase()}`}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}

              {!username ? (
                <ListItem button component={Link} to="/login">
                  <ListItemText primary="Student Login" />
                </ListItem>
              ) : (
                <>
                  <ListItem>
                    <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32, mr: 1 }}>
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                    <ListItemText primary={username} />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </>
  );
};

export default Navbar;
