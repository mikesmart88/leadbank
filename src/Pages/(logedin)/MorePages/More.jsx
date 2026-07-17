import { useTranslation } from "../../../auto-il8n";
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
  const {
    t
  } = useTranslation();
  const {
    userdata
  } = useData();
  const {
    logout
  } = useContext(AuthContext);
  const {
    showLoader
  } = useLoader();
  const {
    showAlert
  } = useAlert();
  const navigate = useNavigate();
  const IsVerified = userdata?.isVerifiedCompleted == 5;
  const handleLogout = () => {
    showLoader();
    logout();
    showAlert({
      type: "info",
      message: "Successfully loged out"
    });
    navigate("/login/");
  };
  return <main className="dashboard-main-content account-dashboard">
            <h2>{t("settings_more")}</h2>
            <p>{t("manage_more_activites_in_your_account")}</p>

            <div className="more-section">
                <h3>{t("account")}</h3>
                <Link to="/profile/">
                <span>
                    <Icon name="LuUser" />{t("your_profile")}</span>
                </Link>
                <Link>
                <span>
                    <Icon name="MdVerified" />{t("account_verification")}</span>
                <small className={IsVerified ? "success" : "failed"}>
                    {IsVerified ? "Verified" : "Not Verified"}
                </small>
                </Link>
                <Link>
                <span>
                    <Icon name="LuBell" />{t("notifications")}</span>
                </Link>
            </div>

            <div className="more-section">
                <h3>{t("finances")}</h3>
                <Link to="/account/limits/"> 
                <span>
                    <Icon name="IoPieChart" />{t("transaction_limits")}</span>
                </Link>
                
            </div>

            <div className="more-section">
                <h3>{t("security")}</h3>
                <Link to="/settings/password/change/">
                <span>
                    <Icon name="MdKey" />{t("change_password")}</span>
                </Link>
                <Link to="/settings/2fa/">
                <span>
                    <Icon name="LuShieldCheck" />{t("two_factor_authentication")}</span>
                </Link>
                <Link to="/settings/pin/change/">
                <span>
                    <Icon name="MdLock" />{t("change_your_pin")}</span>
                </Link>
            </div>

            <div className="more-section">
                <h3>{t("others")}</h3>
                <Link>
                <span>
                    <Icon name="LuUsers" />{t("community")}</span>
                </Link>
                <Link to="/referrals/">
                <span>
                    <Icon name="IoStarHalfSharp" />{t("affilates_referrals")}</span>
                </Link>
                <Link to="mailto:support@leadbankuniversal.com">
                <span>
                    <Icon name="LuMessageCircleMore" />{t("talk_to_support")}</span>
                </Link>
            </div>

           
            <small onClick={() => handleLogout()} className="more-logout"><Icon name="LuLogOut" />{t("log_out")}</small>

        </main>;
}