import { useState } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import { BaseUrl } from "../../../../env.config";

export default function Dashboard() {
  const { userdata } = useData();

  const user_isValid = userdata?.isVerifiedCompleted == 5;

  const quickActions = [
    {
      iconName: "FcMoneyTransfer",
      label: "Transfer",
      description: "Transfer funds to anyone anywhere.",
    },
    {
      iconName: "FcSalesPerformance",
      label: "Pay Bills",
      description: "Pay international and local bills.",
    },
    {
      iconName: "FcDonate",
      label: "Loans",
      description: "Get an instant load for your business",
    },
    {
      iconName: "FcSimCardChip",
      label: "Virtual Card",
      description: "Get a virtual card for online payments.",
    },
    {
      iconName: "FcDocument",
      label: "Invioce",
      description: "Create Invioce for Transaction made.",
    },
  ];

  const growthub = [
    {
      iconName: "FcApproval",
      label: "Discount Approved",
      description: "Get approved discount on transfers and bill payments",
    },
    {
      iconName: "FcAdvertising",
      label: "Referral Program",
      description: "refer and earn with ease",
    },
  ];

  // console.log(userdata)

  return (
    <main className="dashboard-main-content">
      <small>{getFormattedDate()}</small>
      <h2>
        Hello {userdata?.first_name || "john"}{" "}
        {userdata?.last_name || " Micheal"} ❤️
      </h2>
      {!user_isValid ? (
        <div className="validate-card">
          <div>
            <h3>Let's get your started!</h3>
            <p>
              Complete a few quick details to start accepting payments for your
              amazing work!
            </p>
          </div>
          <CustomButton>Complete setup</CustomButton>
        </div>
      ) : (
        ""
      )}
      <section className="total-balance-section">
        <div className="balance-show">
          <small>Total Balance</small>
          <strong>USD {}</strong>
        </div>
        <div className="action-button-holder">
          <CustomButton>
            <Icon name="IoAdd" /> Add Money
          </CustomButton>
          <CustomButton>
            <Icon name="LuArrowUpLeft" /> Withdraw Money
          </CustomButton>
          <CustomButton style={{ borderRadius: "50%", padding: "10px" }}>
            <Icon name="IoEyeOutline" />
          </CustomButton>
        </div>
      </section>
      <section className="quick-actions">
        <h3>Leadbank Quick Action</h3>
        <p>
          Dive into a world of endless creativity and possibilities with our
          quick actions
        </p>
        <div className="quick-action-link-holder">
          {quickActions.map((quickAction, index) => (
            <QuickActionCard
              key={index}
              className="quick-action-link"
              iconName={quickAction.iconName}
              label={quickAction.label}
              description={quickAction.description}
            />
          ))}
        </div>
      </section>
      <section className="growth-hub-section">
        <h3>Growth Hub</h3>
        <p>
          Enhance your experience with these powerful features, made to simplify
          how you run your business
        </p>
        <div className="growth-hub-links-holder">
          {growthub.map((grwothlink, index) => (
            <GrowthHubLink
              key={index}
              className="growth-hub-link"
              iconName={grwothlink.iconName}
              label={grwothlink.label}
              description={grwothlink.description}
            />
          ))}
        </div>
      </section>
      <section className="transaction-section growth-hub-section">
        <div className="transaction-head">
          <div>
            <h3>Checkout your latest transactions</h3>
        <p>Discover the exciting improvements and transaction you have made in past few days</p>
          </div>
          <Link>
          View all <Icon name="LuChevronRight" />
          </Link>
        </div>
        <TransactionTable className="transaction-table" tableData={[
          {
            id: "1",
            currencyicon: "$",
            amount: 1000,
            source: "Deposite",
            destination: "To USD account",
            status: "Pending"
          }
        ]} />
      </section>
    </main>
  );
}
