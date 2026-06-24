import { useEffect, useState } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link, useNavigate, useLocation } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import AccountCard from "../../../Components/Cards/AccountCard";
import CustomImage from "../../../Components/Images/CustomImage";
import Vpageheader from "../../../Components/NavBars/VpageHeader";
import FormInput from "../../../Components/Forms/FormInputs";
import FormSelect from "../../../Components/Forms/FormSelect";
import { coptions } from "../../../../env.config";
import { submitKYC } from "../../../services/VerifyServices";
import { useAlert } from "../../../contexts/AlertContext";
import { useLoader } from "../../../contexts/LoaderContext";
import TopUpFormInput from "../../../Components/Forms/topUpFormInput";
import { useContext } from "react";
import { getCountryCode } from "../../../helpers/getCountryCode";
import ReactCountryFlag from "react-country-flag";
import VerificationReviewModal from "../../../Components/Cards/OnReviewCard";
import currencies from "../../../assets/currencies.json";
import { createAccount } from "../../../services/AccountServices";

export default function CreateAccount() {
  const [step, setStep] = useState(1);
  const totalStep = 1;
  const navigate = useNavigate();
  const { userdata, useraccount } = useData();
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();

  const [currencyName, setCurrencyName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [sign, setSign] = useState("");

  const is_valid =
    currencyName.trim() && password.trim() && country.trim() && sign.trim;

  //   console.log(currencies)

  const option = currencies.map((currency) => ({
    display: currency.display,
    value: currency.value,
    sign: currency.sign,
  }));

  const handleCurrencyChange = (value) => {
  const selected = currencies.find((c) => c.value === value);

  setCurrencyName(selected?.value);
  setCountry(selected?.country); 
  setSign(selected?.sign)
};


const handleCreateAccount = async (e) => {
    e.preventDefault();
    showLoader()
    try{
        const formData = new FormData();

        formData.append("country", country);
        formData.append("currencyName", currencyName);
        formData.append("currencycode", sign);
        formData.append("password", password);

        const data = await createAccount(formData);
        console.log(data);

    if (data?.success) {
        hideLoader();
        showAlert({
            type: "success",
            message: data?.success || "Account have been created successfully"
        })
        navigate('/accounts/')
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error occurred during verification",
      });
    }
}

  return (
    <>
      <div className="progres-loader" style={{ width: `${step * 100}%` }}></div>
      <Vpageheader
        className="vpage-header"
        currentv={step}
        total={totalStep}
        text="Create Account"
      />
      <main className="kyc-form-holder">
        {step == 1 ? (
          <>
            <h2>Create New Account</h2>
            <form onSubmit={is_valid && handleCreateAccount} className="kyc-form">
              <FormSelect
                className="login-form-input"
                placeholder="Select currency"
                options={option}
                labelText="Select currency"
                onchange={(e) => handleCurrencyChange(e.target.value)}
                defaultValue={currencyName}
              />
              <div className="note-info">
                <h4>
                  <Icon name="LuInfo" /> Kindly Note
                </h4>
                <p>
                  50 currency have been chosen for this selection if your chioce
                  is not avalaible in the selection, Kindly contact support,
                  Thank you.
                </p>
              </div>
              <FormInput
                labelText="Password"
                placeholder="Enter login password to confirm"
                className="login-form-input"
                type="password"
                required
                onchange={(e) =>setPassword(e.target.value)}
              />
              <CustomButton
                {...(is_valid ? {} : { disabled: true })}
                type="submit"
              >
                Create Account
              </CustomButton>
            </form>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
