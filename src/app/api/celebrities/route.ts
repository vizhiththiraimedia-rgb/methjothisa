export const dynamic = 'force-dynamic';
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");

    const where: any = {};
    if (active !== null) where.isActive = active === "true";

    const items = await prisma.celebrity.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching celebrities:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch celebrities" }, { status: 500 });
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
    const item = await prisma.celebrity.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        photo: body.photo,
        href: body.href,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error("Error creating celebrity:", error);
    return NextResponse.json({ success: false, error: "Failed to create celebrity" }, { status: 500 });
  }
}
