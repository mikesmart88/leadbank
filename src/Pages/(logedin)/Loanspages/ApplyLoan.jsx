import { useTranslation } from "../../../auto-il8n";
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
import PaymentCard from "../../../Components/Cards/PaymentCard";
import CustomImage from "../../../Components/Images/CustomImage";
export default function ApplyLoans() {
  const {
    t
  } = useTranslation();
  const {
    userdata,
    useraccount,
    transactions,
    supportData
  } = useData();
  const loanTransactions = [];
  const navigate = useNavigate();
  const [showBal, setShowBal] = useState(true);
  const toggleBalanceVisibility = () => {
    setShowBal(prev => !prev);
  };
  return <main className="dashboard-main-content account-dashboard">
        <h2>{t("loans_grants")}</h2>
        <p>{t("apply_for_a_loan_and_get_the_funds_you_need_to_grow_your_business")}</p>
        <br />
        <section className="total-balance-section loan-balance-section">
        <div className="balance-show">
          <small>{t("total_loan_balance")}</small>
          <strong>{t("usd")}{" "}
            {showBal ? 0.00.toFixed(2).toLocaleString() : "*****"}
          </strong>
        </div>
        <div className="action-button-holder loan-action-button">
                  <CustomButton onClick={() => toggleBalanceVisibility()} style={{
          borderRadius: "50%",
          padding: "10px"
        }} className="loan-balance-toggle">
                    {showBal ? <Icon name="IoEyeOffOutline" /> : <Icon name="IoEyeOutline" />}
                  </CustomButton>
                </div>
        </section>

        <section className="transaction-section growth-hub-section">
                <div className="transaction-head">
                  <div>
                    <h3>{t("your_loan_transactions")}</h3>
                    <p>{t("see_all_the_progress_you_have_made_with_your_loan_transactions_and_how_much_you_have_left_to_pay")}</p>
                  </div>
                </div>
                {loanTransactions?.length > 0 ? <TransactionTable className="transaction-table" tableData={loanTransactions} /> : <div className="null-table">
                    <CustomImage source="https://res.cloudinary.com/mainstack-co/image/upload/images/app//affiliate-program/no_product.svg" />
                                <h4>{t("no_loans_yet")}</h4>
                                <p>{t("there_is_no_loan_available_for_this_current_account_yet")}</p>
                                <CustomButton onClick={() => navigate("/loans/application/")}>{t("apply_for_loan")}</CustomButton>
                  </div>}
              </section>
       </main>;
}