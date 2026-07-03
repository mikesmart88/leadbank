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

export default function PasswordReset() {

    const [oldpassword, setOldpassword] = useState("")
    const [password, setpassword] = useState('')
    const [confpassword, setConfPassword] = useState("")

    const { showLoader, hideLoader } = useLoader();
    const { showAlert } = useAlert();


    const isValid = oldpassword.trim() && password.trim() && confpassword == password;

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        showLoader()
        try{
            const formData = new FormData()

            formData.append("old_password", oldpassword);
            formData.append("new_password", password);
            formData.append("confirm_password", confpassword);

            const data = await ChangePassword(formData);
            console.log(data)

            if (data?.data.success) {
                hideLoader();
                showAlert({
                    type: "success",
                    message: data?.success || "password updated successfully"
                })
                setOldpassword("");
                setpassword("");
                setConfPassword("");
            }
        }catch (error) {
            hideLoader();
            showAlert({
                type: "failed",
                message: error?.response?.data?.message ||
                error?.message ||
                "Error Failed to change password",
            })
        }
    }

    return(

        <main className="dashboard-main-content account-dashboard">
            <h2> <BackButton /> Change Password</h2>
            <p>Password no more secure change now!!</p>
            <div className="reset-pass-form">
                <form
                          action="post"
                          onSubmit={(e) => {
                            isValid && handlePasswordChange(e);
                          }}
                          className="login-form signup-form"
                        >

                            <FormInput
                            className="login-form-input signup-form-input"
                            labelText="Old password"
                            required
                            defaultvalue={oldpassword}
                            type="password"
                            onchange={(e) => setOldpassword(e.target.value)}
                            placeholder="Enter password (min of 8 characters)"
                          />
                

                          <FormInput
                            className="login-form-input signup-form-input"
                            labelText="New password"
                            required
                            defaultvalue={password}
                            type="password"
                            onchange={(e) => setpassword(e.target.value)}
                            placeholder="Enter password (min of 8 characters)"
                          />
                
                          <FormInput
                            className="login-form-input signup-form-input"
                            labelText="Confirm new password"
                            type="password"
                            defaultValue={confpassword}
                            onchange={(e) => setConfPassword(e.target.value)}
                            placeholder="Enter same password"
                          />
                          
                
                          <CustomButton {...(isValid ? {} : { disabled: true })} type="submit">
                            Continue
                          </CustomButton>
                        </form>
            </div>
        </main>
    )
}