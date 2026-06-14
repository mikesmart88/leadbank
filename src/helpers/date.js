const getOrdinal = (day) => {
  if (day > 3 && day < 21) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getFormattedDate = () => {
  const date = new Date();

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();

  return `${weekday}, ${month} ${day}${getOrdinal(day)}`;
};

