import { useTranslation } from "../../../auto-il8n";
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
import { FundCard } from "../../../services/CardServices";
import VerificationReviewModal from "../../../Components/Cards/OnReviewCard";
import { convertToUSD, formatUSD, getPrice } from "../../../services/AccountServices";
import { isValid } from "i18n-iso-countries";
import TransactionPinModal from "../../../Components/Cards/TransactionPinCard";
export default function CardDeposit() {
  const {
    t
  } = useTranslation();
  const [step, setStep] = useState(1);
  const totalStep = 1;
  const navigate = useNavigate();
  const {
    userdata,
    useraccount
  } = useData();
  const location = useLocation();
  const {
    showLoader,
    hideLoader
  } = useLoader();
  const {
    showAlert
  } = useAlert();
  const handleBack = currets => {
    setStep(currets - 1);
    window.history.replaceState({}, "", `${location.pathname}${currets - 1}`);
  };
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState();
  const [amountUsd, setAmountUsd] = useState();
  const [showpin, setShowPin] = useState(false);
  const isValid = currency && amountUsd >= 1;
  const aOption = useraccount?.accounts.map(account => ({
    display: <>
        <ReactCountryFlag countryCode={getCountryCode(account.country)} svg />{" "}
        {` ${account.country} (${account.currencyName})`}
      </>,
    value: `${account.currencycode} ${account.currencyName}`
  }));
  const handleCurrencyChange = value => {
    const selected = aOption.find(c => c.value === value);
    setCurrency(selected?.value.split(" ")[1]);
  };
  console.log(currency);
  const handleAmounttr = async value => {
    const amtr = await getPrice(value, currency);
    setAmountUsd(amtr.toFixed(2));
  };
  const handleFundCard = e => {
    e.preventDefault();
    setShowPin(true);
  };
  const handleTransaction = async pin => {
    setShowPin(false);
    showLoader();
    try {
      const response = await FundCard(currency, amount, amountUsd, pin);
      console.log(response);
      if (response?.success) {
        hideLoader();
        showAlert({
          type: "success",
          message: response?.success
        });
        navigate("/card/");
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message: error?.response?.data?.message || error?.message || "Error occurred while processing transaction"
      });
    }
  };
  return <>
      <TransactionPinModal isOpen={showpin} onClose={() => setShowPin(false)} onSubmit={handleTransaction} />
      <div className="progres-loader" style={{
      width: `${step * 100}%`
    }}></div>
      <Vpageheader className="vpage-header" currentv={step} total={totalStep} text="Fund virtual card" />
      <main className="kyc-form-holder">
        {step == 1 ? <>
            <h2>{t("fund_your_card")}</h2>
            <form action="" className="kyc-form" onSubmit={e => {
          isValid && handleFundCard(e);
        }}>
              <FormSelect className="login-form-input" placeholder="Select account" options={aOption} defaultValue={currency} onchange={e => handleCurrencyChange(e.target.value)} labelText="Select account to be debited" />

              <FormInput className="login-form-input" placeholder="Amount to be debited" required defaultValue={amount} onchange={e => {
            setAmount(e.target.value), handleAmounttr(e.target.value);
          }} labelText="Enter amount to be debited" />

              <FormInput className="login-form-input" placeholder="0.00" required defaultValue={amountUsd} readonly labelText="amount you will receive" />

              <CustomButton {...!isValid && {
            disabled: true
          }} type="submit">{t("fund_card")}</CustomButton>
            </form>
          </> : <></>}
      </main>
    </>;
}