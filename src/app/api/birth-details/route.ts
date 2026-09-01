export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types";
import { authenticateRequest } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  try {
    const { user, error, status } = await authenticateRequest(request);
    if (error) {
      return NextResponse.json<ApiResponse>({ success: false, error }, { status });
    }

    const birthDetails = await prisma.birthDetails.findMany({
      where: { userId: user!.id },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json<ApiResponse>({ success: true, data: birthDetails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching birth details:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Failed to fetch birth details" }, { status: 500 });
  }
}

