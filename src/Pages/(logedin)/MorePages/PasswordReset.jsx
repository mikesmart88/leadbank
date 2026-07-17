import { useTranslation } from "../../../auto-il8n";
import { useState, useRef } from "react";
import { useData } from "../../../hooks/UseData";
import { getFormattedDate } from "../../../helpers/date";
import CustomButton from "../../../Components/Buttons/CustomButtons";
import Icon from "../../../Components/Icons/Icon";
import QuickActionCard from "../../../Components/Cards/QuickActionCard";
import GrowthHubLink from "../../../Components/Cards/GrowthHubCard";
import { Link, useNavigate } from "react-router";
import TransactionTable from "../../../Components/Tables/TransactionTable";
import { BaseUrl } from "../../../../env.config";
import PaymentCard from "../../../Components/Cards/PaymentCard";
import { useAlert } from "../../../contexts/AlertContext";
import { useLoader } from "../../../contexts/LoaderContext";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { MediaUrl } from "../../../../env.config";
import CustomImage from "../../../Components/Images/CustomImage";
import Input from "../../../Components/Inputs/Input";
import { uploadimage, ChangePassword } from "../../../services/AuthServices";
import FormInput from "../../../Components/Forms/FormInputs";
import BackButton from "../../../Components/Buttons/BackButton";
import ResetPasswordButton from "../../../Components/Buttons/ResetPasswordButton";
export default function PasswordReset() {
  const {
    t
  } = useTranslation();
  const [oldpassword, setOldpassword] = useState("");
  const [password, setpassword] = useState('');
  const [confpassword, setConfPassword] = useState("");
  const {
    showLoader,
    hideLoader
  } = useLoader();
  const {
    showAlert
  } = useAlert();
  const isValid = oldpassword.trim() && password.trim() && confpassword == password;
  const handlePasswordChange = async e => {
    e.preventDefault();
    showLoader();
    try {
      const formData = new FormData();
      formData.append("old_password", oldpassword);
      formData.append("new_password", password);
      formData.append("confirm_password", confpassword);
      const data = await ChangePassword(formData);
      console.log(data);
      if (data?.data.success) {
        hideLoader();
        showAlert({
          type: "success",
          message: data?.success || "password updated successfully"
        });
        setOldpassword("");
        setpassword("");
        setConfPassword("");
      }
    } catch (error) {
      hideLoader();
      showAlert({
        type: "failed",
        message: error?.response?.data?.message || error?.message || "Error Failed to change password"
      });
    }
  };
  return <main className="dashboard-main-content account-dashboard">
            <h2> <BackButton />{t("change_password")}</h2>
            <p>{t("password_no_more_secure_change_now")}</p>
            <div className="reset-pass-form">
                <form action="post" onSubmit={e => {
        isValid && handlePasswordChange(e);
      }} className="login-form signup-form">

                            <FormInput className="login-form-input signup-form-input" labelText="Old password" required defaultValue={oldpassword} type="password" onchange={e => setOldpassword(e.target.value)} placeholder="Enter password (min of 8 characters)" />
                

                          <FormInput className="login-form-input signup-form-input" labelText="New password" required defaultValue={password} type="password" onchange={e => setpassword(e.target.value)} placeholder="Enter password (min of 8 characters)" />
                
                          <FormInput className="login-form-input signup-form-input" labelText="Confirm new password" type="password" defaultValue={confpassword} onchange={e => setConfPassword(e.target.value)} placeholder="Enter same password" />
                          
                          <ResetPasswordButton />
                
                          <CustomButton {...isValid ? {} : {
          disabled: true
        }} type="submit">{t("change_password")}</CustomButton>
                        </form>
            </div>
        </main>;
}