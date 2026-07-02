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
import PaymentCard from "../../../Components/Cards/PaymentCard";
import CustomImage from "../../../Components/Images/CustomImage";


export default function ApplyLoans() {

    const { userdata, useraccount, transactions, supportData } = useData();

    const loanTransactions = []

    const [showBal, setShowBal] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBal((prev) => !prev);
  };


    return (
       <main className="dashboard-main-content account-dashboard" >
        <h2>Loans & Grants</h2>
        <p>Apply for a loan and get the funds you need to grow your business.</p>
        <br />
        <section className="total-balance-section">
        <div className="balance-show">
          <small>Total Loan Balance</small>
          <strong>
            USD{" "}
            {showBal
              ? 0.00.toFixed(2).toLocaleString()
              : "*****"}
          </strong>
        </div>
        <div className="action-button-holder">
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

        <section className="transaction-section growth-hub-section">
                <div className="transaction-head">
                  <div>
                    <h3>your loan transactions</h3>
                    <p>
                    See all the progress you have made with your loan transactions and how much you have left to pay.
                    </p>
                  </div>
                </div>
                {loanTransactions?.length > 0 ? (
                  <TransactionTable
                    className="transaction-table"
                    tableData={loanTransactions}
                  />
                ) : (
                  <div className="null-table">
                    <CustomImage source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//affiliate-program/no_product.svg" />
                                <h4>No Loans yet</h4>
                                <p>There is no Loan available for this current account yet.</p>
                                <CustomButton
                                  onClick={() => {}}
                                >
                                  Apply for Loan
                                </CustomButton>
                  </div>
                )}
              </section>
       </main>
    )
}