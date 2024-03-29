export enum DayOfWeek {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0,
}

/**
 * Determines if a given date and time corresponds to rush hour.
 *
 * @param date - The Date object representing the date and time to be checked.
 * @param rushHourDay - A string representing the day of the week when rush hour occurs. e.g. "Monday"
 * @param rushHourTime - A string representing the start and end time of the rush hour period, in the format 'start-end'. e.g. "16-20"
 * @returns True if the provided date and time fall within the rush hour period, otherwise false.
 * @throws {Error} Will throw an error if the input is not a valid Date object, or if rushHourDay or rushHourTime are not in the expected format.
 * 
 */

/* 
 * Create a function to dynamically determine if a given time falls within a rush hour period. 
 * By accepting parameters for the rush hour day and time, this function can be reused for different rush hour schedules.
 */
function isRushHour(date: Date, rushHourDay: string, rushHourTime: string): boolean {
  if (!(date instanceof Date)) throw new Error("Invalid date. Expected a Date object.");
  
  const day = date.getDay();
  const hour = date.getHours();

  if (isNaN(day) || isNaN(hour)) throw new Error("Invalid date. Expected a Date object.");

  const [ startTime, endTime ] = rushHourTime.split('-').map(Number);

  if (isNaN(startTime) || isNaN(endTime)) throw new Error("Invalid rush hour time. Expected format: 'start-end'.");

  return day === getDayOfWeek(rushHourDay) && hour >= startTime && hour < endTime;
}

/**
 * Converts a string representing a day of the week to a DayOfWeek enum value.
 *
 * @param day - A string representing a day of the week.
 * @returns The DayOfWeek enum value corresponding to the input string.
 * @throws {Error} Will throw an error if the input is not a valid day of the week.
 *
 * @remarks
 * The function supports the following day strings: "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday".
 */

export function getDayOfWeek(day: string): DayOfWeek {
  switch (day.toLowerCase()) {
    case "monday":
      return DayOfWeek.MONDAY;
    case "tuesday":
      return DayOfWeek.TUESDAY;
    case "wednesday":
      return DayOfWeek.WEDNESDAY;
    case "thursday":
      return DayOfWeek.THURSDAY;
    case "friday":
      return DayOfWeek.FRIDAY;
    case "saturday":
      return DayOfWeek.SATURDAY;
    case "sunday":
      return DayOfWeek.SUNDAY;
    default:
      throw new Error("Invalid day of week. Expected one of: 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'.");
  }
}

export default isRushHour;
