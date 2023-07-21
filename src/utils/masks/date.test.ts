import { formatDateToDDMMYYYY } from "./date";

describe("formatDateToDDMMYYYY", () => {
  it("should return null when provided with no date", () => {
    const result = formatDateToDDMMYYYY();
    expect(result).toBeNull();
  });

  it("should format ISO date to DD/MM/YYYY format", () => {
    const isoDate = "2023-07-20T12:34:56.789Z";
    const result = formatDateToDDMMYYYY(isoDate);
    expect(result).toBe("20/07/2023");
  });
});
