import { format } from 'date-fns';

/**
 * Formats a given date and time to a string in the format 'YYYY-MM-DDTHH:mm'.
 *
 * @param date - The Date object representing the date and time to be formatted.
 * @returns A string representing the provided date and time in the format 'YYYY-MM-DDTHH:mm'.
 */
function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd\'T\'HH:mm');
}

export default formatDate;
