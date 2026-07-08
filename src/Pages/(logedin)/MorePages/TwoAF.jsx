import { useState, useRef, useEffect } from "react";
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
import BackButton from "../../../Components/Buttons/BackButton";
import { Set2FA } from "../../../services/AuthServices";

export default function TwoAF() {
  const { userdata } = useData();
  const { showAlert } = useAlert()

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (userdata?.twoAF) {
      setAuth(userdata?.twoAF);
    }
  }, [userdata?.twoAF]);

  const handleSet2FA = async () => {
    try {
      const value = !auth;
      const data = await Set2FA(value);

      console.log(data);
      if (data?.success) {
        showAlert({
          type: "success",
          message: data?.success || "TwoFA enabled successfull",
        });
        setAuth(value)
      }
    } catch (error) {
      showAlert({
        type: "failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Action failed, please try again later",
      });
    }
  };

  return (
    <main className="dashboard-main-content account-dashboard">
      <h2>
        {" "}
        <BackButton /> Two Factor Authentication
      </h2>
      <p>View and and change your two factor authentication</p>

      <section className="auth-factor">
        <h3>Email</h3>
        <div className="show">
          <small>{userdata?.email}</small>
          <CustomButton onClick={() => handleSet2FA()} >{auth ? "Disable" : "Enable"}</CustomButton>
        </div>
      </section>
    </main>
  );
}
