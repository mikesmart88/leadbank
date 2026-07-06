import { useEffect, useState } from "react";
import CustomImage from "../Images/CustomImage";

export default function ImageSequence({
  images = [],
  className,
  style,
  ...props
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds per image

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={style} className={className} {...props}>
      {images.map((image, index) => (
        <CustomImage
          key={index}
          source={image.src}
          alt=""
          className={`showcase-image ${index === current ? "active" : ""}`}
        />
      ))}
    </div>
  );
}
