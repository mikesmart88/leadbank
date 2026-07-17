import { useTranslation } from "../../../auto-il8n";
import React, { useEffect, useState } from "react";
import icon from "../../../assets/images/another-icon.png";
import CustomImage from "../../../Components/Images/CustomImage";
import FormInput from "../../../Components/Forms/FormInputs";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import { useAlert } from "../../../contexts/AlertContext";
import { useLoader } from "../../../contexts/LoaderContext";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { ResetTransactionPin } from '../../../services/AuthServices';
export default function ResetPin() {
  const {
    t
  } = useTranslation();
  const [pin, setPin] = useState("");
  const [confPin, setConfPin] = useState("");
  const {
    showLoader,
    hideLoader
  } = useLoader();
  const {
    showAlert
  } = useAlert();
  const navigate = useNavigate();
  const {
    token
  } = useParams();
  const isValid = pin.trim() && confPin.trim() && confPin === pin;
  const handleSubmit = async e => {
    e.preventDefault();
    showLoader();
    try {
      const response = await ResetTransactionPin(pin, token);
      if (response?.success) {
        hideLoader();
        showAlert({
          type: "success",
          message: response?.success || "Transacton pin reset successfully"
        });
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message: error.response?.data?.message || error.message || "An error occurred while resetting the password"
      });
    }
  };
  return <>
      <section className="login-section">
        <section className="form-section">
          <h2>
            <CustomImage source={icon} altText="leadbank icon image" />{t("leadbank")}</h2>
          <form className="login-form" onSubmit={e => {
          isValid && handleSubmit(e);
        }}>
            <h3>{t("reset_transaction_pin")}</h3>
            <FormInput className="login-form-input" labelText="New Pin" required placeholder="Enter your new pin" type="number" name="reset-pin-new" defaultValue={pin} onchange={e => setPin(e.target.value)} />
            <FormInput className="login-form-input" labelText="Confirm New Pin" required placeholder="Confirm your new pin" type="number" name="reset-pin-confirm" defaultValue={confPin} onchange={e => setConfPin(e.target.value)} />
            <CustomButton {...isValid ? {} : {
            disabled: true
          }} type="submit">{t("reset_pin")}</CustomButton>
          </form>
          <div className="move-to-create-account">
            <small>{t("remembered_your_pin")}<Link to="/dashboard/">{t("back_to_dashboard")}</Link>
            </small>
          </div>
        </section>
      </section>
    </>;
}