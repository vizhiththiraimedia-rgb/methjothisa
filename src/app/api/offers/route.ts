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

    const offers = await prisma.offer.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: offers });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch offers" }, { status: 500 });
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
    const offer = await prisma.offer.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        subtitle: body.subtitle,
        originalPrice: body.originalPrice,
        discountedPrice: body.discountedPrice,
        discount: body.discount,
        pages: body.pages,
        languages: body.languages,
        delivery: body.delivery,
        image: body.image,
        href: body.href,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: offer }, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json({ success: false, error: "Failed to create offer" }, { status: 500 });
  }
}
