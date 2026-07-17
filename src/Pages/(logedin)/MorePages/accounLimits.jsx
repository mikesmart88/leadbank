import { useTranslation } from "../../../auto-il8n";
import { useState, useRef } from "react";
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
import CustomProgress from "../../../Components/ProgessBars/CustomProgress";
import BackButton from "../../../Components/Buttons/BackButton";
export default function AccountLimit() {
  const {
    t
  } = useTranslation();
  const {
    limits
  } = useData();

  // console.log(limits?.deposit)

  return <main className="dashboard-main-content account-dashboard">
            <h2> <BackButton />{t("transaction_limits")}</h2>
            <p>{t("view_all_total_transaction_and_know_when_you_have_reached_your_limit")}</p>

            <div className="more-section p-section">
                <h3>{t("withdrawal_limits")}</h3>
                <div className="limit-progress">
                    <small>{t("daily_limit_10_000_00")}</small>
                    <CustomProgress value={limits?.withdrawals} max={10000} className="limit-progress-main">
                        <small>{t("")}{(10000 - (limits?.withdrawals || 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{t("remaining")}</small>
                        <small>{t("refreshes_in_1_day")}</small>
                    </CustomProgress>
                </div>
                <div className="limit-progress">
                    <small>{t("montly_limit_10_000_000_00")}</small>
                    <CustomProgress value={limits?.withdrawals} max={10000000} className="limit-progress-main">
                        <small>{t("")}{(10000000 - (limits?.withdrawals || 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{t("remaining")}</small>
                        <small>{t("refreshes_in_1_day")}</small>
                    </CustomProgress>
                </div>
            </div>

            <div className="more-section p-section">
                <h3>{t("deposit_limits")}</h3>
                <div className="limit-progress">
                    <small>{t("daily_limit_unlimited")}</small>
                    <CustomProgress value={limits?.deposits} max={10000} className="limit-progress-main">
                        <small>{t("unlimited")}</small>
                        <small>{t("refreshes_in_1_day")}</small>
                    </CustomProgress>
                </div>
                <div className="limit-progress">
                    <small>{t("montly_limit_unlimited")}</small>
                    <CustomProgress value={limits?.deposits} max={10000000} className="limit-progress-main">
                        <small>{t("unlimited")}</small>
                        <small>{t("refreshes_in_1_day")}</small>
                    </CustomProgress>
                </div>
            </div>

            <div className="more-section p-section">
                <h3>{t("cards_limits")}</h3>
                <div className="limit-progress">
                    <small>{t("daily_limit_10_000_00")}</small>
                    <CustomProgress value={limits?.cards} max={10000} className="limit-progress-main">
                        <small>{t("")}{(10000 - (limits?.card || 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{t("remaining")}</small>
                        <small>{t("refreshes_in_1_day")}</small>
                    </CustomProgress>
                </div>
                <div className="limit-progress">
                    <small>{t("montly_limit_10_000_000_00")}</small>
                    <CustomProgress value={limits?.cards} max={10000000} className="limit-progress-main">
                        <small>{t("")}{(10000000 - (limits?.cards || 0)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{t("remaining")}</small>
                        <small>{t("refreshes_in_1_day")}</small>
                    </CustomProgress>
                </div>
            </div>

        </main>;
}