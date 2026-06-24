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
import { useContext } from "react";
import VerificationReviewModal from "../../../Components/Cards/OnReviewCard";

export default function KYCVerification() {
  const [step, setStep] = useState(1);
  const totalStep = 3;
  const navigate = useNavigate();
  const { userdata } = useData();
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();

  const [showReview, setShowReview] = useState(false);

  //step 1 data
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [poa, setPoa] = useState("");
  const [poaDoc, setPoaDoc] = useState();

  const step1Valid =
    dob.trim() &&
    address.trim() &&
    state.trim() &&
    city.trim() &&
    zipCode.trim() &&
    poa.trim() &&
    poaDoc;

  // step 2 data
  const [country, setCountry] = useState(userdata?.country || "");
  const [cob, setCob] = useState("");
  const [nationality, setnationality] = useState("");

  const step2valid = country.trim() && cob.trim() && nationality.trim();

  // step 3 date
  const [docfront, setDocFront] = useState();
  const [docback, setDocBack] = useState();

  const step3Valid = docfront && docback && step1Valid && step2valid;

  const handleVerification = async (e, cstep) => {
    e.preventDefault();
    console.log("submitted");
    setStep(cstep + 1);
    window.history.replaceState({}, "", `${location.pathname}${cstep + 1}`);
  };

  const handleAccountVerification = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const formData = new FormData();

      formData.append("dateOfBirth", dob);
      formData.append("address1", address);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("zipCode", zipCode);
      formData.append("documentType", poa);
      formData.append("ProofOfAddressDoc", poaDoc);
      formData.append("countryOfBirth", country);
      formData.append("cityOfBirth", cob);
      formData.append("nationality", nationality);
      formData.append("nidImagefront", docfront);
      formData.append("nidImageback", docback);

      const data = await submitKYC(formData);
      console.log(data);

      if (data?.success) {
        hideLoader();
        setShowReview(true);
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
  };

  const handleBack = (currets) => {
    setStep(currets - 1);
    window.history.replaceState({}, "", `${location.pathname}${currets - 1}`);
  }

  const addressProof = [
    { display: "Select proof of address", value: "" },
    { display: "Utility bill", value: "Utility bill" },
    { display: "Tax statement/report", value: "Tax statement/report" },
    { display: "Rental/lease agreement", value: "Rental/lease agreement" },
    { display: "Bank statement", value: "Bank statement" },
  ];

  return (
    <>
      {showReview && (
        <VerificationReviewModal
          isOpen={true}
          dob={dob}
          address={address}
          poa={poa}
          poadoc={poaDoc?.name}
          onClose={() => setShowReview(false)}
        />
      )}
      <div
        className="progres-loader"
        style={{ width: `${step * 33.3}%` }}
      ></div>
      <Vpageheader className="vpage-header" currentv={step} total={totalStep} />
      <main className="kyc-form-holder">
        {step == 1 ? (
          <>
            <h2>Complete your KYC</h2>
            <form
              className="kyc-form"
              action="post"
              onSubmit={(e) => {
                step1Valid && handleVerification(e, 1);
              }}
            >
              <FormInput
                className="kyc-form-input login-form-input"
                labelText="Date of birth"
                name="bod"
                type="date"
                defaultValue={dob}
                onchange={(e) => setDob(e.target.value)}
                required
              />
              <FormSelect
                labelText="Country"
                name="country"
                placeholder="Enter country"
                defaultValue={userdata?.country}
                disabled
                className="kyc-form-input login-form-input"
              />
              <FormInput
                className="kyc-form-input login-form-input"
                labelText="Home address"
                name="address"
                type="text"
                placeholder="Enter street address"
                defaultValue={address}
                onchange={(e) => setAddress(e.target.value)}
                required
              />
              <div className="hold-together-input">
                <FormInput
                  className="kyc-form-input login-form-input"
                  labelText="State"
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  defaultValue={state}
                  onchange={(e) => setState(e.target.value)}
                  required
                />
                <FormInput
                  className="kyc-form-input login-form-input"
                  labelText="City"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  defaultValue={city}
                  onchange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <FormInput
                className="kyc-form-input login-form-input"
                labelText="Zip code (Postal code)"
                name="postal-code"
                type="number"
                placeholder="Enter postal code"
                defaultValue={zipCode}
                onchange={(e) => setZipCode(e.target.value)}
                required
              />
              <FormSelect
                className="kyc-form-input login-form-input"
                labelText="Proof of address type"
                name="proof-address"
                placeholder="Select proof of address"
                defaultValue={poa}
                onchange={(e) => setPoa(e.target.value)}
                options={addressProof}
              />
              <FormInput
                className="kyc-form-input login-form-input"
                labelText="Upload proof of address document"
                name="poa-doc"
                type="file"
                onChange={(e) => setPoaDoc(e.target.files[0])}
                placeholder="Upload document"
                required
              />

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
            <h2>What's your place of origin?</h2>
            <form
              className="kyc-form"
              onSubmit={(e) => {
                step1Valid && handleVerification(e, 2);
              }}
            >
              <FormSelect
                labelText="Country of birth"
                name="country"
                placeholder="slect country"
                defaultValue={country}
                onchange={(e) => setCountry(e.target.value)}
                className="kyc-form-input login-form-input"
                options={coptions}
              />
              <FormInput
                className="kyc-form-input login-form-input"
                labelText="City of birth"
                name="cob"
                type="text"
                placeholder="Enter city"
                defaultValue={cob}
                onchange={(e) => setCob(e.target.value)}
                required
              />
              <FormSelect
                className="kyc-form-input login-form-input"
                labelText="Nationality"
                name="nationality"
                placeholder="Select nationality"
                defaultValue={nationality}
                onchange={(e) => setnationality(e.target.value)}
                options={coptions}
              />
              <CustomButton
                {...(step2valid ? {} : { disabled: true })}
                type="submit"
              >
                Continue
              </CustomButton>
            </form>
             <small onClick={() => handleBack(2)} style={{ color: "#020202 !important" }} className="more-logout kyc-back">
              <Icon name="LuArrowLeft" /> Back{" "}
            </small>
          </>
        ) : (
          <>
            <h2>One more step</h2>
            <form
              className="kyc-form"
              onSubmit={step3Valid && handleAccountVerification}
            >
              <small>
                Before you can make any transaction on Leadbank, we're required
                by law to verify your identity
              </small>
              <small>
                To do this, you'll have to upload a copy of a valid
                government-issued ID like an;
              </small>
              <ul>
                <li>International Passport</li>
                <li>National ID</li>
                <li>Driver's License</li>
              </ul>
              <FormInput
                className="kyc-form-input login-form-input"
                labelText="Upload front of Document"
                name="vdocument"
                type="file"
                placeholder="Upload document"
                onChange={(e) => setDocFront(e.target.files[0])}
                required
              />

              <FormInput
                className="kyc-form-input login-form-input"
                labelText="Upload back of Document"
                name="vdocument"
                type="file"
                placeholder="Upload document"
                onChange={(e) => setDocBack(e.target.files[0])}
                required
              />

              <div className="note-info">
                <h4>
                  <Icon name="LuInfo" /> Kindly Note
                </h4>
                <p>
                  Please make sure to upload a valid document with more than 2
                  months until expiration.
                </p>
              </div>

              <CustomButton
                {...(step3Valid ? {} : { disabled: true })}
                type="submit"
              >
                Begin Identity Verification
              </CustomButton>
            </form>
            <small onClick={() => handleBack(3)} style={{ color: "#020202 !important" }} className="more-logout kyc-back">
              <Icon name="LuArrowLeft" /> Back{" "}
            </small>
          </>
        )}
      </main>
    </>
  );
}
