export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const dbStatus = await prisma.$queryRaw`SELECT 1 as status`;
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        status: "healthy",
        database: dbStatus ? "connected" : "error",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Database connection failed" }, { status: 500 });
  }
}
