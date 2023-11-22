import Hamburger from "./Hamburger";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import "./Header.css";

export default function Header({showSidebar}) {

  return (
    <>
        <div className="top_navbar">
          <div className="top_menu">
            <div className="logo">
              {/* <img src="logos/New logo.png" /> */}
            </div>
            <ul>
              <li>
                <a href="#"><NotificationsActiveIcon className="icon"/>
                </a>
              </li>
              <li>
                <a href="#"><PersonIcon className="icon"/>
                </a>
              </li>
            </ul>
          </div>
          <Hamburger onClick={showSidebar}/>
        </div>
    </>
  );
}
