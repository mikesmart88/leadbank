import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */


export default function CompletedPortionCard({
  stepNumber,
  title,
  active,
  line,
  completed,
  style,
}) {
  return (
    <div style={style} className="step-item">
      <div className={`circle ${active ? "active" : ""} ${completed ? "completed" : ""}`}>
      </div>

      {active ? (
        <div className="step-content">
        <small>STEP {stepNumber}</small>
        <h4>{title}</h4>
      </div>
      ): ""}

      {line ? (
        <div className="line"></div>
      ): ''}
    </div>
  );
}