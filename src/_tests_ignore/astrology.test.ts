import { describe, it, expect } from "vitest";
import { calculateChart } from "@/services/astrology";

describe("Astrology Engine", () => {
  it("should calculate chart data", async () => {
    const chartData = await calculateChart({
      dateOfBirth: new Date("1990-01-01"),
      birthTime: "12:00",
      latitude: 40.7128,
      longitude: -74.006,
      timezone: "America/New_York",
      ayanamsa: "lahiri",
      chartSystem: "south_indian",
    });

    expect(chartData).toBeDefined();
    expect(chartData.planetaryPositions).toBeDefined();
    expect(chartData.houses).toBeDefined();
    expect(chartData.nakshatra).toBeDefined();
    expect(chartData.ascendant).toBeDefined();
  });

  it("should have valid zodiac signs", async () => {
    const chartData = await calculateChart({
      dateOfBirth: new Date("1990-01-01"),
      birthTime: "12:00",
      latitude: 40.7128,
      longitude: -74.006,
      timezone: "America/New_York",
      ayanamsa: "lahiri",
      chartSystem: "south_indian",
    });

    const validSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    expect(validSigns).toContain(chartData.sunSign);
    expect(validSigns).toContain(chartData.moonSign);
    expect(validSigns).toContain(chartData.ascendant);
  });
});
