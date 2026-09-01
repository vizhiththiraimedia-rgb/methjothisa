import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth";
import { ApiResponse } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : request.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true, isVerified: true, language: true, createdAt: true },
    });

    if (!user) {
      return NextResponse.json<ApiResponse>({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
