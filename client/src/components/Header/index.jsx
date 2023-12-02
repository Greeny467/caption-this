import Hamburger from "./Hamburger";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
// import { TextField } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";
import {useState} from "react";
import Auth from '../../utils/auth';

import Login from '../login';

export default function Header({ showSidebar }) {

  const userLoggedIn = Auth.loggedIn();


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
              <Link to="/Dashboard">
                <PersonIcon className="icon" />
              </Link>
            </li>}
          </ul>
          <Hamburger onClick={showSidebar} />

        </div>
      </div>
    </>
  );
}
