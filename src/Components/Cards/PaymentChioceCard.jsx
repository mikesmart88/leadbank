import { useState } from "react";
import { LuBuilding2, LuBitcoin, LuCode, LuCopy } from "react-icons/lu";
import { FaFaceSadTear } from "react-icons/fa6";
import { useData } from "../../hooks/UseData";
import { useAlert } from "../../contexts/AlertContext";
import CustomButton from "../Buttons/CustomButtons";
import Icon from "../Icons/Icon";

export default function PaymentChoiceModal({ open, onclose, ...props }) {
  const [selectedMethod, setSelectedMethod] = useState("crypto");
  const { showAlert } = useAlert();

  const { supportData } = useData();

  const maskWalletAddress = (address) => {
    if (!address || address.length <= 14) return address;

    return `${address.slice(0, 7)}...${address.slice(-7)}`;
  };

  const copyWalletAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      showAlert({
        type: "info",
        message: "Wallet address copied",
      });
    } catch (error) {
      console.error("Failed to copy address", error);
    }
  };

  if(!open) return null;

  return (
    <section className="verification-overlay">
      <div className="payment-modal">
        <CustomButton className="close-details" onClick={onclose}>
          <Icon name="IoClose" />
        </CustomButton>
        <div className="payment-sidebar">
          <h3>Add Money</h3>

          <div
            className={`payment-option ${
              selectedMethod === "bank" ? "active" : ""
            }`}
            onClick={() => setSelectedMethod("bank")}
          >
            <LuBuilding2 />
            <div>
              <h4>Bank Transfer</h4>
              <p>Add with bank transfer</p>
            </div>
          </div>

          <div
            className={`payment-option ${
              selectedMethod === "crypto" ? "active" : ""
            }`}
            onClick={() => setSelectedMethod("crypto")}
          >
            <LuBitcoin />
            <div>
              <h4>Crypto</h4>
              <p>Add with cryptocurrency</p>
            </div>
          </div>
        </div>

        <div className="payment-content">
          {selectedMethod === "bank" && (
            <>
              <h3>Bank Transfer</h3>

              <div className="detail-card null-card">
                <FaFaceSadTear />
                <h2>Currently Unavaliable</h2>
              </div>
            </>
          )}

          {selectedMethod === "crypto" && (
            <>
              <h3>Crypto Payment</h3>

              {supportData?.paymentWays.map((way, index) => (
                <>
                  <div className="detail-card">
                    <span>Network</span>
                    <strong>{way.tokenNetwork}</strong>
                  </div>

                  <div className="detail-card">
                    <span>Wallet Address</span>
                    <strong>{maskWalletAddress(way.walletAddress)}</strong>
                  </div>
                  <small
                    onClick={() => copyWalletAddress(way.walletAddress)}
                    style={{
                      fontSize: "12px",
                      marginTop: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <LuCopy />
                    copy wallet address
                  </small>
                </>
                
              ))}
              
            </>
          )}
        </div>
      </div>
    </section>
  );
}
