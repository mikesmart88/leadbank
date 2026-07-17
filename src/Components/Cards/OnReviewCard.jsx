import { useTranslation } from "../../auto-il8n";
import { LuCheck } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import { useNavigate } from "react-router";
// import "./VerificationReviewModal.css";

export default function VerificationReviewModal({
  isOpen,
  onClose,
  dob,
  address,
  poa,
  poadoc
}) {
  const {
    t
  } = useTranslation();
  if (!isOpen) return null;
  const navigate = useNavigate();
  return <div className="verification-overlay">
      <div className="verification-modal">
        {/* <CustomButton className="verification-close" onClick={onClose}>
          ✕
         </CustomButton> */}

        <div className="success-icon-holder">
          <div className="success-icon">
            <FaCheck />
          </div>
        </div>

        <h2>{t("verification_submitted")}</h2>

        <p className="verification-message">{t("thank_you_your_verification_information_has_been_successfully_submitted_and_is_now_under_review")}</p>

        <div className="verification-details">
          <h4> <Icon name="LuClipboardList" />{t("verification_details")}</h4>

          <div className="detail-row">
            <span>{t("date_of_birth")}</span>
            <span>{dob}</span>
          </div>

          <div className="detail-row">
            <span>{t("address")}</span>
            <span>{address}</span>
          </div>

          <div className="detail-row">
            <span>{t("proof_of_address")}</span>
            <span>{poa}</span>
          </div>

          <div className="detail-row">
            <span>{t("document_uploaded")}</span>
            <span>{poadoc}</span>
          </div>
        </div>

        <CustomButton className="verification-btn" onClick={() => navigate('/dashboard/')}>{t("got_it")}</CustomButton>

        <small>
          <Icon name="LuClock3" />{t("we_will_notify_you_once_the_review_is_complete")}</small>
      </div>
    </div>;
}