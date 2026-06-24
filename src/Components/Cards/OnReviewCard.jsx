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
  poadoc,
}) {
  if (!isOpen) return null;

  const navigate = useNavigate()

  return (
    <div className="verification-overlay">
      <div className="verification-modal">
        {/* <CustomButton className="verification-close" onClick={onClose}>
          ✕
        </CustomButton> */}

        <div className="success-icon-holder">
          <div className="success-icon">
            <FaCheck />
          </div>
        </div>

        <h2>Verification Submitted!</h2>

        <p className="verification-message">
          Thank you! Your verification information has been
          successfully submitted and is now under review.
        </p>

        <div className="verification-details">
          <h4> <Icon name="LuClipboardList" /> Verification Details</h4>

          <div className="detail-row">
            <span>Date of Birth</span>
            <span>{dob}</span>
          </div>

          <div className="detail-row">
            <span>Address</span>
            <span>{address}</span>
          </div>

          <div className="detail-row">
            <span>Proof of Address</span>
            <span>{poa}</span>
          </div>

          <div className="detail-row">
            <span>Document Uploaded</span>
            <span>{poadoc}</span>
          </div>
        </div>

        <CustomButton
          className="verification-btn"
          onClick={() => navigate('/dashboard/')}
        >
          Got it!
        </CustomButton>

        <small>
          <Icon name="LuClock3" /> We will notify you once the review is complete.
        </small>
      </div>
    </div>
  );
}