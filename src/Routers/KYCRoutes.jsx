import { useTranslation } from "../auto-il8n";
import { Navigate } from "react-router";
import { Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Loader from "../Components/Loaders/Loader";
import { useData } from "../hooks/UseData";
export default function KYCRoute() {
  const {
    t
  } = useTranslation();
  const {
    userdata
  } = useData();
  const user_isValid = userdata?.isVerifiedCompleted == 5;
  if (!userdata) {
    return <Loader />;
  }
  return !user_isValid ? <Outlet /> : <Navigate to="/dashboard/" replace />;
}