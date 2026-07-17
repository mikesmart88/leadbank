import { useTranslation } from "../../auto-il8n";
import React from "react";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function CustomProgress({
  style,
  className,
  value,
  max,
  children,
  ...props
}) {
  const {
    t
  } = useTranslation();
  return <div className={className}>
        <progress value={value} max={max} style={style} className={value < 40 ? "low-progress" : value < 70 ? "medium-progress" : "high-progress"} {...props} />
      <span>
        {children}
      </span>
    </div>;
}