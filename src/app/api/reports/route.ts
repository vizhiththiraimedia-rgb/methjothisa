export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const type = searchParams.get("type");

    const where = type ? { type: type.toUpperCase() as any } : {};
    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { chart: { select: { nakshatra: true, ascendant: true } } },
      }),
      prisma.report.count({ where }),
    ]);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: reports,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Failed to fetch reports" }, { status: 500 });
  }
}
