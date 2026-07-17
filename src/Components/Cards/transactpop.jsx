import { useTranslation } from "../../auto-il8n";
import React, { useState, useEffect } from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function Transactanimationpop({
  style,
  className,
  pops,
  ...props
}) {
  const {
    t
  } = useTranslation();
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => prev === 4 ? 0 : prev + 1);
    }, 1000); // change every 1 second

    return () => clearInterval(interval); // cleanup
  }, []);
  return <div style={style} className={className} {...props}>
      {pops.map((pop, index) => {
      return <div key={index} className={`pop-cards ${index == active ? "pop-active" : ""}`}>
            <CustomImage source={pop.img} altText="pop card images" />
            <small>{pop.Children}</small>
          </div>;
    })}
    </div>;
}