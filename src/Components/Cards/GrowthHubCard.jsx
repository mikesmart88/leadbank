import { useTranslation } from "../../auto-il8n";
import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";
import { Link } from "react-router";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function GrowthHubLink({
  style,
  className,
  iconName,
  label,
  description,
  to,
  ...props
}) {
  const {
    t
  } = useTranslation();
  return <Link to={to || "/referrals/"} style={style} className={className} {...props}>
      <span>
        <Icon name={iconName} />
      </span>
      <div>
        <strong>{label}</strong>
        <small>{description}</small>
      </div>
    </Link>;
}