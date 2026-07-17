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
import PaymentStatusModal from "../../../Components/Cards/TransactionStatusCard";
import TransactionPinModal from "../../../Components/Cards/TransactionPinCard";
import VerificationReviewModal from "../../../Components/Cards/OnReviewCard";
import { SendFunds } from "../../../services/TransactionServices";
import { QRCodeSVG } from "qrcode.react";
import PaymentProcessingModal from "../../../Components/Cards/ProcessingPayment";
export default function DepositeFunds() {
  const {
    t
  } = useTranslation();
  const [step, setStep] = useState(1);
  const totalStep = 2;
  const navigate = useNavigate();
  const {
    userdata,
    useraccount,
    supportData
  } = useData();
  const location = useLocation();
  const {
    showLoader,
    hideLoader
  } = useLoader();
  const {
    showAlert
  } = useAlert();
  const [showprocess, setShowProcess] = useState(false);
  console.log(showprocess);
  const defualtPayment = supportData.paymentWays[0];
  console.log(defualtPayment);
  const [account, setAccount] = useState("");
  const [country, setcountry] = useState("");
  const [bankName, setbankName] = useState("");
  const [accountNumber, setAccountNumber] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const step2valid = bankName.trim() && accountNumber?.length >= 6 && firstName.trim() && lastName.trim();
  const [amount, setAmount] = useState(0);
  const [code, setcode] = useState("");
  const step1Valid = account.trim() && amount >= 10;
  const step3Valid = amount >= 5 && code;
  const [openPin, setOpenPin] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusData, setStatusData] = useState({});
  const handleBack = currets => {
    setStep(currets - 1);
    window.history.replaceState({}, "", `${location.pathname}${currets - 1}`);
  };
  const aOption = useraccount?.accounts.map(account => ({
    display: <>
        <ReactCountryFlag countryCode={getCountryCode(account.country)} svg />{" "}
        {` ${account.country} (${account.currencyName})`}
      </>,
    value: `${account.currencycode} ${account.currencyName}`,
    country: account.country
  }));
  const handleVerification = async (e, cstep) => {
    e.preventDefault();
    console.log("submitted");
    setStep(cstep + 1);
    window.history.replaceState({}, "", `${location.pathname}${cstep + 1}`);
  };
  const handleCurrencyChange = value => {
    const selected = aOption.find(c => c.value === value);
    setAccount(selected?.value.split(" ")[1]);
    setcode(selected?.value.split(" ")[0]);
    setcountry(selected?.country);
  };
  const handleOpenPin = e => {
    e.preventDefault();
    setOpenPin(true);
  };
  const handleStatus = (status, amount, recipient, date) => {
    setStatusData({
      status: status,
      amount: amount,
      recipient: recipient,
      date: date
    });
    setShowStatus(true);
  };
  const handleTransaction = async pin => {
    // console.log(pin);
    showLoader();
    try {
      const formData = new FormData();
      formData.append("account", account);
      formData.append("country", country);
      formData.append("bank_name", bankName);
      formData.append("account_number", accountNumber);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("amount", amount);
      formData.append("code", code);
      formData.append("pin", pin);
      const data = await SendFunds(formData);
      console.log(data);
      if (data) {
        setOpenPin(false);
        hideLoader();
        handleStatus(data.status, data?.amount, data?.recipient, data?.date);
      }
    } catch (error) {
      setOpenPin(false);
      hideLoader();
      showAlert({
        type: "failed",
        message: error?.response?.data?.message || error?.message || "Error occurred while processing transaction"
      });
    }
  };
  const handleStatusClose = () => {
    setShowStatus(false);
    navigate("/dashboard/");
  };
  const copyWalletAddress = async address => {
    try {
      await navigator.clipboard.writeText(address);
      showAlert({
        type: "info",
        message: "Copied"
      });
    } catch (error) {
      console.error("Failed to copy address", error);
    }
  };
  const confirmpayment = e => {
    e.preventDefault();
    setShowProcess(true);
  };
  return <>
      <PaymentStatusModal isOpen={showStatus} status={statusData.status} // success | pending | failed
    amount={statusData.amount} recipient={statusData.recipient} date={statusData.date} onClose={() => handleStatusClose()} />
      <div className="progres-loader" style={{
      width: `${step * 50}%`
    }}></div>
      <Vpageheader className="vpage-header" currentv={step} total={totalStep} text="Add Funds" />
      <main className="kyc-form-holder">
       {showprocess && <PaymentProcessingModal open={showprocess} />}
        {step == 1 ? <>
            <h2>{t("add_funds_to_your_account")}</h2>
            <form onSubmit={e => {
          step1Valid && handleVerification(e, 1);
        }} className="kyc-form">
              <FormSelect className="login-form-input" placeholder="Select account" options={aOption} defaultValue={account} labelText="Select account to topup" onchange={e => handleCurrencyChange(e.target.value)} />
              <div className="note-info">
                <h4>
                  <Icon name="LuInfo" />{t("kindly_note")}</h4>
                <p>{t("the_account_selected_will_be_toped_up_in_the_account_currency")}{" "}
                  <Link>{t("lern_more")}</Link>
                </p>
              </div>
              <FormInput className="login-form-input" placeholder="Enter amount" type="number" labelText="Amount" required onchange={e => setAmount(Number(e.target.value))} />
              <CustomButton {...step1Valid ? {} : {
            disabled: true
          }} type="submit">{t("continue")}</CustomButton>
            </form>
          </> : step == 2 ? <>
            <h2>{t("add_funds_to_your_account")}</h2>

            <form onSubmit={e => {
          confirmpayment(e);
        }} className="kyc-form">

                <div className="note-info">
              <h4>
                <Icon name="LuInfo" />{t("kindly_note")}</h4>
              <p>{t("scan_qrcode_or_copy_wallect_address_to_deposite_crypto_worth_the")}{" "}
                {code}
                {amount}{t("click_confirm_payment_to_have_the_payment_processed_thank_your")}</p>
            </div>

            <div className="crypto-payment">
                {defualtPayment && <>
                    <QRCodeSVG value={defualtPayment.walletAddress} size={180} />
                    <div>
                        <span>
                            <small>{t("name")}{defualtPayment.coinName}</small>
                            <span onClick={() => copyWalletAddress(defualtPayment.coinName)}><Icon name="LuCopy" /></span>
                        </span>
                        <span>
                            <small>{t("network")}{defualtPayment.tokenNetwork}</small>
                            <span onClick={() => copyWalletAddress(defualtPayment.tokenNetwork)}><Icon name="LuCopy" /></span>
                        </span>
                        <span>
                        <small>{defualtPayment.walletAddress}</small>
                        <span onClick={() => copyWalletAddress(defualtPayment.walletAddress)}><Icon name="LuCopy" /></span>
                    </span>
                    </div>
                    </>}
            </div>

              <CustomButton type="submit">{t("confirm_payment")}</CustomButton>
            </form>
          </> : <>
            <TransactionPinModal isOpen={openPin} onClose={() => setOpenPin(false)} onSubmit={handleTransaction} />
            <h2>{t("set_amount")}</h2>
            <form onSubmit={e => {
          step3Valid && handleOpenPin(e);
        }} className="kyc-form">
              <FormInput className="login-form-input" placeholder="Enter amount" type="number" labelText="Amount to send" required onchange={e => setAmount(Number(e.target.value) + 0.2)} />
              <div className="note-info">
                <h4>
                  <Icon name="LuInfo" />{t("kindly_note")}</h4>
                <p>{t("there_is_a_service_fee_of_the_value_of_0_20_for_every_transaction_made_amount_to_be_sent_must_not_be_less_than_5_for_free_transactions_kindly_get_a_discount_appoval_thank_you")}{" "}
                  <Link>{t("learn_more")}</Link>
                </p>
              </div>

              <FormInput className="login-form-input" placeholder="" type="number" labelText="Amount to be debited" defaultValue={amount} readonly />

              <CustomButton {...step3Valid ? {} : {
            disabled: true
          }} type="submit">{t("send_money")}</CustomButton>
            </form>
          </>}
      </main>
    </>;
}