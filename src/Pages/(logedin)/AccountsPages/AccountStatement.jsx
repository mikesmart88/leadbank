import { useEffect, useState } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import AccountCard from "../../../Components/Cards/AccountCard";
import CustomImage from "../../../Components/Images/CustomImage";
import { MediaUrl } from "../../../../env.config";

export default function AccountStatement() {
  const { userdata } = useData();

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };


  return (
    <main className="dashboard-main-content account-dashboard">
      <h2>Statement and Report</h2>
      <p>View and download statement of your account</p>
      <div className="null-table">
        {userdata?.avatarUrl ? (
          <CustomImage source={`${MediaUrl}${userdata?.avatarUrl}`} />
        ) : userdata?.first_name && userdata?.last_name !== "" ? (
          <span className="profile-text">
            {getInitials(userdata?.first_name, userdata?.last_name)}
          </span>
        ) : (
          <CustomImage source="https://i.near.social/magic/large/https://near.social/magic/img/account/null" />
        )}
        <h4>
            {userdata?.first_name} {userdata?.last_name} Account Statement
        </h4>
        <p>
            Download your account statement in one click.
        </p>
        <CustomButton>
            Download Statement
        </CustomButton>
      </div>
    </main>
  );
}
