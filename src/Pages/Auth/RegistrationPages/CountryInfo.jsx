import React, { useState, useEffect } from "react";
import CompletedPortionCard from "../../../Components/Cards/CompltedPortionCard";
import FormSelect from "../../../Components/Forms/FormSelect";
import Icon from "../../../Components/Icons/Icon";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import { coptions } from "../../../../env.config";
import { Link, useNavigate } from "react-router";

export default function CountryInfo() {

  const [country, setCountry] = useState("")

  const navigate = useNavigate()

  const handleSave = (e) => {
    e.preventDefault()
    localStorage.setItem("country", country)
    navigate("/signup/personal/")
  }

//   console.log(country)

  const isValid = country.trim();

  return (
    <main className="main-form-info">
      <section className="form-section">
        <div className="steps-wrapper">
          <CompletedPortionCard
            stepNumber={1}
            title="Country of residence"
            line
            active={true}
          />

          <CompletedPortionCard stepNumber={2} line title="Personal details" />

          <CompletedPortionCard stepNumber={3} line title="Verification" />

          <CompletedPortionCard
            stepNumber={4}
            title="Complete"
            style={{ flex: "none" }}
          />
        </div>

        <form action="post" onSubmit={(e) => {isValid && handleSave(e)}} className="login-form signup-form">
          <h3>What country do u live in?</h3>
          <FormSelect
            className="login-form-input signup-form-input"
            labelText="country"
            name="country"
            placeholder="select country"
            options={coptions}
            required
            onchange={(e) => setCountry(e.target.value)}
            defaultValue={country}
          />

          <div className="note-info">
            <h4>
              <Icon name="LuInfo" /> Kindly Note
            </h4>
            <p>
              The documents you can use for verification depend only on your
              selected country of residence. Please double-check your choice.
            </p>
          </div>
          <CustomButton {...(isValid ? {} : { disabled: true })} type="submit">
            Continue
          </CustomButton>
        </form>
        <div className="move-to-create-account">
          <small>Got an account? <Link to="/login/">Login</Link></small>
        </div>
      </section>
    </main>
  );
}
