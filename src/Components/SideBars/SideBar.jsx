import { useTranslation } from "../../auto-il8n";
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

export default function SideBar({
  style,
  ...props
}) {
  const {
    t
  } = useTranslation();
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
  return <aside style={style} {...props}>
      <div className="sidebar-links">
        <span className={`nav-pop-box side-pop-box`}>
          <small onClick={() => handleBox()}>{t("services")}{" "}
            {showServices == true ? <Icon name="LuChevronUp" /> : <Icon name="LuChevronDown" />}
          </small>
          <div className={`${showServices ? "side-open" : "side-close"}`}>
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

        <span className={`nav-pop-box side-pop-box`}>
          <small onClick={() => handleResouce()}>{t("resources")}{" "}
            {showResouces == true ? <Icon name="LuChevronUp" /> : <Icon name="LuChevronDown" />}
          </small>
          <div className={`${showResouces ? "side-open" : "side-close"}`}>
            <Link>{t("about_us")}</Link>
            <Link>{t("faqs")}</Link>
            <Link>{t("help")}</Link>
          </div>
        </span>

        <Link>{t("blog")}</Link>
        <Link>{t("contact_us")}</Link>
      </div>
      <div className="user-links">
        <Link to="/login/">{t("login")}</Link>
        <Link to="/signup/country/">{t("get_started_for_free")}</Link>
      </div>
    </aside>;
}