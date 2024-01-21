/**
 * Formats a given date and time to a string in the format 'YYYY-MM-DDTHH:mm'.
 *
 * @param date - The Date object representing the date and time to be formatted.
 * @returns A string representing the provided date and time in the format 'YYYY-MM-DDTHH:mm'.
 */

function getMoment(date: Date): string {
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  return formattedDate;
}

export default getMoment;
