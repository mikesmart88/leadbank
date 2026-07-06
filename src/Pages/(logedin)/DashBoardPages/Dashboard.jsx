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
import { useLoader } from "../../../contexts/LoaderContext";
import TransactionPopCard from "../../../Components/Cards/TransactionPopCard";
import PaymentChoiceModal from "../../../Components/Cards/PaymentChioceCard";

export default function Dashboard() {
  const { userdata, useraccount, transactions, supportData } = useData();
  const { showLoader, hideLoader } = useLoader();
  const user_isValid = userdata?.isVerifiedCompleted == 5;
  const navigate = useNavigate();

  const [showAdd, setshowAdd] = useState(false);

  const [showBal, setShowBal] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBal((prev) => !prev);
  };

  const quickActions = [
    {
      iconName: "FcMoneyTransfer",
      label: "Transfer",
      description: "Transfer funds to anyone anywhere.",
      to: "/dashboard/funds/send/",
    },
    {
      iconName: "FcSalesPerformance",
      label: "Pay Bills",
      description: "Pay international and local bills.",
      to: "/payments/",
    },
    {
      iconName: "FcDonate",
      label: "Loans",
      description: "Get an instant load for your business",
      to: "/loans/apply/"
    },
    {
      iconName: "FcSimCardChip",
      label: "Virtual Card",
      description: "Get a virtual card for online payments.",
      to: "/card/",
    },
    {
      iconName: "FcDocument",
      label: "Invioce",
      description: "Create Invioce for Transaction made.",
      to: "/transactions/",
    },
  ];

  if (!userdata) {
    return showLoader();
  }

  const limitedTransaction = transactions.slice(0, 5);

  // console.log(useraccount);

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
      {showAdd && (
        <PaymentChoiceModal onclose={() => setshowAdd(false)} open={true} />
      )}
      <small>{getFormattedDate()}</small>
      <h2>
        Hello {userdata?.first_name || "logged"}{" "}
        {userdata?.last_name || "out"} ❤️
      </h2>
      {!user_isValid && (
        <div className="validate-card">
          <div>
            <h3>Let's get your started!</h3>
            <p>
              Complete a few quick details to start accepting payments for your
              amazing work!
            </p>
          </div>
          <CustomButton onClick={() => navigate("/account/verification/kyc/")}>
            Complete setup
          </CustomButton>
        </div>
      )}
      <section className="total-balance-section">
        <div className="balance-show">
          <small>Total Balance</small>
          <strong>
            USD{" "}
            {showBal
              ? useraccount.total_balance_usd.toFixed(2).toLocaleString()
              : "*****"}
          </strong>
        </div>
        <div className="action-button-holder">
          <CustomButton onClick={() => setshowAdd(true)}>
            <Icon name="IoAdd" /> Add Money
          </CustomButton>
          <CustomButton onClick={() => navigate("/dashboard/funds/send/")}>
            <Icon name="LuArrowUpLeft" /> Withdraw Money
          </CustomButton>
          <CustomButton
            onClick={() => toggleBalanceVisibility()}
            style={{ borderRadius: "50%", padding: "10px" }}
          >
            {showBal ? (
              <Icon name="IoEyeOffOutline" />
            ) : (
              <Icon name="IoEyeOutline" />
            )}
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
              to={quickAction.to}
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
            <p>
              Discover the exciting improvements and transaction you have made
              in past few days
            </p>
          </div>
          <Link to="/transactions/">
            View all <Icon name="LuChevronRight" />
          </Link>
        </div>
        {limitedTransaction?.length > 0 ? (
          <TransactionTable
            className="transaction-table"
            tableData={limitedTransaction}
          />
        ) : (
          <div className="null-table"></div>
        )}
      </section>
    </main>
  );
}
