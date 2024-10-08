import fixtures from "./fixtures";
const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/**
 * Adjusts the month for Zeller's Congruence.
 * January and February are treated as months 13 and 14 of the previous year.
 * 
 * @param {number} month - The month (1-12).
 * @returns {number} - Adjusted month for calculations (1-12).
 */
function getMonth(month:number):number {
  return month <= 2 ? month + 12 : month; 
}

/**
 * Gets the year adjusted for January and February.
 * 
 * @param {number} year - The year.
 * @param {number} month - The month (1-12).
 * @returns {number} - Adjusted year (previous year for Jan/Feb).
 */
function getYear(year:number, month:number):number {
  return month <= 2 ? year - 1 : year;
}
/**
 * Calculates the century from the year.
 * 
 * @param {number} year - The year.
 * @returns {number} - The century (e.g., 21 for 2100).
 */
function getCentury(year:number):number {
  return Math.floor(year / 100); 
}
/**
 * Gets the last two digits of the year.
 * 
 * @param {number} year - The year.
 * @returns {number} - The last two digits of the year.
 */
function yearDenominator(year:number):number {
  return year % 100; // Modulo to get the last two digits
}

/**
 * Calculates the day of the week for a given date using Zeller's Congruence.
 * 
 * @param {number} year - The year.
 * @param {number} month - The month (1-12).
 * @param {number} day - The day of the month.
 * @returns {number} - The day of the week (0=Saturday, 1=Sunday, ..., 6=Friday).
 */

function dayOfTheWeek(year:number, month:number, day:number):number {
  const baseYear = getYear(year, month);
  const century = getCentury(baseYear);
  const yearDnt = yearDenominator(baseYear);

  const k = day; // Day of the month
  const m = getMonth(month); // Month (1-12, 13-14 for Jan/Feb)

  // Calculate the day of the week
  const dayOfWeek =
    (k +
      Math.floor((13 * (m + 1)) / 5) +
      yearDnt +
      Math.floor(yearDnt / 4) +
      Math.floor(century / 4) -
      2 * century) %
    7;

  return (dayOfWeek + 7) % 7; // Ensure a positive index
}

/**
 * Gets the name of the day of the week for a given date.
 * 
 * @param {number} year - The year.
 * @param {number} month - The month (1-12).
 * @param {number} day - The day of the month.
 * @returns {string} - The name of the day of the week.
 */
function getDayOfTheWeekString(year: number, month: number, day: number):string {
  return DAYS[dayOfTheWeek(year, month, day)];
}

for (const fixture of fixtures) {
  const { description, expected, assert } = fixture
  const { year, month, day } = assert
  const result = getDayOfTheWeekString(year, month, day);

  const resultString = `
    Expected = ${expected}
    Received = ${result}
    `

  if (result !== expected) {
    console.error(` 
      ${description}
        Expected = ${expected}
        Received = ${result}
       `
    )
  } else {
    console.log(`${description}
      ${resultString}
      `)

  }


}