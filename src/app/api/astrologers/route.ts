import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const language = searchParams.get("language");
    const active = searchParams.get("active");

    const where: any = {};
    if (category) where.category = category;
    if (active !== null) where.isActive = active === "true";
    if (language) {
      where.languages = { contains: language, mode: "insensitive" };
    }

    const astrologers = await prisma.astrologer.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: astrologers });
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch astrologers" }, { status: 500 });
  }
}

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

    const body = await request.json();
    const astrologer = await prisma.astrologer.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        experience: body.experience,
        photo: body.photo,
        category: body.category,
        languages: body.languages,
        areas: body.areas,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: astrologer }, { status: 201 });
  } catch (error) {
    console.error("Error creating astrologer:", error);
    return NextResponse.json({ success: false, error: "Failed to create astrologer" }, { status: 500 });
  }
}
