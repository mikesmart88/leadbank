import { useTranslation } from "../../auto-il8n";
import React, { useState } from "react";
import { Link } from "react-router";
import CustomImage from "../Images/CustomImage";
import CustomButton from "../Buttons/CustomButtons";
import Icon from "../Icons/Icon";
import { routeConfig } from "../../Routers/routeconfig";
import { useLocation, useNavigate } from "react-router";
import CustomNavLinks from "../Links/CustomNavLinks";
import ReactCountryFlag from "react-country-flag";
import { useData } from "../../hooks/UseData";
import icon from "../../assets/images/leadbank-icon.png";
export default function Footer({
  style,
  className,
  ...props
}) {
  const {
    t
  } = useTranslation();
  const {
    supportData
  } = useData();
  const navigate = useNavigate();
  console.log(supportData?.support);
  const addresses = [{
    location: "United State",
    flagcode: "US",
    address: " Lead Comunity Bank, 609 North board street, middletown, deleware"
  }, {
    location: "United Kingdom",
    flagcode: "GB",
    address: " 65 Charlotte Road, Hackney, London EC2A 3PE, United Kingdom"
  }, {
    location: "Eygpt",
    flagcode: "EG",
    address: " Lead Bank, 3 Saraya Street, Zamalek, Cairo Governorate 11211, Egypt"
  }, {
    location: "Malaysia",
    flagcode: "MY",
    address: " 42 Jalan Sultan Ahmad Shah, 10050 George Town, Penang, Malaysia"
  }];
  return <footer style={style} className={className} {...props}>
      <nav className="top-footer-data">
        <div className="linksHolder">
          <h4 className="logo">
            <CustomImage source={icon} />{t("leadbank")}</h4>
          <Link>{t("contact_us")}</Link>
          <Link>{t("privacy_policy")}</Link>
          <Link>{t("terms_conditions")}</Link>
          <Link>{t("community_guildlines")}</Link>
        </div>
        <div className="linksHolder">
          <p className="logo">{t("services")}</p>
          <Link>{t("business_banking")}</Link>
          <Link>{t("loans_credit")}</Link>
          <Link>{t("virtual_cards")}</Link>
          <Link>{t("grants_aids")}</Link>
        </div>
        <div className="linksHolder">
          <p className="logo">{t("support")}</p>
          <Link>{t("about_us")}</Link>
          <Link>{t("faqs")}</Link>
          <Link>{t("blogs")}</Link>
          <Link>{t("help_community")}</Link>
        </div>
        <div className="linksHolder socials">
          <span className="foot-social-icon">
            <Link>
              <Icon name="IoLogoInstagram" />
            </Link>
            <Link>
              <Icon name="IoLogoTwitter" />
            </Link>
            <Link>
              <Icon name="IoLogoLinkedin" />
            </Link>
            <Link>
              <Icon name="IoLogoFacebook" />
            </Link>
          </span>
          <Link to={`tel:${supportData.support?.supportPhone}`}>{supportData.support?.supportPhone}</Link>
          <CustomButton onClick={() => {
          window.location.href = supportData.support?.chatLink;
        }}>
            <Icon name="IoLogoWhatsapp" />{t("chat_on_whatsapp")}</CustomButton>
          <Link to={`mailto:${supportData.support?.supportEmail}`}>{supportData.support?.supportEmail}</Link>
        </div>
      </nav>
      <div className="address-data">
        {addresses.map((address, index) => <div key={index} className="company-address">
            <p>{address.location}</p>
            <small>
                <ReactCountryFlag countryCode={address.flagcode} svg />
                {address.address}
            </small>
          </div>)}
      </div>
      <p className="copyright">
        <Icon name="LuCopyright" />{t("2026_lead_community_bank_inc")}</p>
      <div className="footer-glow">
        <h2>{t("go_global_with_leadbank")}</h2>
      </div>
    </footer>;
}