import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Outlet, useNavigate } from "react-router-dom";

import "./rootLayoutStyle.css";
import profileImg from "../../../assests/images/Ellipse 58.png";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import { ArrowBack } from "@mui/icons-material";
import { Layout } from "./layout";
import { useEffect } from "react";
import useDebounceEffect from "../../../hooks/useDebounced";
import Logo from "../../../assests/images/connexLogo.png"

const drawerWidth = 280;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function RootLayout() {
  const [anchorEl, setAnchorEl] = useState(false);
  const navigate = useNavigate();
  //setting adming and user routes

  const [openDrawer, setOpenDrawer] = useState(window.innerWidth > 1100);
  const [mobileDrawer,setMobileDrawer] = useState(false)

  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleMobileDrawer=()=>{
    setMobileDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  //to show dropdown lists

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(false);
  };

  const handleRedirect = () => {
    setAnchorEl(false);

    setTimeout(() => {
      navigate("/dashboard/editProfile");
    }, 300);
  };

  const handleLogOut = () => {
    sessionStorage.clear("ur");
    sessionStorage.clear("roles");
    navigate("/");
  };
  useEffect(() => {
    const onResize = (val) => {
      if (window.innerWidth < 1100) {
        {
          openDrawer && setOpenDrawer(false);
        }
      } else {
        {
          openDrawer && setOpenDrawer(true);
        }
      }
    };
    const debounce = (fn, delay) => {
      let timerId;
      return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...args), delay);
      };
    };

    window.addEventListener("resize", debounce(onResize, 500));

    return () => {
      window.removeEventListener("resize", debounce(onResize, 500));
    };
  }, [openDrawer]);

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        open={openDrawer}
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              position: "relative",
              color: "black",
              left: openDrawer ? "0px" : "50px"
              
            }}
            className="backarrow webmenuIcon"
          >
            {openDrawer ? (
              <MenuIcon style={{ color: "black" }} />
            ) : (
              <ArrowBack 
              
                className="backarrow"
              />
            )}
          </IconButton>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleMobileDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              position: "relative",
              color: "black",
            }}
            className="backarrow mobilemenuicon"
          >
            {/* {mobileDrawer ? (
              <ArrowBack
                className="backarrow"
              />
              ) : (
              <MenuIcon style={{ color: "black" }} />
            )} */}
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          {/* <img src={Logo} className=" mobilelogo" style={{ width: "25%",height:"15%",borderRadius:"50%" }} /> */}
          <Avatar
            alt="Profile Logo"
            src={profileImg} // Replace with the path to your profile logo image
            sx={{
              width: "60px",
              height: "60px",
              marginLeft: "auto",
              cursor: "pointer",
            }} // Adjust the margin as needed
            onClick={handleProfileClick}
          />
          <Menu
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            sx={{ borderRadius: "10px" }}
            open={anchorEl}
          >
            <MenuItem
              onClick={handleRedirect}
              sx={{
                "&:hover": {
                  backgroundColor: "#c4cdd5",
                  fontSize: "16px !important",
                },
              }}
            >
              <PermIdentityIcon
                sx={{ marginRight: "10px", fontSize: "20px" }}
              />
              Edit Profile
            </MenuItem>
           
            <MenuItem
              onClick={handleLogOut}
              sx={{
                "&:hover": {
                  backgroundColor: "#c4cdd5",
                  fontSize: "16px !important",
                },
              }}
            >
              <LogoutIcon sx={{ fontSize: "20px", marginRight: "10px" }} />
              Sign Out
            </MenuItem>
            {/* Add more menu items as needed */}
          </Menu>
        </Toolbar>
      </AppBar>
      {/* <Layout /> */}
      {/* <div style={{position:"relative"}}> */}
      <Layout openDrawer={openDrawer}  openmobileDrawer={mobileDrawer} setOpenMobileDrawer={setMobileDrawer}/>
      <span
        className={openDrawer?"outletcontainer opendrawer":"outletcontainer closedrawer"}
      >
        <Outlet />
      </span>

      {/* </div> */}
    </Box>
  );
}
