import Hamburger from "./Hamburger";
import "./Header.css";

export default function Header({showSidebar}) {

  return (
    <>
        <div className="top_navbar">
          <Hamburger onClick={showSidebar}/>
          <div className="top_menu">
            <div className="logo">
              {/* <img src="logos/New logo.png" /> */}
            </div>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-search"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-bell"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-user"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
    </>
  );
}
