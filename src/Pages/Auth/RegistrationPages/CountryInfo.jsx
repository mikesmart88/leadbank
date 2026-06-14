import React, { useState, useEffect } from "react";
import CompletedPortionCard from "../../../Components/Cards/CompltedPortionCard";
import FormSelect from "../../../Components/Forms/FormSelect";
import Icon from "../../../Components/Icons/Icon";
import CustomButton from "../../../Components/Buttons/CustomButtons";

export default function CountryInfo() {
  const coptions = [
    { display: "Selct Country", value: "" },
    { display: "Afghanistan", value: "Afghanistan" },
    { display: "Albania", value: "Albania" },
    { display: "Algeria", value: "Algeria" },
    { display: "Andorra", value: "Andorra" },
    { display: "Angola", value: "Angola" },
    { display: "Antigua and Barbuda", value: "Antigua and Barbuda" },
    { display: "Argentina", value: "Argentina" },
    { display: "Armenia", value: "Armenia" },
    { display: "Australia", value: "Australia" },
    { display: "Austria", value: "Austria" },
    { display: "Azerbaijan", value: "Azerbaijan" },

    { display: "Bahamas", value: "Bahamas" },
    { display: "Bahrain", value: "Bahrain" },
    { display: "Bangladesh", value: "Bangladesh" },
    { display: "Barbados", value: "Barbados" },
    { display: "Belarus", value: "Belarus" },
    { display: "Belgium", value: "Belgium" },
    { display: "Belize", value: "Belize" },
    { display: "Benin", value: "Benin" },
    { display: "Bhutan", value: "Bhutan" },
    { display: "Bolivia", value: "Bolivia" },
    { display: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
    { display: "Botswana", value: "Botswana" },
    { display: "Brazil", value: "Brazil" },
    { display: "Brunei", value: "Brunei" },
    { display: "Bulgaria", value: "Bulgaria" },
    { display: "Burkina Faso", value: "Burkina Faso" },
    { display: "Burundi", value: "Burundi" },

    { display: "Cabo Verde", value: "Cabo Verde" },
    { display: "Cambodia", value: "Cambodia" },
    { display: "Cameroon", value: "Cameroon" },
    { display: "Canada", value: "Canada" },
    { display: "Central African Republic", value: "Central African Republic" },
    { display: "Chad", value: "Chad" },
    { display: "Chile", value: "Chile" },
    { display: "China", value: "China" },
    { display: "Colombia", value: "Colombia" },
    { display: "Comoros", value: "Comoros" },
    { display: "Congo", value: "Congo" },
    { display: "Costa Rica", value: "Costa Rica" },
    { display: "Côte d'Ivoire", value: "Côte d'Ivoire" },
    { display: "Croatia", value: "Croatia" },
    { display: "Cuba", value: "Cuba" },
    { display: "Cyprus", value: "Cyprus" },
    { display: "Czech Republic", value: "Czech Republic" },

    {
      display: "Democratic Republic of the Congo",
      value: "Democratic Republic of the Congo",
    },
    { display: "Denmark", value: "Denmark" },
    { display: "Djibouti", value: "Djibouti" },
    { display: "Dominica", value: "Dominica" },
    { display: "Dominican Republic", value: "Dominican Republic" },

    { display: "Ecuador", value: "Ecuador" },
    { display: "Egypt", value: "Egypt" },
    { display: "El Salvador", value: "El Salvador" },
    { display: "Equatorial Guinea", value: "Equatorial Guinea" },
    { display: "Eritrea", value: "Eritrea" },
    { display: "Estonia", value: "Estonia" },
    { display: "Eswatini", value: "Eswatini" },
    { display: "Ethiopia", value: "Ethiopia" },

    { display: "Fiji", value: "Fiji" },
    { display: "Finland", value: "Finland" },
    { display: "France", value: "France" },

    { display: "Gabon", value: "Gabon" },
    { display: "Gambia", value: "Gambia" },
    { display: "Georgia", value: "Georgia" },
    { display: "Germany", value: "Germany" },
    { display: "Ghana", value: "Ghana" },
    { display: "Greece", value: "Greece" },
    { display: "Grenada", value: "Grenada" },
    { display: "Guatemala", value: "Guatemala" },
    { display: "Guinea", value: "Guinea" },
    { display: "Guinea-Bissau", value: "Guinea-Bissau" },
    { display: "Guyana", value: "Guyana" },

    { display: "Haiti", value: "Haiti" },
    { display: "Honduras", value: "Honduras" },
    { display: "Hungary", value: "Hungary" },

    { display: "Iceland", value: "Iceland" },
    { display: "India", value: "India" },
    { display: "Indonesia", value: "Indonesia" },
    { display: "Iran", value: "Iran" },
    { display: "Iraq", value: "Iraq" },
    { display: "Ireland", value: "Ireland" },
    { display: "Israel", value: "Israel" },
    { display: "Italy", value: "Italy" },

    { display: "Jamaica", value: "Jamaica" },
    { display: "Japan", value: "Japan" },
    { display: "Jordan", value: "Jordan" },

    { display: "Kazakhstan", value: "Kazakhstan" },
    { display: "Kenya", value: "Kenya" },
    { display: "Kiribati", value: "Kiribati" },
    { display: "Kuwait", value: "Kuwait" },
    { display: "Kyrgyzstan", value: "Kyrgyzstan" },

    { display: "Laos", value: "Laos" },
    { display: "Latvia", value: "Latvia" },
    { display: "Lebanon", value: "Lebanon" },
    { display: "Lesotho", value: "Lesotho" },
    { display: "Liberia", value: "Liberia" },
    { display: "Libya", value: "Libya" },
    { display: "Liechtenstein", value: "Liechtenstein" },
    { display: "Lithuania", value: "Lithuania" },
    { display: "Luxembourg", value: "Luxembourg" },

    { display: "Madagascar", value: "Madagascar" },
    { display: "Malawi", value: "Malawi" },
    { display: "Malaysia", value: "Malaysia" },
    { display: "Maldives", value: "Maldives" },
    { display: "Mali", value: "Mali" },
    { display: "Malta", value: "Malta" },
    { display: "Marshall Islands", value: "Marshall Islands" },
    { display: "Mauritania", value: "Mauritania" },
    { display: "Mauritius", value: "Mauritius" },
    { display: "Mexico", value: "Mexico" },
    { display: "Micronesia", value: "Micronesia" },
    { display: "Moldova", value: "Moldova" },
    { display: "Monaco", value: "Monaco" },
    { display: "Mongolia", value: "Mongolia" },
    { display: "Montenegro", value: "Montenegro" },
    { display: "Morocco", value: "Morocco" },
    { display: "Mozambique", value: "Mozambique" },
    { display: "Myanmar", value: "Myanmar" },

    { display: "Namibia", value: "Namibia" },
    { display: "Nauru", value: "Nauru" },
    { display: "Nepal", value: "Nepal" },
    { display: "Netherlands", value: "Netherlands" },
    { display: "New Zealand", value: "New Zealand" },
    { display: "Nicaragua", value: "Nicaragua" },
    { display: "Niger", value: "Niger" },
    { display: "Nigeria", value: "Nigeria" },
    { display: "North Korea", value: "North Korea" },
    { display: "North Macedonia", value: "North Macedonia" },
    { display: "Norway", value: "Norway" },

    { display: "Oman", value: "Oman" },

    { display: "Pakistan", value: "Pakistan" },
    { display: "Palau", value: "Palau" },
    { display: "Panama", value: "Panama" },
    { display: "Papua New Guinea", value: "Papua New Guinea" },
    { display: "Paraguay", value: "Paraguay" },
    { display: "Peru", value: "Peru" },
    { display: "Philippines", value: "Philippines" },
    { display: "Poland", value: "Poland" },
    { display: "Portugal", value: "Portugal" },

    { display: "Qatar", value: "Qatar" },

    { display: "Romania", value: "Romania" },
    { display: "Russia", value: "Russia" },
    { display: "Rwanda", value: "Rwanda" },

    { display: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
    { display: "Saint Lucia", value: "Saint Lucia" },
    {
      display: "Saint Vincent and the Grenadines",
      value: "Saint Vincent and the Grenadines",
    },
    { display: "Samoa", value: "Samoa" },
    { display: "San Marino", value: "San Marino" },
    { display: "Sao Tome and Principe", value: "Sao Tome and Principe" },
    { display: "Saudi Arabia", value: "Saudi Arabia" },
    { display: "Senegal", value: "Senegal" },
    { display: "Serbia", value: "Serbia" },
    { display: "Seychelles", value: "Seychelles" },
    { display: "Sierra Leone", value: "Sierra Leone" },
    { display: "Singapore", value: "Singapore" },
    { display: "Slovakia", value: "Slovakia" },
    { display: "Slovenia", value: "Slovenia" },
    { display: "Solomon Islands", value: "Solomon Islands" },
    { display: "Somalia", value: "Somalia" },
    { display: "South Africa", value: "South Africa" },
    { display: "South Korea", value: "South Korea" },
    { display: "South Sudan", value: "South Sudan" },
    { display: "Spain", value: "Spain" },
    { display: "Sri Lanka", value: "Sri Lanka" },
    { display: "Sudan", value: "Sudan" },
    { display: "Suriname", value: "Suriname" },
    { display: "Sweden", value: "Sweden" },
    { display: "Switzerland", value: "Switzerland" },
    { display: "Syria", value: "Syria" },

    { display: "Taiwan", value: "Taiwan" },
    { display: "Tajikistan", value: "Tajikistan" },
    { display: "Tanzania", value: "Tanzania" },
    { display: "Thailand", value: "Thailand" },
    { display: "Timor-Leste", value: "Timor-Leste" },
    { display: "Togo", value: "Togo" },
    { display: "Tonga", value: "Tonga" },
    { display: "Trinidad and Tobago", value: "Trinidad and Tobago" },
    { display: "Tunisia", value: "Tunisia" },
    { display: "Turkey", value: "Turkey" },
    { display: "Turkmenistan", value: "Turkmenistan" },
    { display: "Tuvalu", value: "Tuvalu" },

    { display: "Uganda", value: "Uganda" },
    { display: "Ukraine", value: "Ukraine" },
    { display: "United Arab Emirates", value: "United Arab Emirates" },
    { display: "United Kingdom", value: "United Kingdom" },
    { display: "United States", value: "United States" },
    { display: "Uruguay", value: "Uruguay" },
    { display: "Uzbekistan", value: "Uzbekistan" },

    { display: "Vanuatu", value: "Vanuatu" },
    { display: "Vatican City", value: "Vatican City" },
    { display: "Venezuela", value: "Venezuela" },
    { display: "Vietnam", value: "Vietnam" },

    { display: "Yemen", value: "Yemen" },

    { display: "Zambia", value: "Zambia" },
    { display: "Zimbabwe", value: "Zimbabwe" },
  ];

  const [country, setCountry] = useState("")

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

        <form action="post" className="login-form signup-form">
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
      </section>
    </main>
  );
}
