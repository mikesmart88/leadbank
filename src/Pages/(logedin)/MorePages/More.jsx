import { useState } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link, useNavigate } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import { BaseUrl } from "../../../../env.config";
import PaymentCard from "../../../Components/Cards/PaymentCard";
import { useAlert } from "../../../contexts/AlertContext";
import { useLoader } from "../../../contexts/LoaderContext";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";


export default function More() {

    const {userdata} = useData()
    const { logout } = useContext(AuthContext);
    const { showLoader } = useLoader();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const IsVerified = userdata?.isVerifiedCompleted == 5;

    const handleLogout = () => {
    showLoader();
    logout();
    showAlert({ type: "info", message: "Successfully loged out" });
    navigate("/login/");
  };

    return (
        <main className="dashboard-main-content account-dashboard">
            <h2>Settings & More</h2>
            <p>Manage more activites in your account</p>

            <div className="more-section">
                <h3>Account</h3>
                <Link to="/profile/">
                <span>
                    <Icon name="LuUser" /> Your Profile
                </span>
                </Link>
                <Link>
                <span>
                    <Icon name="MdVerified" /> Account Verification
                </span>
                <small className={IsVerified ? "success" : "failed"}>
                    {IsVerified ? "Verified" : "Not Verified"}
                </small>
                </Link>
                <Link>
                <span>
                    <Icon name="LuBell" /> Notifications
                </span>
                </Link>
            </div>

            <div className="more-section">
                <h3>Finances</h3>
                <Link to="/account/limits/"> 
                <span>
                    <Icon name="IoPieChart" /> Transaction Limits
                </span>
                </Link>
                
            </div>

            <div className="more-section">
                <h3>Security</h3>
                <Link to="/settings/password/change/">
                <span>
                    <Icon name="MdKey" /> Change Password
                </span>
                </Link>
                <Link>
                <span>
                    <Icon name="LuShieldCheck" /> Two Factor Authentication
                </span>
                </Link>
                <Link>
                <span>
                    <Icon name="MdLock" /> Change your Pin
                </span>
                </Link>
            </div>

            <div className="more-section">
                <h3>Others</h3>
                <Link>
                <span>
                    <Icon name="LuUsers" /> Community
                </span>
                </Link>
                <Link>
                <span>
                    <Icon name="IoStarHalfSharp" /> Affilates & Referrals
                </span>
                </Link>
                <Link>
                <span>
                    <Icon name="LuMessageCircleMore" /> Talk to Support
                </span>
                </Link>
            </div>

           
            <small onClick={() => handleLogout()} className="more-logout"><Icon name="LuLogOut" /> Log out </small>

        </main>
    )
}