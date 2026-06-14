import Icon from "../Icons/Icon";
import { Link } from "react-router";

export default function ({ currentRoute, actualRoute, iconName, className, ...props }) {
    
  return (
    <Link to={`/${actualRoute.toLowerCase()}/`} {...props} className={className}>
        { currentRoute == actualRoute ? (
            <>
            <Icon name={iconName} />
            {currentRoute}
            </>
        ): currentRoute == actualRoute ? (
            <>
            <Icon name={iconName} />
            {currentRoute}
            </>
        ): currentRoute == actualRoute ? (
            <>
            <Icon name={iconName} />
            {currentRoute}
            </>
        ): currentRoute == actualRoute ? (
            <>
            <Icon name={iconName} />
            {currentRoute}
            </>
        ): currentRoute == actualRoute ? (
            <>
            <Icon name={iconName} />
            {currentRoute}
            </>
        ): <><span><Icon name={iconName} /></span></> }
    </Link>
  );
}
