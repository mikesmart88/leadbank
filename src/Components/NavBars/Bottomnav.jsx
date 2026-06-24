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

export default function BottomNavBar({style, className, ...props}) {

    const location = useLocation();

    const normalizePath = (path) => path.replace(/\/$/, ""); // remove trailing slash
      const currentRoute = routeConfig.find(
        (route) => normalizePath(location.pathname) === normalizePath(route.path),
      );


    // console.log(currentRoute)

    return  (
        <aside style={style} className={className} {...props}>
            <Link to="/dashboard/" className={currentRoute.title == "Dashboard" ? "bottom-active" : ""}>
            <Icon name="LuLayoutDashboard" />
            Dashboard
            </Link>
            <Link to="/accounts/" className={currentRoute.title == "Accounts" ? "bottom-active" : ""}>
            <Icon name="LuWallet" />
            Accounts
            </Link>
            <Link to="/card/" className={currentRoute.title == "Cards" ? "bottom-active" : ""} >
            {currentRoute.title !== "Cards" ? <Icon name="BsCreditCard2Front" /> : <Icon name="BsCreditCard2FrontFill" /> }
            Cards
            </Link>
            <Link to="/transactions/" className={currentRoute.title == "Transactions" ? "bottom-active" : ""} >
            <Icon  name="LuActivity" />
            Transactions
            </Link>
            <Link to="/more/" className={currentRoute.title == "More" ? "bottom-active" : ""} >
            <Icon name="LuMenu" />
            More
            </Link>
        </aside>
    )
}