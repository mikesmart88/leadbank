import { useTranslation } from "../../auto-il8n";
import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function ({
  style,
  className,
  imgsrc,
  cardnum,
  label
}) {
  const {
    t
  } = useTranslation();
  return <div style={style} className={className}>
      <CustomImage source={imgsrc} className="feature-illustration" />
      <div className="feature-content">
        <span>{t("0")}{cardnum}{t("")}</span>
        <h3>{label}</h3>
      </div>
    </div>;
}