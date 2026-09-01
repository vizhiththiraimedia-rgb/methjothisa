export const dynamic = 'force-dynamic';
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAccessToken, generateAccessToken, generateRefreshToken, verifyPassword } from "@/lib/auth";
import { ApiResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, role: true, password: true, isVerified: true, isActive: true },
    });

    if (!user || !user.password) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, email: user.email, role: user.role });

    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const response = NextResponse.json<ApiResponse>({ success: true, data: { user: { id: user.id, email: user.email, name: user.name, role: user.role } } }, { status: 200 });
    response.cookies.set("access_token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 });
    response.cookies.set("refresh_token", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
