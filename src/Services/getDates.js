const days = [];
const years = [];

for (let i = 1; i < 32; i++)
  if (i < 10) days.push("0" + i);
  else days.push(i);

for (let i = 1990; i < 2021; i++) years.unshift(i);

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

export { days, years, months };
