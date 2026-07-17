import { useTranslation } from "../../../auto-il8n";
import React, { useState, useEffect } from "react";
import CompletedPortionCard from "../../../Components/Cards/CompltedPortionCard";
import FormSelect from "../../../Components/Forms/FormSelect";
import Icon from "../../../Components/Icons/Icon";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import { coptions } from "../../../../env.config";
import { Link, useNavigate } from "react-router";
export default function CountryInfo() {
  const {
    t
  } = useTranslation();
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const handleSave = e => {
    e.preventDefault();
    localStorage.setItem("country", country);
    navigate("/signup/personal/");
  };

  //   console.log(country)

  const isValid = country.trim();
  return <main className="main-form-info">
      <section className="form-section">
        <div className="steps-wrapper">
          <CompletedPortionCard stepNumber={1} title="Country of residence" line active={true} />

          <CompletedPortionCard stepNumber={2} line title="Personal details" />

          <CompletedPortionCard stepNumber={3} line title="Verification" />

          <CompletedPortionCard stepNumber={4} title="Complete" style={{
          flex: "none"
        }} />
        </div>

        <form action="post" onSubmit={e => {
        isValid && handleSave(e);
      }} className="login-form signup-form">
          <h3>{t("what_country_do_u_live_in")}</h3>
          <FormSelect className="login-form-input signup-form-input" labelText="country" name="country" placeholder="select country" options={coptions} required onchange={e => setCountry(e.target.value)} defaultValue={country} />

          <div className="note-info">
            <h4>
              <Icon name="LuInfo" />{t("kindly_note")}</h4>
            <p>{t("the_documents_you_can_use_for_verification_depend_only_on_your_selected_country_of_residence_please_double_check_your_choice")}</p>
          </div>
          <CustomButton {...isValid ? {} : {
          disabled: true
        }} type="submit">{t("continue")}</CustomButton>
        </form>
        <div className="move-to-create-account">
          <small>{t("got_an_account")}<Link to="/login/">{t("login")}</Link></small>
        </div>
      </section>
    </main>;
}