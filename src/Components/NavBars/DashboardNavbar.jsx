import React, { useState } from "react";
import { Link } from "react-router";
import CustomImage from "../Images/CustomImage";
import CustomButton from "../Buttons/CustomButtons";
import Icon from "../Icons/Icon";
import { routeConfig } from "../../Routers/routeconfig";
import { useLocation } from "react-router";
import CustomNavLinks from "../Links/CustomNavLinks";
import { FaWhatsapp } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import { useData } from "../../hooks/UseData";
import { useNavigate } from "react-router";
import { useAlert } from "../../contexts/AlertContext";
import { useLoader } from "../../contexts/LoaderContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { MediaUrl } from "../../../env.config";

import icon from "../../assets/images/another-icon.png";
import { IoLogoWhatsapp } from "react-icons/io";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function DashboardNavbar({ style, className, ...props }) {
  const { userdata, supportData } = useData();
  const { logout } = useContext(AuthContext);
  const { showLoader } = useLoader();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const [visible, setvisible] = useState(false);

  const handleLogout = () => {
    showLoader();
    logout();
    showAlert({ type: "info", message: "Successfully loged out" });
    navigate("/login/");
  };

  return (
    <header className={className} style={style} {...props}>
      <nav>
        <Link className="dlogo">
          <CustomImage source={icon} altText="leadbank icon image" />
        </Link>

        <div className="dashboard-links">
          <Link to={supportData?.support.chatLink} className="normal-link setting">
            <IoLogoWhatsapp size={18} style={{ fill: "#06a742" }} />
          </Link>
          <Link className="normal-link whatsapp-chat">
            <Icon name="LuSettings" />
          </Link>
          <div className="profile-menu-dropdown">
            {userdata?.avatarUrl ? (
              <CustomImage source={`${MediaUrl}${userdata?.avatarUrl}`} />
            ) : userdata?.first_name && userdata?.last_name !== "" ? (
              <span className="profile-text">
                {getInitials(userdata?.first_name, userdata?.last_name)}
              </span>
            ) : (
              <CustomImage source="https://i.near.social/magic/large/https://near.social/magic/img/account/null" />
            )}
            {visible ? (
              <Icon name="IoClose" onClick={() => setvisible(false)} />
            ) : (
              <Icon name="LuMenu" onClick={() => setvisible(true)} />
            )}

            {visible && (
              <aside className="menu-dropdown-box">
                <div className="profile-card" onClick={() => {navigate("/dashboard/"), setvisible(false)}}>
                  {userdata?.avatarUrl ? (
                    <CustomImage source={`${MediaUrl}${userdata?.avatarUrl}`} />
                  ) : userdata?.first_name && userdata?.last_name !== "" ? (
                    <span className="profile-text">
                      {getInitials(userdata?.first_name, userdata?.last_name)}
                    </span>
                  ) : (
                    <CustomImage source="https://i.near.social/magic/large/https://near.social/magic/img/account/null" />
                  )}

                  <span className="profile-popup">
                    <strong>
                      {userdata?.first_name || "John"}{" "}
                      {userdata?.last_name || "Micheal"}
                    </strong>
                    <small>{userdata?.email}</small>
                  </span>
                </div>
                <div className="drop-down-links-holder">
                  <Link onClick={() => setvisible(false)} to="/accounts/" className="dropdown-link">
                    <Icon name="LuWallet" />
                    My Accounts
                  </Link>
                  <Link to="/payments/" onClick={() => setvisible(false)} className="dropdown-link">
                    <Icon name="LuBanknote" /> Payments
                  </Link>
                  <Link to="/transactions/" onClick={() => setvisible(false)} className="dropdown-link">
                    <Icon name="LuActivity" /> Transactions
                  </Link>
                  <Link to="/card/" onClick={() => setvisible(false)} className="dropdown-link">
                    <Icon name="LuCreditCard" /> Cards
                  </Link>
                  <Link to="/account/statement/" onClick={() => setvisible(false)} className="dropdown-link">
                    <Icon name="LuFileText" /> Reports & Statements
                  </Link>
                  <Link onClick={() => setvisible(false)} className="dropdown-link">
                    <Icon name="LuUsers" /> Community
                  </Link>
                  <span
                    style={{ marginBottom: "0px" }}
                    className="dropdown-link"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <Icon name="LuLogOut" style={{ marginBottom: "0px" }} />{" "}
                    Sign out
                  </span>
                </div>
              </aside>
            )}
          </div>
          <div className="referal-count-show">
            <span className="star">
              <Icon name="LuStar" />
            </span>
            <span>$ 0</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
