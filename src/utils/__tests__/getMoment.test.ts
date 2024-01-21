import getMoment from "../getMoment";

let date: Date;
let formattedDate: string;

describe("getMoment", () => {
  it("should return a string in the format 'YYYY-MM-DDTHH:mm in local time'", () => {
    date = new Date();
    formattedDate = getMoment(date);
    expect(formattedDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    
    date = new Date("2024-01-19T15:00:00.000Z");
    formattedDate = getMoment(date);
    expect(formattedDate).toBe("2024-01-19T17:00");
  });
});
