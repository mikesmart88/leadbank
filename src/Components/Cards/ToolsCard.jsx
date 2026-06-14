import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function ToolsCard({
  style,
  className,
  title,
  description,
  iconName,
  btnLabel,
  onclick,
  imgsrc,
  bgcolor,
  ...props
}) {
  return (
    <div className={`card ${className}`} style={{ background: bgcolor, ...style }} {...props}>
        <div className="text-holder">
          <span className="icon-holder">
            <Icon name={iconName} />
          </span>
          <h2>{title}</h2>
          <p>{description}</p>
          <CustomButton onClick={onclick}>
            {btnLabel}
          </CustomButton>
        </div>
        <CustomImage source={imgsrc} altText={`${title} image`} />
    </div>
  );
}
