import { useTranslation } from "../../auto-il8n";
import { useRef, useState, useEffect } from "react";
import Input from "../Inputs/Input";
import CustomButton from "../Buttons/CustomButtons";
export default function TransactionPinModal({
  isOpen,
  onClose,
  onSubmit,
  className,
  style
}) {
  const {
    t
  } = useTranslation();
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    if (!isOpen) {
      setPin(["", "", "", ""]);
    }
  }, [isOpen]);
  if (!isOpen) {
    // setPin([])
    return null;
  }
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
    if (newPin.every(digit => digit !== "")) {
      onSubmit(newPin.join(""));
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  const addDigit = digit => {
    const emptyIndex = pin.findIndex(item => item === "");
    if (emptyIndex === -1) return;
    const newPin = [...pin];
    newPin[emptyIndex] = digit;
    setPin(newPin);
    if (emptyIndex < 3) {
      inputRefs[emptyIndex + 1].current.focus();
    }
    if (newPin.every(digit => digit !== "")) {
      onSubmit(newPin.join(""));
    }
  };
  const removeDigit = () => {
    const lastFilled = [...pin].map((v, i) => v ? i : -1).filter(i => i !== -1).pop();
    if (lastFilled === undefined) return;
    const newPin = [...pin];
    newPin[lastFilled] = "";
    setPin(newPin);
  };
  return <div className="verification-overlay card-overlay pin-overlay">
      <div className="pin-modal card-details-show">
        <h3>{t("enter_transaction_pin")}</h3>
        <p>{t("please_enter_your_4_digit_transaction_pin")}</p>

        <div className="pin-inputs">
          {pin.map((digit, index) => <input key={index} ref={inputRefs[index]} type="password" maxLength="1" value={digit} onChange={e => handleChange(e.target.value, index)} onKeyDown={e => handleKeyDown(e, index)} />)}
        </div>

        <div className="mobile-keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => <CustomButton key={num} type="button" onClick={() => addDigit(num.toString())}>
              {num}
            </CustomButton>)}

          <CustomButton style={{
          background: "#1a202c",
          color: "white"
        }} type="button" onClick={removeDigit}>{t("")}</CustomButton>

          <CustomButton type="button" onClick={() => addDigit("0")}>{t("0")}</CustomButton>
        </div>

        <CustomButton className="close-btn" onClick={() => {
        onClose();
        setPin(["", "", "", ""]);
      }}>{t("cancel")}</CustomButton>
      </div>
    </div>;
}