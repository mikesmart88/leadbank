import { useTranslation } from "../../auto-il8n";
import { useNavigate } from "react-router-dom";
const PaymentProcessingModal = ({
  open
}) => {
  const navigate = useNavigate();
  if (!open) return null;
  return <div className="payment-modal-overlay verification-overlay payment-overlay">
      <div className="payment-dmodal">
         <div className="payment-spinner">
    <span className="hourglass">{t("")}</span>
</div>

        <h2>{t("payment_processing")}</h2>

        <p className="payment-message">{t("we_ve_received_your_deposit_request_and_your_payment_is_currently_being_processed")}</p>

        <p className="payment-message">{t("your_account_will_be_credited_automatically_once_your_payment_has_been_successfully_confirmed")}</p>

        <p className="payment-time">{t("estimated_processing_time")}<strong>{t("about_1_minute")}</strong>
        </p>

        <p className="payment-note">{t("you_ll_receive_an_email_notification_as_soon_as_your_deposit_is_successful")}</p>

        <button className="dashboard-btn" onClick={() => navigate("/dashboard/")}>{t("back_to_dashboard")}</button>
      </div>
    </div>;
};
export default PaymentProcessingModal;