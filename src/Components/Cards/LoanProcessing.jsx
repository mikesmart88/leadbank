import { useNavigate } from "react-router-dom";

const LoanProcessingModal = ({ open }) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="payment-modal-overlay verification-overlay payment-overlay">
      <div className="payment-dmodal">
         <div className="payment-spinner">
    <span className="hourglass">⏳</span>
</div>

        <h2>Loan Processing</h2>

        <p className="payment-message">
          We've received your loan application and your request is currently
          being processed.
        </p>

        <p className="payment-message">
          Your account will be credited automatically once your loan has been
          successfully approved.
        </p>

        <p className="payment-time">
          Estimated processing time: <strong>About 1 minute</strong>
        </p>

        <p className="payment-note">
          You'll receive an email notification as soon as your
          loan is approved.
        </p>

        <p className="payment-message">
            If your loan is not approved, by 1 hour time, please contact support.
            </p>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard/")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default LoanProcessingModal;