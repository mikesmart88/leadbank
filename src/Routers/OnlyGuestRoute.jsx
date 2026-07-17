import { useTranslation } from "../auto-il8n";
import { Navigate } from "react-router";
import { Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Loader from '../Components/Loaders/Loader';
export default function OnlyGuestRoute() {
  const {
    t
  } = useTranslation();
  const {
    IsAuthenticated,
    loading
  } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return IsAuthenticated ? <Navigate to="/dashboard/" replace /> : <Outlet />;
}