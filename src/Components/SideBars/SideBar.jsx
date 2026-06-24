import React, { useState } from "react";
import { Link } from "react-router";
import CustomImage from "../Images/CustomImage";
import CustomButton from "../Buttons/CustomButtons";
import Icon from "../Icons/Icon";
/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function SideBar({ style, ...props }) {
  const [showServices, setShowServices] = useState(false);
  const [showResouces, setShowResouces] = useState(false);

  const handleBox = () => {
    if (showServices == true) {
      setShowServices(false);
    } else {
      setShowServices(true);
    }
  };

  const handleResouce = () => {
    if (showResouces == true) {
      setShowResouces(false);
    } else {
      setShowResouces(true);
    }
  };

  return (
    <aside style={style} {...props}>
      <div className="sidebar-links">
        <span className={`nav-pop-box side-pop-box`}>
          <small onClick={() => handleBox()}>
            services{" "}
            {showServices == true ? (
              <Icon name="LuChevronUp" />
            ) : (
              <Icon name="LuChevronDown" />
            )}
          </small>
          <div className={`${showServices ? "side-open" : "side-close"}`}>
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
                <small>
                  Helping individuals & business through funding and assistance
                </small>
              </span>
            </Link>
          </div>
        </span>

        <span className={`nav-pop-box side-pop-box`}>
          <small onClick={() => handleResouce()}>
            Resources{" "}
            {showResouces == true ? (
              <Icon name="LuChevronUp" />
            ) : (
              <Icon name="LuChevronDown" />
            )}
          </small>
          <div className={`${showResouces ? "side-open" : "side-close"}`}>
            <Link>About Us</Link>
            <Link>FAQs</Link>
            <Link>Help</Link>
          </div>
        </span>

        <Link>Blog</Link>
        <Link>Contact Us</Link>
      </div>
      <div className="user-links">
        <Link to="/login/">Login</Link>
        <Link to="/signup/country/">Get started for free</Link>
      </div>
    </aside>
  );
}
