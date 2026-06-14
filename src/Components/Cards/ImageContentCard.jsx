import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";
import Transactanimationpop from "./transactpop";
import ReactCountryFlag from "react-country-flag";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function ImageContentcard({
  style,
  className,
  imgsrc,
  text,
  props,
}) {
  const popData = [
    {
      img: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      Children: (<>
      Matthew from Canada <ReactCountryFlag countryCode="CA" svg /> sent you $3,050 🥳
      </>)
    },
     {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTNjkaQHLXfokbl1GiKnXl6v7GNgnG8rb3JA&s",
      Children: (<>
      Daniel from UK <ReactCountryFlag countryCode="GB" svg /> paid for your bills 🥳
      </>)
    },
     {
      img: "https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
      Children: (<>
      Solomon from Algeria <ReactCountryFlag countryCode="DZ" svg /> sent you $1,000 🥳
      </>)
    },
     {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s",
      Children: (<>
      Sarah from USA <ReactCountryFlag countryCode="US" svg /> sent you $20,500 🥳
      </>)
    },
     {
      img: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg",
      Children: (<>
      Lisa from Europe <ReactCountryFlag countryCode="EU" svg /> sent you €100,000 🥳
      </>)
    },
  ];
  return (
    <div
      className={className}
      style={{ ...style, backgroundImage: `url(${imgsrc})` }}
    >
      <Transactanimationpop className="animated-pop" pops={popData} />
      <h2>{text}</h2>
    </div>
  );
}
