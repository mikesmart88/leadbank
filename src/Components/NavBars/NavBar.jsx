import React, { useState } from "react";
import { Link } from "react-router";
import CustomImage from "../Images/CustomImage";
import CustomButton from "../Buttons/CustomButtons";
import Icon from "../Icons/Icon";
import { routeConfig } from "../../Routers/routeconfig";
import { useLocation } from "react-router";
import CustomNavLinks from "../Links/CustomNavLinks";
import SideBar from "../SideBars/SideBar";

import icon from '../../assets/images/another-icon.png';

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function NavBar({ style, ...props }) {
  const location = useLocation();

  const [sidebar, setSideBar] = useState(false);

  const handleSideBar = () => {
    if (sidebar == true) {
      setSideBar(false)
    }
    else{
      setSideBar(true)
    }
  }

  const normalizePath = (path) => path.replace(/\/$/, ""); // remove trailing slash
  const currentRoute = routeConfig.find(
    (route) => normalizePath(location.pathname) === normalizePath(route.path),
  );

  return (
    <header style={style} {...props}>
      <nav>
        <div className="nav-link-holder">
          <Link className="logo">
            <CustomImage
              source={icon}
              altText="lead bank logo"
              className="icon"
            />
            <small>Leadbank</small>
          </Link>
          <div className="nav-links">
            <span className="nav-pop-box">
              <small>
                services <Icon name="LuChevronDown" />
              </small>
              <div>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcCurrencyExchange" />
                  </span>
                  <span className="nav-pop-text">
                    <small>Personal Banking</small>{" "}
                    <small>Manage, save and anylize your money</small>
                  </span>
                </Link>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcDepartment" />
                  </span>
                  <span className="nav-pop-text">
                    <small>Business Banking</small>{" "}
                    <small>Manage your business finances easily</small>
                  </span>
                </Link>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcMoneyTransfer" />
                  </span>
                  <span className="nav-pop-text">
                    <small>Loans & Credit</small>{" "}
                    <small>Smart lending solutions for modern business needs</small>
                  </span>
                </Link>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcSimCardChip" />
                  </span>
                  <span className="nav-pop-text">
                    <small>Cards</small>{" "}
                    <small>Secure cards for everyday payments everywhere</small>
                  </span>
                </Link>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcDonate" />
                  </span>
                  <span className="nav-pop-text">
                    <small>Grants & Aids</small>{" "}
                    <small>Helping individuals & business through funding and assistance</small>
                  </span>
                </Link>
              </div>
            </span>

            <span className="nav-pop-box">
              <small>
                Resources <Icon name="LuChevronDown" />
              </small>
              <div>
                <Link>About Us</Link>
                <Link>FAQs</Link>
                <Link>Help</Link>
              </div>
            </span>

            <Link>Blog</Link>
            <Link>Contact Us</Link>
          </div>
        </div>
        <div className="user-links">
          <Link to="/login/">Login</Link>
          <Link to="/signup/country/">Get started for free</Link>
        </div>
        <CustomButton className="sidebar-menu" onClick={() => handleSideBar()} >
          {sidebar == true ? <Icon name="IoClose" /> : <Icon name="LuMenu" />}
        </CustomButton>
      </nav>
      <SideBar className={`sidebar ${sidebar == true ? "sidebar-open" : ""}`} />
    </header>
  );
}
