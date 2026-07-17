import { useTranslation } from "../../auto-il8n";
import React from "react";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function CustomImage({
  source,
  style,
  altText,
  className,
  ...props
}) {
  const {
    t
  } = useTranslation();
  return <div style={style} className={`img ${className}`} {...props}>
      <img src={source} alt={altText} />
    </div>;
}