const secondNeedleEl = document.getElementById("secondNeedle");
const minuteNeedleEl = document.getElementById("minuteNeedle");
const hourNeedleEl = document.getElementById("hourNeedle");
const dayNightIndicatorEl = document.getElementById("dayNightIndicator");
const dayEl = document.getElementById("day");
const todayDateEl = document.getElementById("todayDate");

const getDayName = (dayNo) => {
  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  return days[dayNo - 1];
};

const getMonthName = (monthNo) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNo];
};

const getDateWithSuffix = (todayDate) => {
  const dateSuffix = ["st", "nd", "rd", "th"];
  if (todayDate >= 1 && todayDate <= 3) {
    return `${todayDate}${dateSuffix[todayDate - 1]}`;
  } else if (todayDate >= 21 && todayDate <= 23) {
    const firstDigit = todayDate % 10;
    return `${todayDate}${dateSuffix[firstDigit - 1]}`;
  } else if (todayDate == 31) {
    return "31st";
  } else {
    return `${todayDate}th`;
  }
};

const getTodaysDate = (date) => {
  const todaysDate = date.getDate();
  const monthNo = date.getMonth();
  const year = date.getFullYear();
  return `${getMonthName(monthNo)} ${getDateWithSuffix(todaysDate)}, ${year}`;
};

setInterval(() => {
  const date = new Date();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours(); //0-23
  const secondsDeg = seconds * 6;
  const minutesdDeg = minutes * 6 + seconds * 0.1;
  const hoursDeg =
    (hours >= 12 ? (hours - 12) * 30 : hours * 30) +
    minutes * 0.5 +
    seconds * (1 / 120);
  const dayNo = date.getDay();
  secondNeedleEl.style.transform = `rotate(${secondsDeg}deg)`;
  minuteNeedleEl.style.transform = `rotate(${minutesdDeg}deg)`;
  hourNeedleEl.style.transform = `rotate(${hoursDeg}deg)`;
  dayNightIndicatorEl.innerText = `${hours > 12 ? "PM" : "AM"}`;
  dayEl.innerText = `${getDayName(dayNo)}`;
  todayDateEl.innerText = `${getTodaysDate(date)}`;
}, 1000);
