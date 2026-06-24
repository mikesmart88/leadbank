import React, { useState } from "react";
import { Link } from "react-router";
import CustomImage from "../Images/CustomImage";
import CustomButton from "../Buttons/CustomButtons";
import Icon from "../Icons/Icon";
import { routeConfig } from "../../Routers/routeconfig";
import { useLocation, useNavigate } from "react-router";
import CustomNavLinks from "../Links/CustomNavLinks";
import SideBar from "../SideBars/SideBar";

import icon from "../../assets/images/another-icon.png";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function Vpageheader({
  currentv,
  total,
  style,
  text,
  className,
  ...props
}) {

    const navigate = useNavigate()

  return (
    <header style={style} className={className} {...props}>
      <div>
        <span className="goback" onClick={() => navigate(-1)}>
          <Icon name="LuArrowLeft" />
        </span>

        <span className="vlogo">
          <CustomImage source={icon} /> Leadbank
        </span>
      </div>

     {total && currentv && (
       <div className="kyc-info">
        <small>
          Step {currentv} / {total}
        </small>
        <strong>{text || "Complete your KYC"}</strong>
      </div>
     )}
    </header>
  );
}
