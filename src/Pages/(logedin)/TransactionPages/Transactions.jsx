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

export default function Transaction() {
  const [accountshow, setAccountShow] = useState("accounts");
  const [transactionType, setTransactionType] = useState("all");
  const [accountMert, setAccountMert] = useState({});
  const { useraccount, transactions } = useData();
  const [currentTransaction, setCurrentTransaction] = useState();

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
  ) => {
    setAccountMert({
      country: country,
      currencyName: currency_name,
      currencyIcon: currency_icon,
      balance: balance,
      accountNumber: account_number,
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
      <h2>Transactions</h2>
      <p>Manager and filter transaction history to keep track of your money.</p>
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
