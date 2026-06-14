import { useState, useEffect } from "react";
import GeneralRouter from "./Routers/GeneralRouter";
import { useAlert } from "./contexts/AlertContext";
import { useLocation, useNavigate } from "react-router";
import { useLoader } from "./contexts/LoaderContext";
import CustomAlert from "./Components/Alerts/CustomAlert";
import Loader from "./Components/Loaders/Loader";

import "./assets/scss/varables.scss";
import "./assets/scss/component.scss";
import "./assets/scss/responsive.scss";

function App() {
  const { alert, clearAlert, showAlert } = useAlert();
  const location = useLocation();
  const { loading, hideLoader } = useLoader();
  const navigate = useNavigate();

  useEffect(() => {
    hideLoader();
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      showAlert({ type: "info", message: e.detail });
      navigate("/login");
    };

    window.addEventListener("session-expired", handler);
    return () => window.removeEventListener("session-expired", handler);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {alert && (
        <CustomAlert
          type={alert?.type}
          message={alert?.message}
          onClose={clearAlert}
        />
      )}
      <GeneralRouter />
    </>
  );
}

export default App;
