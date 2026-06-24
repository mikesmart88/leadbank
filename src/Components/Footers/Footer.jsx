import React, { useState } from "react";
import { Link } from "react-router";
import CustomImage from "../Images/CustomImage";
import CustomButton from "../Buttons/CustomButtons";
import Icon from "../Icons/Icon";
import { routeConfig } from "../../Routers/routeconfig";
import { useLocation } from "react-router";
import CustomNavLinks from "../Links/CustomNavLinks";
import ReactCountryFlag from "react-country-flag";

import icon from "../../assets/images/leadbank-icon.png";

export default function Footer({ style, className, ...props }) {
  const addresses = [
    {
      location: "United State",
      flagcode: "US",
      address: " Lead Comunity Bank, 609 North board street, middletown, deleware",
    },
     {
      location: "United Kingdom",
      flagcode: "GB",
      address: " 65 Charlotte Road, Hackney, London EC2A 3PE, United Kingdom",
    },
     {
      location: "Eygpt",
      flagcode: "EG",
      address: " Lead Bank, 3 Saraya Street, Zamalek, Cairo Governorate 11211, Egypt",
    },
     {
      location: "Malaysia",
      flagcode: "MY",
      address: " 42 Jalan Sultan Ahmad Shah, 10050 George Town, Penang, Malaysia",
    },
  ];

  return (
    <footer style={style} className={className} {...props}>
      <nav className="top-footer-data">
        <div className="linksHolder">
          <h4 className="logo">
            <CustomImage source={icon} /> Leadbank
          </h4>
          <Link>Contact us</Link>
          <Link>Privacy policy</Link>
          <Link>Terms & conditions</Link>
          <Link>Community guildlines</Link>
        </div>
        <div className="linksHolder">
          <p className="logo">Services</p>
          <Link>Business banking</Link>
          <Link>Loans & credit</Link>
          <Link>Virtual cards</Link>
          <Link>Grants & aids</Link>
        </div>
        <div className="linksHolder">
          <p className="logo">
            Support
          </p>
          <Link>About us</Link>
          <Link>FAQs</Link>
          <Link>Blogs</Link>
          <Link>Help & community</Link>
        </div>
        <div className="linksHolder socials">
          <Link>+1 (509) 1256 178</Link>
          <CustomButton>
            <Icon name="IoLogoWhatsapp" /> Chat on Whatsapp
          </CustomButton>
          <Link>Support@leadbank.co</Link>
        </div>
      </nav>
      <div className="address-data">
        {addresses.map((address, index) => (
          <div key={index} className="company-address">
            <p>{address.location}</p>
            <small>
                <ReactCountryFlag countryCode={address.flagcode} svg />
                {address.address}
            </small>
          </div>
        ))}
      </div>
      <p className="copyright">
        <Icon name="LuCopyright" /> 2026 Lead Community Bank, inc
      </p>
      <div className="footer-glow">
        <h2>Go Global with LeadBank</h2>
      </div>
    </footer>
  );
}
