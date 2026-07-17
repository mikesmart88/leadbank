import { useTranslation } from "../../auto-il8n";
import React, { useState } from "react";
import ToolsCard from "../Cards/ToolsCard";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function ScrollEffectList({
  style,
  className,
  cards,
  ...props
}) {
  const {
    t
  } = useTranslation();
  return <div style={style} className={className} {...props}>
      {cards.map((card, index) => <div key={index} className="cards" style={{
      top: `${100 + index * 30}px`
    }}>
          <ToolsCard title={card.title} description={card.description} iconName={card.iconName} btnLabel={card.btnLabel} onclick={card.onclick} imgsrc={card.imgsrc} bgcolor={card.bgcolor} className="tool-card" />
        </div>)}
    </div>;
}