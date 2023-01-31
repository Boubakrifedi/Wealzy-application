const useDate = (date) => {
  if (!date) {
    return "Invalid date";
  }

  const dateOnly = date.split("T")[0];
  const [year, month, day] = dateOnly.split("-");

  const fullDate = new Date(`${month}/${day}/${year}`);
  const formattedMonth = (fullDate.getMonth() + 1).toString().padStart(2, "0");
  const formattedDay = fullDate.getDate().toString().padStart(2, "0");

  const dateFormatted = `${formattedMonth}/${formattedDay}/${fullDate.getFullYear()}`;
  return dateFormatted;
};

export default useDate;
