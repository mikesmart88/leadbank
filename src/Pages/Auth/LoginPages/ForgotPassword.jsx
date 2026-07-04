import React, { useEffect, useState } from "react";
import icon from "../../../assets/images/another-icon.png";
import CustomImage from "../../../Components/Images/CustomImage";
import FormInput from "../../../Components/Forms/FormInputs";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import { useAlert } from "../../../contexts/AlertContext";
import { useLoader } from "../../../contexts/LoaderContext";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { forgotPassword } from "../../../services/AuthServices";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const isValid = email.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const response = await forgotPassword("password", email);
      if (response?.success) {
        hideLoader();
        showAlert({
          type: "success",
          message: response?.success || "Password reset link sent successfully",
        });
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while resetting the password",
      });
    }
  };

  return (
    <>
      <section className="login-section">
        <section className="form-section">
          <h2>
            <CustomImage source={icon} altText="leadbank icon image" />
            Leadbank
          </h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              isValid && handleSubmit(e);
            }}
          >
            <h3>Reset Password!</h3>
            <FormInput
              className="login-form-input"
              labelText="Email address"
              required
              placeholder="Enter your email address"
              type="email"
              name="reset-password-email"
              defaultValue={email}
              onchange={(e) => setEmail(e.target.value)}
            />
            <CustomButton
              {...(isValid ? {} : { disabled: true })}
              type="submit"
            >
              Send Password reset link
            </CustomButton>
          </form>
          <div className="move-to-create-account">
            <small>
              Remembered your password? <Link to="/login/">Sign in</Link>
            </small>
          </div>
        </section>
      </section>
    </>
  );
}
