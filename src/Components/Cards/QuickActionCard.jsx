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

export default function QuickActionCard({style, className, iconName, label, to, description, ...props}) {
    return (
        <Link to={to} style={style} className={`card ${className}`}>
            <span className="quick-action-icon">
                <Icon name={iconName} />
            </span>
            <div>
                <strong>{label}</strong>
                <small>{description}</small>
            </div>
        </Link>
    )
}