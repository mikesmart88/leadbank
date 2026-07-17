import { useTranslation } from "../../auto-il8n";
import CustomButton from "./CustomButtons";
import Icon from "../Icons/Icon";
import { useNavigate } from "react-router";
export default function BackButton({
  onClick,
  className,
  ...props
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <CustomButton onClick={onClick || (() => navigate(-1))} className={`back-button ${className}`} {...props}>
            <Icon name="LuArrowLeft" />
        </CustomButton>;
}