import Hamburger from "./Hamburger";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
// import { TextField } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Auth from '../../utils/auth';
// import { useQuery } from '@apollo/client';
// import { GET_ME } from '../../utils/queries';


import Login from '../login';

export default function Header({ showSidebar }) {

  const userLoggedIn = Auth.loggedIn();

  const userData = Auth.getProfile() && Auth.getProfile().data

  return (
    <>
      <div className="top_navbar">
        <div className="top_menu">
          <Login/>
          {/* <div id="searchFormPad"></div> */}
          {/* <TextField id="searchForm" label="Search" variant="outlined" /> */}
          <ul>
            {/* <li>
              <a href="#">
                <NotificationsActiveIcon className="icon" />
              </a>
            </li> */}
            {userLoggedIn && <li>
              <Link to={`/Dashboard/${userData && userData._id}`}>
                <PersonIcon className="icon" /><p>{userData && userData.username}'s Profile</p>
              </Link>
            </li>}
          </ul>
          <Hamburger onClick={showSidebar} />

        </div>
      </div>
    </>
  );
}
