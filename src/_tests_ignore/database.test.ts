import { describe, it, expect } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Database", () => {
  it("should connect to database", async () => {
    await prisma.$connect();
    expect(prisma).toBeDefined();
  });

  it("should have users table accessible", async () => {
    const count = await prisma.user.count();
    expect(typeof count).toBe("number");
  });
});
