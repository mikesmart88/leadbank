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

    const { showAlert } = useAlert()

    const copyWalletAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      showAlert({
        type: "info",
        message: "Copied",
      });
    } catch (error) {
      console.error("Failed to copy address", error);
    }
  };

    const { userdata } = useData()

  return (
    <main className="dashboard-main-content account-dashboard">
      <h2>
        {" "}
        <BackButton /> Referral Program
      </h2>
      <p>Earn intrest when you refer a friend</p>
      <section className="auth-factor referral-section">
        <div className="referral">
          <div>
            <h3>Refer a friend and earn $5</h3>
            <p>
              Share your referral code and get $5 when whoever you refer signs
              up and receives over $500 before their foreign account
            </p>
          </div>
        </div>
        <div className="showLink">
            <CustomButton onClick={() => copyWalletAddress(userdata?.refCode?.toUpperCase())} >
            {userdata?.refCode?.toUpperCase()} <Icon name="LuCopy" />
            </CustomButton>
        </div>
        <CustomImage source="https://app.grey.co/assets/moneygun-FKsVebUa.png" />
      </section>
    </main>
  );
}
