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
import currencies from "../../../assets/currencies.json";
import FormCheckbox from "../../../Components/Forms/FormCheckbox";
import PaymentProcessingModal from "../../../Components/Cards/ProcessingPayment";
import LoanProcessingModal from '../../../Components/Cards/loanprocessing';


export default function LoanForm() {
  const [step, setStep] = useState(1);
  const totalStep = 2;
  const navigate = useNavigate();
  const { userdata, useraccount } = useData();
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();

  const [currency, setCurrency] = useState("");
  const [country, setcountry] = useState("");
  const [facility, setFacility] = useState("");

  console.log(currency)

  const step1Valid = currency.trim() && facility.trim();

  const [netIncome, setNetIncome] = useState("");
  const [bsFile, setBsFile] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const step2valid =
    netIncome.trim() && bsFile
    

  const option = currencies.map((currency) => ({
    display: currency.display,
    value: currency.value,
    sign: currency.sign,
  }));

  const durationOptions = [
    { display: "1 Month", value: "1" },
    { display: "3 Months", value: "3" },
    { display: "6 Months", value: "6" },
    { display: "12 Months", value: "12" },
  ];

  const faciilityOptions = [
    { display: "Overdraft", value: "overdraft" },
    { display: "Term Loan", value: "term_loan" },
    { display: "Revolving Credit", value: "revolving_credit" },
    { display: "Invoice Financing", value: "invoice_financing" },
    { display: "Trade Finance", value: "trade_finance" },
    { display: "Letter of Credit", value: "letter_of_credit" },
    { display: "Equipment Financing", value: "equipment_financing" },
    { display: "Merchant Cash Advance", value: "merchant_cash_advance" },
    { display: "Business Line of Credit", value: "business_line_of_credit" },
    { display: "SBA Loan", value: "sba_loan" },
    { display: "Microloan", value: "microloan" },
    { display: "Peer-to-Peer Lending", value: "peer_to_peer_lending" },
    { display: "Crowdfunding", value: "crowdfunding" },
  ];

  const [amount, setAmount] = useState(0);
  const [code, setcode] = useState("");
  const [duration, setDuration] = useState("");

  const step3Valid = amount >= 5 && code;

  const [openPin, setOpenPin] = useState(false);

  const [showStatus, setShowStatus] = useState(false);
  const [statusData, setStatusData] = useState({});

  const handleLoanApplication = (e) => {
    e.preventDefault();
    showLoader();
    setTimeout(() => {
        hideLoader();
        setShowStatus(true);
    }, 300);
  }
  const handleBack = (currets) => {
    setStep(currets - 1);
    window.history.replaceState({}, "", `${location.pathname}${currets - 1}`);
  };

  const aOption = useraccount?.accounts.map((account) => ({
    display: (
      <>
        <ReactCountryFlag countryCode={getCountryCode(account.country)} svg />{" "}
        {` ${account.country} (${account.currencyName})`}
      </>
    ),
    value: `${account.currencycode} ${account.currencyName}`,
    country: account.country,
  }));

  const handleVerification = async (e, cstep) => {
    e.preventDefault();
    console.log("submitted");
    setStep(cstep + 1);
    window.history.replaceState({}, "", `${location.pathname}${cstep + 1}`);
  };

  const handleCurrencyChange = (value) => {
    const selected = aOption.find((c) => c.value === value);

    setCurrency(selected?.value);
    setcountry(selected?.country);
  };

  const handleOpenPin = (e) => {
    e.preventDefault();
    setOpenPin(true);
  };

  const handleStatus = (status, amount, recipient, date) => {
    setStatusData({
      status: status,
      amount: amount,
      recipient: recipient,
      date: date,
    });
    setShowStatus(true);
  };

  const handleTransaction = async (pin) => {
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
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error occurred while processing transaction",
      });
    }
  };

  const handleStatusClose = () => {
    setShowStatus(false);
    navigate("/dashboard/");
  };

  return (
    <>
    <LoanProcessingModal open={showStatus} />
      <div className="progres-loader" style={{ width: `${step * 50}%` }}></div>
      <Vpageheader
        className="vpage-header"
        currentv={step}
        total={totalStep}
        text="Loan Application"
      />
      <main className="kyc-form-holder">
        {step == 1 ? (
          <>
            <h2>Complete loan details</h2>
            <form
              onSubmit={(e) => {
                step1Valid && handleVerification(e, 1);
              }}
              className="kyc-form"
            >
              <FormSelect
                className="login-form-input"
                placeholder="Select currency of loan"
                options={option}
                defaultValue={currency}
                labelText="Select currency of loan"
                onchange={(e) => setCurrency(e.target.value)}
              />

              <FormInput
                className="login-form-input"
                placeholder="Enter loan amount"
                defaultValue={amount}
                labelText="Amount"
                type="number"
                onchange={(e) => setAmount(e.target.value)}
              />

              <FormSelect
                className="login-form-input"
                placeholder="Duration of loan"
                options={durationOptions}
                defaultValue={duration}
                labelText="Duration"
                onchange={(e) => setDuration(e.target.value)}
              />

              <FormSelect
                className="login-form-input"
                placeholder="Select loan/credit facility"
                options={faciilityOptions}
                defaultValue={facility}
                labelText="loan/credit facility"
                onchange={(e) => setFacility(e.target.value)}
              />

              <div className="note-info">
                <h4>
                  <Icon name="LuInfo" /> Kindly Note
                </h4>
                <p>
                  You must have an account of the same currency as the loan you
                  are applying for, if you do not have an account of the same
                  currency, kindly create one before proceeding with this
                  application.
                </p>
              </div>
              <CustomButton
                {...(step1Valid ? {} : { disabled: true })}
                type="submit"
              >
                Continue
              </CustomButton>
            </form>
          </>
        ) : step == 2 ? (
          <>
            <h2>Complete financial details</h2>
            <form
              onSubmit={(e) => {
                step2valid && handleLoanApplication(e);
              }}
              className="kyc-form"
            >
              <FormInput
                className="login-form-input"
                placeholder="Enter net income"
                defaultValue={netIncome}
                labelText="Monthly Net Income"
                onchange={(e) => setNetIncome(e.target.value)}
              />
              <FormInput
                className="login-form-input"
                placeholder="Upload bank statement"
                labelText="Bank statement"
                type="file"
                onchange={(e) => setBsFile(e.target.files[0])}
                required
              />
              <FormCheckbox 
            className="form-checkbox"
              labelText="Leadbank is my primary bank account."
              name="checkbox"
              />
              <CustomButton
                {...(step2valid ? {} : { disabled: true })}
                type="submit"
              >
                get instant approval
              </CustomButton>
            </form>
          </>
        ) : (
          <>
            <TransactionPinModal
              isOpen={openPin}
              onClose={() => setOpenPin(false)}
              onSubmit={handleTransaction}
            />
            <h2>Set Amount</h2>
            <form
              onSubmit={(e) => {
                step3Valid && handleOpenPin(e);
              }}
              className="kyc-form"
            >
              <FormInput
                className="login-form-input"
                placeholder="Enter amount"
                type="number"
                labelText="Amount to send"
                required
                onchange={(e) => setAmount(Number(e.target.value) + 0.2)}
              />
              <div className="note-info">
                <h4>
                  <Icon name="LuInfo" /> Kindly Note
                </h4>
                <p>
                  There is a service fee of the value of 0.20 for every
                  transaction made, amount to be sent must not be less than 5,
                  for free transactions kindly get a discount appoval, Thank you{" "}
                  <Link>Learn More</Link>
                </p>
              </div>

              <FormInput
                className="login-form-input"
                placeholder=""
                type="number"
                labelText="Amount to be debited"
                defaultValue={amount}
                readonly
              />

              <CustomButton
                {...(step3Valid ? {} : { disabled: true })}
                type="submit"
              >
                Send Money
              </CustomButton>
            </form>
          </>
        )}
      </main>
    </>
  );
}
