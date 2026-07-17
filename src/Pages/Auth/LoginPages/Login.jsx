import { useTranslation } from "../../../auto-il8n";
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
export default function Login() {
  const {
    t
  } = useTranslation();
  const {
    login
  } = useContext(AuthContext);
  const {
    showLoader,
    hideLoader
  } = useLoader();
  const {
    showAlert
  } = useAlert();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setAlert] = useState("");
  const isValid = email.trim() && password.trim();

  // useEffect(() => {
  //    showLoader()
  // }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    setAlert('');
    showLoader();
    try {
      const response = await login(email, password);
      if (response?.error) {
        hideLoader();
        showAlert({
          type: "failed",
          message: response?.error || "Login failed"
        });
      }
      if (response?.verify) {
        localStorage.setItem("email", response?.verify);
        navigate("/security/email/verification/");
      }
      if (response?.success) {
        showAlert({
          type: "success",
          message: response.success
        });
        navigate('/dashboard');
      }
    } catch (err) {
      hideLoader();
      const data = err?.response?.data;
      showAlert({
        type: "failed",
        message: data?.error || "Login failed"
      });
    }
  };
  return <section className="login-section">
      <section className="form-section">
        <h2>
          <CustomImage source={icon} altText="leadbank icon image" />{t("leadbank")}</h2>
        <form action="post" className="login-form" onSubmit={handleSubmit}>
          <h3>{t("welcome_back")}</h3>
          <Link className="continue-with">
            <Icon name="FcGoogle" />
            <small>{t("sign_in_with_google")}</small>
          </Link>
          <div className="login-or">
            <span></span> <small>{t("or_continue_with")}</small>
            <span></span>
          </div>
          <FormInput className="login-form-input" labelText="Email address" required placeholder="Enter your email address" type="email" name="login-email" defaultValue={email} onchange={e => setemail(e.target.value)} />
          <FormInput className="login-form-input" labelText="Password" required placeholder="Enter your password" type="password" name="login-password" defaultValue={password} onchange={e => setpassword(e.target.value)} />
          <Link to="/password/forgotten/" className="forgoten-password-link">{t("forgoten_password")}</Link>
          <CustomButton {...isValid ? {} : {
          disabled: true
        }} type="submit">{t("login")}</CustomButton>
        </form>
        <div className="move-to-create-account">
            <small>{t("are_you_a_new_user")}<Link to="/signup/country/">{t("create_an_account")}</Link></small>
        </div>
      </section>
    </section>;
}