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
import logo from '../../assets/logos/captionlogo.png';


import Login from '../login';

export default function Header({ showSidebar }) {
  const [user, setUser] = useState(undefined);

  const userLoggedIn = Auth.loggedIn();

  useEffect(() => {
    if(userLoggedIn) {
      setUser(Auth.getProfile() && Auth.getProfile().data);
    };
  }, [userLoggedIn]);

  return (
    <>
      <div className="top_navbar">
        <div className="top_menu">
          <Login/>
          <Link to={'/'}><img className="logo" src={logo} alt="" /></Link>
          {/* <div id="searchFormPad"></div> */}
          {/* <TextField id="searchForm" label="Search" variant="outlined" /> */}
          <ul>
            {/* <li>
              <a href="#">
                <NotificationsActiveIcon className="icon" />
              </a>
            </li> */}
            {userLoggedIn && <li>
              <Link to={`/Dashboard/${user && user._id}`}>
                <PersonIcon className="icon" /><p>{user && user.username}'s Profile</p>
              </Link>
            </li>}
          </ul>
          <Hamburger onClick={showSidebar} />

        </div>
      </div>
    </>
  );
}
