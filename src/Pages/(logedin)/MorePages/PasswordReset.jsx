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
import { uploadimage } from "../../../services/AuthServices";
import FormInput from "../../../Components/Forms/FormInputs";

export default function PasswordReset() {

    const isValid = ""

    const [password, setpassword] = useState('')
    const [confpassword, setConfPassword] = useState("")

    return(

        <main className="dashboard-main-content account-dashboard">
            <h2>Change Password</h2>
            <p>Password no more secure change now!!</p>
            <div className="reset-pass-form">
                <form
                          action="post"
                          onSubmit={(e) => {
                            isValid && handleSave(e);
                          }}
                          className="login-form signup-form"
                        >

                            <FormInput
                            className="login-form-input signup-form-input"
                            labelText="Old password"
                            required
                            defaultvalue={password}
                            type="password"
                            onchange={(e) => setpassword(e.target.value)}
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