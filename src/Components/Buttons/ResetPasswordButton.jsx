import CustomButton from "./CustomButtons";
import { useData } from "../../hooks/UseData";
import { forgotPassword } from "../../services/AuthServices";
import { useLoader } from "../../contexts/LoaderContext";
import { useAlert } from "../../contexts/AlertContext";

export default function ResetPasswordButton({ style, className }) {
  const { showAlert } = useAlert();
  const { showLoader, hideLoader } = useLoader();
  const { userdata } = useData();

  if (!userdata?.email) return null;

  const handleSubmit = async () => {
    showLoader();
    try {
      const response = await forgotPassword("password", userdata?.email);

      if (response?.success) {
        hideLoader();
        showAlert({
          type: "success",
          message: response?.success,
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
    <CustomButton
      type="button"
      style={style}
      className={className}
      onClick={() => handleSubmit()}
    >
      Forgotten Password
    </CustomButton>
  );
}
