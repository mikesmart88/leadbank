import React, { useState, useEffect } from "react";
import CompletedPortionCard from "../../../Components/Cards/CompltedPortionCard";
import FormSelect from "../../../Components/Forms/FormSelect";
import Icon from "../../../Components/Icons/Icon";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import { coptions } from "../../../../env.config";
import { Link, useNavigate } from "react-router";
import FormInput from "../../../Components/Forms/FormInputs";
import FormCheckbox from "../../../Components/Forms/FormCheckbox";

export default function PersoanlInfo() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setphoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [refCode, setRefCode] = useState("");
  const [argreement, setaggrement ] = useState(false)

  const isValid =
    firstName.trim() &&
    lastName.trim() &&
    phone &&
    gender.trim() &&
    email.trim() &&
    argreement

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "personaldata",
      JSON.stringify({
        fname: firstName,
        lname: lastName,
        midname: middleName,
        gender: gender,
        phone: phone,
        email: email,
        refcode: refCode,
        argreement: argreement
      })
    );
    navigate("/signup/setpassword/");
  };

  const gender_optioins = [
    { display: "Male", value: "male" },
    { display: "Female", value: "female" },
    { display: "Rather not say", value: "Rather not say" },
  ];

  return (
    <main className="main-form-info">
      <section className="form-section">
        <div className="steps-wrapper">
          <CompletedPortionCard
            stepNumber={1}
            title="Country of residence"
            line
            completed
          />

          <CompletedPortionCard
            stepNumber={2}
            line
            title="Personal details"
            active={true}
          />

          <CompletedPortionCard stepNumber={3} line title="Verification" />

          <CompletedPortionCard
            stepNumber={4}
            title="Complete"
            style={{ flex: "none" }}
          />
        </div>
        <form
          action="post"
          onSubmit={(e) => {
            isValid && handleSave(e);
          }}
          className="login-form signup-form"
        >
          <h3>Personal Information?</h3>
          <FormInput
            className="login-form-input signup-form-input"
            labelText="First name (as it is on your ID)"
            required
            defaultValue={firstName}
            onchange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your legal first name"
          />

          <FormInput
            className="login-form-input signup-form-input"
            labelText="Middle name (optional)"
            defaultValue={middleName}
            onchange={(e) => setMiddleName(e.target.value)}
            placeholder="Enter your legal middle name"
          />

          <FormInput
            className="login-form-input signup-form-input"
            labelText="Last name (as it is on your ID)"
            required
            defaultValue={lastName}
            onchange={(e) => setLastName(e.target.value)}
            placeholder="Enter your legal last name"
          />

          <FormSelect
            className="login-form-input signup-form-input"
            labelText="Gender"
            required
            defaultValue={gender}
            onchange={(e) => setGender(e.target.value)}
            options={gender_optioins}
            placeholder="Select your gender"
          />

          <FormInput
            className="login-form-input signup-form-input"
            labelText="Email address"
            required
            defaultValue={email}
            onchange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            type="email"
          />

          <FormInput
            className="login-form-input signup-form-input"
            labelText="Phone number (without country code)"
            required
            defaultValue={phone}
            onchange={(e) => setphoneNumber(e.target.value)}
            placeholder="Enter phone number"
            type="number"
          />

          <FormInput
            className="login-form-input signup-form-input"
            labelText="Referral code (optional)"
            defaultvalue={refCode}
            onchange={(e) => setRefCode(e.target.value)}
            placeholder="Enter referral code"
          />

          <FormCheckbox
            className="form-checkbox"
            labelText="I confirm that the names entered match the names on my ID"
            name="checkbox"
            defaultvalue={argreement}
            required
            onchange={(e) => setaggrement(e.target.value)}
          />

          <CustomButton {...(isValid ? {} : { disabled: true })} type="submit">
            Continue
          </CustomButton>
        </form>
        <div className="move-to-create-account">
          <small>
            Got an account? <Link to="/login/">Login</Link>
          </small>
        </div>
      </section>
    </main>
  );
}
