import isRushHour from "../isRushHour";

let date: Date;

describe("isRushHour", () => {
  it("returns true if the date and time fall within the rush hour period", () => {
    // Friday, 3:00pm
    date = new Date("2024-01-19T15:00");
    expect(isRushHour(date, "Friday", "15-19")).toBe(true);

    // Friday, 6:32pm
    date = new Date("2024-01-19T18:32");
    expect(isRushHour(date, "Friday", "15-19")).toBe(true);

    // Friday, 2:59pm
    date = new Date("2024-01-19T14:59");
    expect(isRushHour(date, "Friday", "15-19")).toBe(false);

    // Friday, 7:00pm
    date = new Date("2024-01-19T19:00");
    expect(isRushHour(date, "Friday", "15-19")).toBe(false);
  });
});
