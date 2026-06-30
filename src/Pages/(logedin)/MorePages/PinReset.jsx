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
import { Changepin } from "../../../services/AuthServices";
import FormInput from "../../../Components/Forms/FormInputs";

export default function PinReset() {

    const [oldpin, setOldpin] = useState("")
    const [pin, setPin] = useState('')
    const [confpin, setConfPin] = useState("")

    const { showLoader, hideLoader } = useLoader();
    const { showAlert } = useAlert();


    const isValid = oldpin.trim() && pin.trim() && confpin == pin;

    const handlePinChange = async (e) => {
        e.preventDefault();
        showLoader()
        try{
            const formData = new FormData()

            formData.append("old_pin", oldpin);
            formData.append("new_pin", pin);
            formData.append("confirm_pin", confpin);

            const data = await Changepin(formData);
            console.log(data)

            if (data?.data.success) {
                hideLoader();
                showAlert({
                    type: "success",
                    message: data?.success || "pin changed successfully"
                })
               setConfPin("")
               setPin('')
            }
        }catch (error) {
            hideLoader();
            showAlert({
                type: "failed",
                message: error?.response?.data?.message ||
                error?.message ||
                "Error Failed to change transaction pin",
            })
        }
    }

    return(

        <main className="dashboard-main-content account-dashboard">
            <h2>Change transaction pin</h2>
            <p>Need to reset transaction pin do it in one click</p>
            <div className="reset-pass-form">
                <form
                          action="post"
                          onSubmit={(e) => {
                            isValid && handlePinChange(e);
                          }}
                          className="login-form signup-form"
                        >

                            <FormInput
                            className="login-form-input signup-form-input"
                            labelText="Old pin"
                            required
                            defaultValue={oldpin}
                            type="number"
                            onchange={(e) => setOldpin(e.target.value)}
                            placeholder="Enter 4 digit pin"
                          />
                

                          <FormInput
                            className="login-form-input signup-form-input"
                            labelText="New pin"
                            required
                            defaultValue={pin}
                            type="number"
                            onchange={(e) => setPin(e.target.value)}
                            placeholder="Enter 4 digit pin"
                          />
                
                          <FormInput
                            className="login-form-input signup-form-input"
                            labelText="Confirm new pin"
                            type="number"
                            defaultValue={confpin}
                            onchange={(e) => setConfPin(e.target.value)}
                            placeholder="Enter same pin"
                          />
                          
                
                          <CustomButton {...(isValid ? {} : { disabled: true })} type="submit">
                            Continue
                          </CustomButton>
                        </form>
            </div>
        </main>
    )
}