import { useTranslation } from "../../auto-il8n";
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

export default function NavBar({
  style,
  ...props
}) {
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const [sidebar, setSideBar] = useState(false);
  const handleSideBar = () => {
    if (sidebar == true) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
  };
  const normalizePath = path => path.replace(/\/$/, ""); // remove trailing slash
  const currentRoute = routeConfig.find(route => normalizePath(location.pathname) === normalizePath(route.path));
  return <header style={style} {...props}>
      <nav>
        <div className="nav-link-holder">
          <Link className="logo">
            <CustomImage source={icon} altText="lead bank logo" className="icon" />
            <small>{t("leadbank")}</small>
          </Link>
          <div className="nav-links">
            <span className="nav-pop-box">
              <small>{t("services")}<Icon name="LuChevronDown" />
              </small>
              <div>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcCurrencyExchange" />
                  </span>
                  <span className="nav-pop-text">
                    <small>{t("personal_banking")}</small>{" "}
                    <small>{t("manage_save_and_anylize_your_money")}</small>
                  </span>
                </Link>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcDepartment" />
                  </span>
                  <span className="nav-pop-text">
                    <small>{t("business_banking")}</small>{" "}
                    <small>{t("manage_your_business_finances_easily")}</small>
                  </span>
                </Link>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcMoneyTransfer" />
                  </span>
                  <span className="nav-pop-text">
                    <small>{t("loans_credit")}</small>{" "}
                    <small>{t("smart_lending_solutions_for_modern_business_needs")}</small>
                  </span>
                </Link>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcSimCardChip" />
                  </span>
                  <span className="nav-pop-text">
                    <small>{t("cards")}</small>{" "}
                    <small>{t("secure_cards_for_everyday_payments_everywhere")}</small>
                  </span>
                </Link>
                <Link>
                  {" "}
                  <span>
                    <Icon name="FcDonate" />
                  </span>
                  <span className="nav-pop-text">
                    <small>{t("grants_aids")}</small>{" "}
                    <small>{t("helping_individuals_business_through_funding_and_assistance")}</small>
                  </span>
                </Link>
              </div>
            </span>

            <span className="nav-pop-box">
              <small>{t("resources")}<Icon name="LuChevronDown" />
              </small>
              <div>
                <Link>{t("about_us")}</Link>
                <Link>{t("faqs")}</Link>
                <Link>{t("help")}</Link>
              </div>
            </span>

            <Link>{t("blog")}</Link>
            <Link>{t("contact_us")}</Link>
          </div>
        </div>
        <div className="user-links">
          <Link to="/login/">{t("login")}</Link>
          <Link to="/signup/country/">{t("get_started_for_free")}</Link>
        </div>
        <CustomButton className="sidebar-menu" onClick={() => handleSideBar()}>
          {sidebar == true ? <Icon name="IoClose" /> : <Icon name="LuMenu" />}
        </CustomButton>
      </nav>
      <SideBar className={`sidebar ${sidebar == true ? "sidebar-open" : ""}`} />
    </header>;
}