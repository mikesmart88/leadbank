import { useTranslation } from "../../auto-il8n";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import CustomImage from "../Images/CustomImage";
import CustomButton from "../Buttons/CustomButtons";
export default function PaymentStatusModal({
  isOpen,
  status,
  amount,
  recipient,
  reference,
  bankName,
  date,
  onClose
}) {
  const {
    t
  } = useTranslation();
  if (!isOpen) return null;
  const statusMap = {
    success: {
      icon: "https://cdn3d.iconscout.com/3d/premium/thumb/payment-done-3d-icon-png-download-9709843.png",
      title: "Successfully sent!",
      color: "#1BA97F"
    },
    pending: {
      icon: "https://cdnai.iconscout.com/image-restyle/12574906/preview/a217072e-1f30-4985-a74d-1d42d4a52c07.jpg?f=webp&h=1000",
      title: "Transfer Pending!",
      color: "#F5A623",
      message: "Your transaction is currently being processed."
    },
    failed: {
      icon: "https://cdnai.iconscout.com/image-restyle/6871355/preview/a217082a-5842-4945-97d6-9abc1ece9796.jpg?f=webp&h=1000",
      title: "Transfer Failed!",
      color: "#FF4D4F",
      message: "We couldn't complete this transaction."
    }
  };
  const current = statusMap[status];
  return <div className="verification-overlay">
      <div className="payment-status">
        <div className="status-head">
          <CustomImage source={current.icon} altText="status image" />
          <h2>{current.title}</h2>
        </div>

        <div className="status-action-btn">
          <CustomButton>{t("generate_invioce")}</CustomButton>
          <CustomButton>{t("save_to_beneficiary")}</CustomButton>
        </div>

        <div className="status-details">
          <div className="status-row">
            <small>{t("recipient")}</small>
            <b>{recipient}</b>
          </div>
          <div className="status-row">
            <small>{t("amount")}</small>
            <b>{amount}</b>
          </div>
          <div className="status-row">
            <small>{t("date")}</small>
            <b>{date}</b>
          </div>
        </div>

        <CustomButton onClick={onClose} className="done">{t("done")}</CustomButton>
      </div>
    </div>;
}