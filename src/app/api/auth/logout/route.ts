export const dynamic = 'force-dynamic';
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types";

export async function POST() {
  try {
    const response = NextResponse.json<ApiResponse>({ success: true, message: "Logged out successfully" }, { status: 200 });
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
