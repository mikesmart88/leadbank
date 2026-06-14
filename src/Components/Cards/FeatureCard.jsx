import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function ({ style, className, imgsrc, cardnum, label }) {
  return (
    <div style={style} className={className} >
      <CustomImage source={imgsrc} className="feature-illustration" />
      <div className="feature-content">
        <span>0{cardnum} —</span>
        <h3>{label}</h3>
      </div>
    </div>
  );
}
