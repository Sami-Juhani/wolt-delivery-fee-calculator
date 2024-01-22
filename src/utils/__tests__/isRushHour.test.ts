import isRushHour from "../isRushHour";
import { getDayOfWeek, DayOfWeek } from "../isRushHour";

let date: Date;

describe("isRushHour", () => {
  it("returns true if the date and time fall within the rush hour period", () => {
    // Friday, 3:00pm
    date = new Date("2024-01-19T15:00");
    expect(isRushHour(date, "Friday", "15-19")).toBe(true);
  });
  
  it("returns false if the date and time fall just before the rush hour period", () => {
    // Friday, 2:59pm
    date = new Date("2024-01-19T14:59");
    expect(isRushHour(date, "Friday", "15-19")).toBe(false);
  });

  it("returns false if the date and time fall just after the rush hour period", () => {
    // Friday, 7:00pm
    date = new Date("2024-01-19T19:00");
    expect(isRushHour(date, "Friday", "15-19")).toBe(false);
  });

  it("throws an error if the date is not a valid Date object", () => {
    const invalidDate = new Date("invalid date");
    expect(() => isRushHour(invalidDate, "Friday", "15-19")).toThrow("Invalid date. Expected a Date object.");
  });

  it("throws an error if the date is not a valid Date object", () => {
    expect(() => isRushHour("invalid date" as any, "Friday", "15-19")).toThrow("Invalid date. Expected a Date object.");
  });

  it("throws an error if the rush hour time is not in the correct format", () => {
    date = new Date("2024-01-19T15:00");
    expect(() => isRushHour(date, "Friday", "invalid format")).toThrow("Invalid rush hour time. Expected format: 'start-end'.");
  });

  it("throws an error if the day of week is not a valid day", () => {
    date = new Date("2024-01-19T15:00");
    expect(() => isRushHour(date, "Funday", "15-19")).toThrow("Invalid day of week. Expected one of: 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'.");
  });

  it("returns false if the date and time do not fall within the rush hour period for a different day", () => {
    // Thursday, 3:00pm
    date = new Date("2024-01-18T15:00");
    expect(isRushHour(date, "Friday", "15-19")).toBe(false);
  });
});

describe("getDayOfWeek", () => {
  it("returns the correct DayOfWeek enum for each day of the week", () => {
    expect(getDayOfWeek("Monday")).toBe(DayOfWeek.MONDAY);
    expect(getDayOfWeek("Tuesday")).toBe(DayOfWeek.TUESDAY);
    expect(getDayOfWeek("Wednesday")).toBe(DayOfWeek.WEDNESDAY);
    expect(getDayOfWeek("Thursday")).toBe(DayOfWeek.THURSDAY);
    expect(getDayOfWeek("Friday")).toBe(DayOfWeek.FRIDAY);
    expect(getDayOfWeek("Saturday")).toBe(DayOfWeek.SATURDAY);
    expect(getDayOfWeek("Sunday")).toBe(DayOfWeek.SUNDAY);
  });

  it("is case-insensitive", () => {
    expect(getDayOfWeek("monday")).toBe(DayOfWeek.MONDAY);
    expect(getDayOfWeek("TUESDAY")).toBe(DayOfWeek.TUESDAY);
    expect(getDayOfWeek("WeDnEsDaY")).toBe(DayOfWeek.WEDNESDAY);
  });

  it("throws an error for invalid input", () => {
    expect(() => getDayOfWeek("Funday")).toThrow("Invalid day of week. Expected one of: 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'.");
  });
});
