import { useTranslation } from "../../auto-il8n";
import React, { useState, useEffect } from "react";
import CustomImage from "../Images/CustomImage";
import icon from '../../assets/images/another-icon.png';
export default function ImageEffect({
  className,
  style,
  ...props
}) {
  const {
    t
  } = useTranslation();
  const imgSources = ["https://plus.unsplash.com/premium_photo-1728302531348-ecaa849d9e15?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8", "https://images.unsplash.com/photo-1519944518895-f08a12d6dfd5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwbG9va2luZyUyMGF0JTIwcGhvbmV8ZW58MHx8MHx8fDA%3D", "https://t4.ftcdn.net/jpg/05/01/97/01/360_F_501970157_DA8dj2g9zkVTRBZoFgz4O2ad0Mpxk2N4.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev === imgSources.length - 1 ? 0 : prev + 1);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, [imgSources.length]);
  return <div className={className} style={style} {...props}>
        <div className="image-effect-after">
            <CustomImage source={icon} />
        </div>
        <div className="image-effect-text"></div>
      <CustomImage source={imgSources[currentIndex]} className={className} style={style} {...props} />
    </div>;
}