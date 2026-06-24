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

export default function CardDeposit() {
  const [step, setStep] = useState(1);
  const totalStep = 2;
  const navigate = useNavigate();
  const { userdata, useraccount } = useData();
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();

  const handleBack = (currets) => {
    setStep(currets - 1);
    window.history.replaceState({}, "", `${location.pathname}${currets - 1}`);
  }

  console.log(useraccount);

  const aOption = useraccount?.accounts.map((account) => ({
  display: (
    <>
      <ReactCountryFlag countryCode={getCountryCode(account.country)} svg />
      {" "}
      {` ${account.country} (${account.currencyName})`}
    </>
  ),
  value:` ${account.currencycode} ${account.currencyName}`
    
}));

console.log(aOption)
  return (
    <>
      <div
        className="progres-loader"
        style={{ width: `${step * 50}%` }}
      ></div>
      <Vpageheader className="vpage-header" currentv={step} total={totalStep} />
      <main className="kyc-form-holder">
        {step == 1 ? (
            <>
            <h2>Fund your card</h2>
            <form action="" className="kyc-form">
                <TopUpFormInput labelText="Amount to be debited" option={aOption} />
            </form>
            </>
        ): (
            <></>
        )}
      </main>
    </>
  );
}
