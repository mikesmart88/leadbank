import { useTranslation } from "../../auto-il8n";
import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router";
import { getCountryCode } from "../../helpers/getCountryCode";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function PaymentCard({
  style,
  className,
  to,
  imgscr,
  label,
  description,
  ...props
}) {
  const {
    t
  } = useTranslation();
  return <Link style={style} className={className} to={to} {...props}>
      <span>{t("comming_soon")}</span>
      <CustomImage source={imgscr} />
      <h3>{label}</h3>
      <p>{description}</p>
    </Link>;
}