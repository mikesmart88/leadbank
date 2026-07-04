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
import { useParams } from "react-router";
import { Resetpassword } from "../../../services/AuthServices";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const { showLoader, hideLoader } = useLoader();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const { token } = useParams();

  const isValid =
    password.trim() && confPassword.trim() && confPassword === password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const response = await Resetpassword(password, token);

      if (response?.success) {
        hideLoader();
        showAlert({
          type: "success",
          message: response?.success || "Password reset successfully",
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
              labelText="New Password"
              required
              placeholder="Enter your new password"
              type="password"
              name="reset-password-new"
              defaultValue={password}
              onchange={(e) => setPassword(e.target.value)}
            />
            <FormInput
              className="login-form-input"
              labelText="Confirm New Password"
              required
              placeholder="Confirm your new password"
              type="password"
              name="reset-password-confirm"
              defaultValue={confPassword}
              onchange={(e) => setConfPassword(e.target.value)}
            />
            <CustomButton
              {...(isValid ? {} : { disabled: true })}
              type="submit"
            >
              Reset Password
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
