export const dynamic = 'force-dynamic';
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  try {
    const { user, error, status } = await authenticateRequest(request);
    if (error) {
      return NextResponse.json({ success: false, error }, { status });
    }

    const auth = requireRole(user!.role, ["ADMIN", "SUPER_ADMIN"]);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const { text, language } = await request.json();
    
    if (!text || !language) {
      return NextResponse.json({ success: false, error: "Text and language are required" }, { status: 400 });
    }

    const token = process.env.SAM_AI_TOKEN;
    if (!token) {
      return NextResponse.json({ success: false, error: "SAM_AI_TOKEN not configured" }, { status: 500 });
    }

    const response = await fetch("https://samaipro.vercel.app/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ text, language })
    });

    const data = await response.json();
    
    if (data.status === "success" && data.translated_text) {
      return NextResponse.json({ success: true, translated_text: data.translated_text });
    } else {
      return NextResponse.json({ success: false, error: "Translation failed from SAM AI" }, { status: 500 });
    }
  } catch (error) {
    console.error("Auto translate error:", error);
    return NextResponse.json({ success: false, error: "Failed to auto-translate" }, { status: 500 });
  }
}
