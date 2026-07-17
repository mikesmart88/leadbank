import { useTranslation } from "../../../auto-il8n";
import React, { useState, useEffect } from "react";
import CompletedPortionCard from "../../../Components/Cards/CompltedPortionCard";
import FormSelect from "../../../Components/Forms/FormSelect";
import Icon from "../../../Components/Icons/Icon";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import { coptions } from "../../../../env.config";
import { Link, useNavigate } from "react-router";
import FormInput from "../../../Components/Forms/FormInputs";
import FormCheckbox from "../../../Components/Forms/FormCheckbox";
export default function PassInfo() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [password, setpassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValid = password.trim() == confpassword.trim();
  const handleSave = e => {
    e.preventDefault();
    localStorage.setItem("password", password);
    navigate("/signup/setpin/");
  };
  const gender_optioins = [{
    display: "Male",
    value: "male"
  }, {
    display: "Female",
    value: "female"
  }, {
    display: "Rather not say",
    value: "Rather not say"
  }];
  return <main className="main-form-info">
      <section className="form-section">
        <div className="steps-wrapper">
          <CompletedPortionCard stepNumber={1} title="Country of residence" line completed />

          <CompletedPortionCard stepNumber={2} line title="Personal details" completed />

          <CompletedPortionCard stepNumber={3} line title="Create password" active={true} />

          <CompletedPortionCard stepNumber={4} title="Complete" style={{
          flex: "none"
        }} />
        </div>
        <form action="post" onSubmit={e => {
        isValid && handleSave(e);
      }} className="login-form signup-form">
          <h3>{t("create_password")}</h3>
          <FormInput className="login-form-input signup-form-input" labelText="Password" required defaultvalue={password} type="password" onchange={e => setpassword(e.target.value)} placeholder="Enter password (min of 8 characters)" />

          <FormInput className="login-form-input signup-form-input" labelText="Confirm password" type="password" defaultValue={confpassword} onchange={e => setConfPassword(e.target.value)} placeholder="Enter same password" />
          <FormCheckbox className="form-checkbox" labelText={<>{t("i_accept_the")}<Link>{t("terms_of_use")}</Link>{t("and")}{" "}
                <Link>{t("privacy_policy")}</Link>{t("")}</>} name="checkbox" required />

          <CustomButton {...isValid ? {} : {
          disabled: true
        }} type="submit">{t("continue")}</CustomButton>
        </form>
        <div className="move-to-create-account">
          <small>{t("got_an_account")}<Link to="/login/">{t("login")}</Link>
          </small>
        </div>
      </section>
    </main>;
}