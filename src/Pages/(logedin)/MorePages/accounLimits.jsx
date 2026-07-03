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

    const { limits } = useData()

    // console.log(limits?.deposit)

    return (
        <main className="dashboard-main-content account-dashboard">
            <h2> <BackButton /> Transaction Limits</h2>
            <p>View all Total transaction and know when you have reached your limit</p>

            <div className="more-section p-section">
                <h3>Withdrawal limits</h3>
                <div className="limit-progress">
                    <small>Daily limit: $10,000.00</small>
                    <CustomProgress value={limits?.withdrawals} max={10000}  className="limit-progress-main" >
                        <small>${(10000 - (limits?.withdrawals || 0)).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            })} Remaining</small>
                        <small>Refreshes in 1 day</small>
                    </CustomProgress>
                </div>
                <div className="limit-progress">
                    <small>Montly limit: $10,000,000.00</small>
                    <CustomProgress value={limits?.withdrawals} max={10000000}  className="limit-progress-main" >
                        <small>${(10000000 - (limits?.withdrawals || 0)).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            })} Remaining</small>
                        <small>Refreshes in 1 day</small>
                    </CustomProgress>
                </div>
            </div>

            <div className="more-section p-section">
                <h3>Deposit limits</h3>
                <div className="limit-progress">
                    <small>Daily limit: Unlimited</small>
                    <CustomProgress value={limits?.deposits} max={10000}  className="limit-progress-main" >
                        <small>Unlimited</small>
                        <small>Refreshes in 1 day</small>
                    </CustomProgress>
                </div>
                <div className="limit-progress">
                    <small>Montly limit: Unlimited</small>
                    <CustomProgress value={limits?.deposits} max={10000000}  className="limit-progress-main" >
                        <small>Unlimited</small>
                        <small>Refreshes in 1 day</small>
                    </CustomProgress>
                </div>
            </div>

            <div className="more-section p-section">
                <h3>Cards limits</h3>
                <div className="limit-progress">
                    <small>Daily limit: $10,000.00</small>
                    <CustomProgress value={limits?.cards} max={10000}  className="limit-progress-main" >
                        <small>${(10000 - (limits?.card || 0)).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            })} remaining</small>
                        <small>Refreshes in 1 day</small>
                    </CustomProgress>
                </div>
                <div className="limit-progress">
                    <small>Montly limit: $10,000,000.00</small>
                    <CustomProgress value={limits?.cards} max={10000000}  className="limit-progress-main" >
                        <small>${(10000000 - (limits?.cards || 0)).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            })} remaining</small>
                        <small>Refreshes in 1 day</small>
                    </CustomProgress>
                </div>
            </div>

        </main>
    )
}