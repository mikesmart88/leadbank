import { useEffect, useState } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link, useNavigate } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import AccountCard from "../../../Components/Cards/AccountCard";
import CustomImage from "../../../Components/Images/CustomImage";
import AccountDetilsCard from "../../../Components/Cards/AccountDetailsCard";

import stacked_icon from "../../../assets/images/staked-c.png";

export default function Accounts() {
  const [accountshow, setAccountShow] = useState("accounts");
  const [transactionType, setTransactionType] = useState("all");
  const [accountMert, setAccountMert] = useState({});
  const { useraccount, transactions, userdata } = useData();
  const [currentTransaction, setCurrentTransaction] = useState();

  const [showdetails, setShowDetails] = useState(false);

  const naviate = useNavigate();

  const [closeClass, setcloseClass] = useState(false);

  const handleclose = () => {
    setcloseClass(true);
    setTimeout(() => {
      setShowDetails(false);
    }, 500);
  };

  useEffect(() => {
    if (transactions) {
      setCurrentTransaction(transactions);
    }
  }, [transactions]);

  const handleAccountMert = (
    country,
    currency_name,
    currency_icon,
    balance,
    account_number,
    date
  ) => {
    setAccountMert({
      country: country,
      currencyName: currency_name,
      currencyIcon: currency_icon,
      balance: balance,
      accountNumber: account_number,
      date: date
    });
    setAccountShow("single");
  };

  const handleFilter = (status) => {
    setTransactionType(status);

    if (status === "all") {
      setCurrentTransaction(transactions);
    } else {
      const filtered = transactions.filter((tx) => tx.status === status);

      setCurrentTransaction(filtered);
    }
  };

  return (
    <main className="dashboard-main-content account-dashboard">
      <h2>Accounts</h2>
      <p>Manage your accounts and track earnings.</p>
      <div className="account-section-nav">
        <CustomButton
          className={accountshow == "accounts" ? "button-active" : ""}
          onClick={() => setAccountShow("accounts")}
        >
          Accounts
        </CustomButton>
        <CustomButton
          className={accountshow == "single" ? "button-active" : ""}
        >
          Merchant
        </CustomButton>
      </div>
      {accountshow == "accounts" ? (
        <section className="user-account-holder">
          {useraccount?.accounts.map((account, index) => (
            <AccountCard
              key={index}
              className="account-card"
              country={account.country}
              currencyName={account.currencyName}
              currencyIcon={account.currencycode}
              balance={account.balance}
              onClick={() =>
                handleAccountMert(
                  account.country,
                  account.currencyName,
                  account.currencycode,
                  account.balance,
                  account.accountNumber,
                  new Date(account.created_at).toISOString().split("T")[0]
                )
              }
            />
          ))}
          <div
            onClick={() => naviate("/account/create/new/")}
            className="add-account account-card"
          >
            <CustomImage source={stacked_icon} />
            <h3>Create New Account</h3>
            {/* <span>
              <Icon name="IoAdd" />
            </span> */}
          </div>
        </section>
      ) : (
        <section className="user-account-holder">
          {showdetails && (
            <AccountDetilsCard
              className={`card-details-show ${closeClass && "close-details-show"}`}
              name={`${userdata?.first_name} ${userdata?.last_name}`}
              number={accountMert.accountNumber}
              balance={`${accountMert.currencyIcon}${accountMert.balance}`}
              date={accountMert.date}
              country={accountMert.country}
              isopen={true}
              onclose={() => handleclose()}
            />
          )}
          <AccountCard
            className="account-card single-account-card"
            country={accountMert.country}
            currencyName={accountMert.currencyName}
            currencyIcon={accountMert.currencyIcon}
            balance={accountMert.balance}
            accountNumber={accountMert.accountNumber}
            onClick={() => setShowDetails(true)}
          />
        </section>
      )}
      <section className="transaction-for">
        <div className="account-section-nav">
          <CustomButton
            className={transactionType == "all" ? "button-active" : ""}
            onClick={() => handleFilter("all")}
          >
            All
          </CustomButton>
          <CustomButton
            className={transactionType == "success" ? "button-active" : ""}
            onClick={() => handleFilter("success")}
          >
            Success
          </CustomButton>
          <CustomButton
            className={transactionType == "pending" ? "button-active" : ""}
            onClick={() => handleFilter("pending")}
          >
            Pending
          </CustomButton>
          <CustomButton
            className={transactionType == "failed" ? "button-active" : ""}
            onClick={() => handleFilter("failed")}
          >
            failed
          </CustomButton>
        </div>
        {currentTransaction?.length > 0 ? (
          <TransactionTable
            className="transaction-table"
            tableData={currentTransaction}
          />
        ) : (
          <div className="null-table">
            <CustomImage source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//affiliate-program/no_product.svg" />
            <h4>No Transaction Yet</h4>
            <p>
              There is no transaction available for this current filter yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
