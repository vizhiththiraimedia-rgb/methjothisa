export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    if (!refreshToken) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Refresh token required" }, { status: 401 });
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Invalid refresh token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { id: true, email: true, role: true } });
    if (!user) {
      return NextResponse.json<ApiResponse>({ success: false, error: "User not found" }, { status: 404 });
    }

    const newAccessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const newRefreshToken = generateRefreshToken({ userId: user.id, email: user.email, role: user.role });

    const response = NextResponse.json<ApiResponse>({ success: true, data: { accessToken: newAccessToken } }, { status: 200 });
    response.cookies.set("access_token", newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 15 * 60 });
    response.cookies.set("refresh_token", newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 });
    return response;
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
