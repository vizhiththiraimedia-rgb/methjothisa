import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  try {
    const translations = await prisma.translation.findMany();
    // Format into a nested object: { language: { key: value } }
    const result: Record<string, Record<string, string>> = {};
    
    translations.forEach((t) => {
      if (!result[t.language]) result[t.language] = {};
      result[t.language][t.key] = t.value;
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching translations:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch translations" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { user, error, status } = await authenticateRequest(request);
    if (error) {
      return NextResponse.json({ success: false, error }, { status });
    }

    const auth = requireRole(user!.role, ["ADMIN", "SUPER_ADMIN"]);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const { key, language, value, namespace = "common" } = await request.json();
    
    const translation = await prisma.translation.upsert({
      where: {
        key_language_namespace: {
          key,
          language,
          namespace
        }
      },
      update: { value },
      create: { key, language, value, namespace }
    });

    return NextResponse.json({ success: true, data: translation });
  } catch (error) {
    console.error("Error updating translation:", error);
    return NextResponse.json({ success: false, error: "Failed to update translation" }, { status: 500 });
  }
}
