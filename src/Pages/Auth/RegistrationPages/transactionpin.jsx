import React, { useState, useEffect, useContext } from "react";
import CompletedPortionCard from "../../../Components/Cards/CompltedPortionCard";
import FormSelect from "../../../Components/Forms/FormSelect";
import Icon from "../../../Components/Icons/Icon";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import { coptions } from "../../../../env.config";
import { Link, useNavigate } from "react-router";
import FormInput from "../../../Components/Forms/FormInputs";
import FormCheckbox from "../../../Components/Forms/FormCheckbox";
import { useAlert } from "../../../contexts/AlertContext";
import { useLoader } from "../../../contexts/LoaderContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { CreateNewuser } from "../../../services/AuthServices";

export default function PinInfo() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();
  const { login } = useContext(AuthContext)

  const [pin, setPin] = useState("");

  const isValid = (pin.length === 4);

  const personalData = JSON.parse(
    localStorage.getItem("personaldata")
    );

 const handlecreateUser = async (e) => {
    e.preventDefault()
    showLoader()
    try{
        const formData = new FormData();

        formData.append("country", localStorage.getItem("country"));
        formData.append("first_name", personalData.fname);
        formData.append("last_name", personalData.lname);
        formData.append("middleName", personalData.midname);
        formData.append("gender", personalData.gender);
        formData.append("phoneNumber", personalData.phone);
        formData.append("email", personalData.email);
        formData.append("refCode", personalData.refcode)
        formData.append("password", localStorage.getItem("password"))
        formData.append("transactionPin", pin)

        const data = await CreateNewuser(formData);
        console.log(data)

        if (data?.success) {
            try{
                const user = await login(personalData.email, localStorage.getItem("password"));
                if (user?.error){
                    navigate('/login/')
                }
            }catch(err) {
            hideLoader();
            const data = err?.response?.data;
            navigate('/login/')
            }
        hideLoader();
        showAlert({
            type: "success",
            message: data?.success || "account created successfully"
        })
        localStorage.removeItem("country")
        localStorage.removeItem("password")
        localStorage.removeItem("personaldata")
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Error occurred during user creation",
      });
    } 
    }

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
            completed
          />

          <CompletedPortionCard
            stepNumber={3}
            line
            title="Create password"
            completed
          />

          <CompletedPortionCard
            stepNumber={4}
            title="Setup pin"
            active={true}
            style={{ flex: "none" }}
          />
        </div>
        <form
          action="post"
          onSubmit={(e) => {
            isValid && handlecreateUser(e);
          }}
          className="login-form signup-form"
        >
          <h3>Setup transacton pin</h3>
          <FormInput
            className="login-form-input signup-form-input"
            labelText="4 degit pin"
            required
            defaultValue={pin}
            type="number"
            onchange={(e) => setPin(e.target.value)}
            placeholder="Enter 4 digit transaction pin"
          />

          <div className="note-info">
            <h4>
              <Icon name="LuInfo" /> Kindly Note
            </h4>
            <p>
              Pin will be set as your defualt pin for making all transaction
              including card payment and sending funds, input 4 digit number you
              can easily remeber.
            </p>
          </div>

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
