import { useTranslation } from "../../../auto-il8n";
import { useState, useRef, useEffect } from "react";
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
import { MediaUrl } from "../../../../env.config";
import CustomImage from "../../../Components/Images/CustomImage";
import Input from "../../../Components/Inputs/Input";
import { uploadimage } from "../../../services/AuthServices";
import BackButton from "../../../Components/Buttons/BackButton";
import { Set2FA } from "../../../services/AuthServices";
export default function Referral() {
  const {
    t
  } = useTranslation();
  const {
    showAlert
  } = useAlert();
  const copyWalletAddress = async address => {
    try {
      await navigator.clipboard.writeText(address);
      showAlert({
        type: "info",
        message: "Copied"
      });
    } catch (error) {
      console.error("Failed to copy address", error);
    }
  };
  const {
    userdata
  } = useData();
  return <main className="dashboard-main-content account-dashboard">
      <h2>
        {" "}
        <BackButton />{t("referral_program")}</h2>
      <p>{t("earn_intrest_when_you_refer_a_friend")}</p>
      <section className="auth-factor referral-section">
        <div className="referral">
          <div>
            <h3>{t("refer_a_friend_and_earn_5")}</h3>
            <p>{t("share_your_referral_code_and_get_5_when_whoever_you_refer_signs_up_and_receives_over_500_before_their_foreign_account")}</p>
          </div>
        </div>
        <div className="showLink">
            <CustomButton onClick={() => copyWalletAddress(userdata?.refCode?.toUpperCase())}>
            {userdata?.refCode?.toUpperCase()} <Icon name="LuCopy" />
            </CustomButton>
        </div>
        <CustomImage source="https://app.grey.co/assets/moneygun-FKsVebUa.png" />
      </section>
    </main>;
}