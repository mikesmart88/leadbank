import { useState } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import AccountCard from "../../../Components/Cards/AccountCard";

export default function Accounts() {
  const [accountshow, setAccountShow] = useState("accounts");
  const [transactionType, setTransactionType] = useState("all");
  const [accountMert, setAccountMert] = useState({});
  const { useraccount, userdata } = useData();

  const handleAccountMert = (
    country,
    currency_name,
    currency_icon,
    balance,
    account_number,
  ) => {
    setAccountMert({
      country: country,
      currencyName: currency_name,
      currencyIcon: currency_icon,
      balance: balance,
      accountNumber: account_number
    });
    setAccountShow("single");
  };

  console.log(accountMert);

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
              country={userdata.country}
              currencyName={account.currencyName}
              currencyIcon={account.currencycode}
              balance={account.balance}
              onClick={() =>
                handleAccountMert(
                  userdata.country,
                  account.currencyName,
                  account.currencycode,
                  account.balance,
                  account.accountNumber
                )
              }
            />
          ))}
        </section>
      ) : (
        <section className="user-account-holder">
            <AccountCard 
                className="account-card single-account-card"
                country={accountMert.country}
                currencyName={accountMert.currencyName}
                currencyIcon={accountMert.currencyIcon}
                balance={accountMert.balance}
                accountNumber={accountMert.accountNumber}
             />
        </section>
      )}
      <section className="transaction-for">
        <div className="account-section-nav">
          <CustomButton
            className={transactionType == "all" ? "button-active" : ""}
          >
            All
          </CustomButton>
          <CustomButton
            className={transactionType == "" ? "button-active" : ""}
          >
            Success
          </CustomButton>
          <CustomButton
            className={transactionType == "" ? "button-active" : ""}
          >
            Pending
          </CustomButton>
          <CustomButton
            className={transactionType == "" ? "button-active" : ""}
          >
            failed
          </CustomButton>
        </div>
      </section>
    </main>
  );
}
