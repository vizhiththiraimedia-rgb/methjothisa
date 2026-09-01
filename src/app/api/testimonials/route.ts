export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");

    const where: any = {};
    if (active !== null) where.isActive = active === "true";

    const items = await prisma.testimonial.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item = await prisma.testimonial.create({
      data: {
        name: body.name,
        text: body.text,
        photo: body.photo,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to create" }, { status: 500 });
  }
}
