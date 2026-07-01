import { useState, useEffect } from "react";
import { LuBuilding2, LuBitcoin, LuCode, LuCopy } from "react-icons/lu";
import { FaFaceSadTear } from "react-icons/fa6";
import { useData } from "../../hooks/UseData";
import { useAlert } from "../../contexts/AlertContext";
import CustomButton from "../Buttons/CustomButtons";
import Icon from "../Icons/Icon";
import { useLoader } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router";

export default function PaymentChoiceModal({ open, onclose, ...props }) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const { showAlert } = useAlert();
  const { showLoader, hideLoader } = useLoader()
  const navigate = useNavigate()

  const { supportData } = useData();

  const maskWalletAddress = (address) => {
    if (!address || address.length <= 14) return address;

    return `${address.slice(0, 7)}...${address.slice(-7)}`;
  };


  useEffect(() => {
    if(selectedMethod == "bank") {
      showLoader();
      setTimeout(() => {
        hideLoader()
        showAlert({
          type: "failed",
          message: "Error, bank deposit is currenly unavaliable right now!!, Please select a deffrent method"
        })
        setSelectedMethod("")
      }, 300);
    }else if (selectedMethod == "crypto"){
      navigate("/dashboard/funds/top_up/")
    }
  }, [selectedMethod])

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
    <section className="verification-overlay payment-overlay">
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
      </div>
    </section>
  );
}
