import React, { useState, useEffect, useContext, useRef } from "react";
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
import CustomImage from "../../../Components/Images/CustomImage";

import { VerifyEmail, ResendOTp } from "../../../services/AuthServices";

import icon from "../../../assets/images/another-icon.png";

export default function EmailVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { setUser } = useContext(AuthContext)
  const inputsRef = useRef([]);

  const navigate = useNavigate();

  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }

      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = [...otp];

    pasted.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  // Complete code
  const code = otp.join("");

  console.log(code);

  const handleSupmit = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const response = await VerifyEmail(code);

      //console.log(response);

      if (response?.success) {
        //console.log("Access token:", localStorage.getItem("access_token"));
        setUser(response.user)
        navigate("/dashboard/");
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "verification failed",
      });
    }
  };

  const handleResend = async () => {
    try{
        const email = localStorage.getItem("email")
    const response = await ResendOTp(email)

    if (response?.success){
        showAlert({
            type: "success",
            message: response?.success || "New otp code sent successfully"
        })
    }

    }catch (error) {
      showAlert({
        type: "failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Resend failed, please try again letter",
      });
    }
  }

  return (
    <main className="main-form-info">
      <section className="form-section login-section v-section">
        <h2>
          <CustomImage source={icon} altText="leadbank icon image" />
          Leadbank
        </h2>

        <form
          action=""
          className="login-form"
          onSubmit={(e) => handleSupmit(e)}
        >
          <h3>Enter your verification code!</h3>
          <p>Kindly enter the code send to your email to continue</p>

          <div className="otp-container" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input"
                required
              />
            ))}
          </div>
          <CustomButton>Sign into your account</CustomButton>
          <hr />
          <CustomButton
            type="button"
            onClick={() => handleResend()}
            className="continue-with"
            style={{ backgroundColor: "#f3f3f3", color: "#000" }}
          >
            <Icon name="FcSynchronize" /> Resend otp code
          </CustomButton>
        </form>
      </section>
    </main>
  );
}
