export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const active = searchParams.get("active");

    const where: any = {};
    if (category) where.category = category;
    if (active !== null) where.isActive = active === "true";

    const remedies = await prisma.remedy.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: remedies });
  } catch (error) {
    console.error("Error fetching remedies:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch remedies" }, { status: 500 });
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
    const remedy = await prisma.remedy.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: body.category,
        subCategory: body.subCategory,
        price: body.price,
        currency: body.currency || "INR",
        description: body.description,
        image: body.image,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: remedy }, { status: 201 });
  } catch (error) {
    console.error("Error creating remedy:", error);
    return NextResponse.json({ success: false, error: "Failed to create remedy" }, { status: 500 });
  }
}
