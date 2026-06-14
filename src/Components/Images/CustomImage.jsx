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
  return (
    <div style={style} className={`img ${className}`} {...props}>
      <img src={source} alt={altText} />
    </div>
  );
}
