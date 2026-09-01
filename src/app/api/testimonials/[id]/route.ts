export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.testimonial.findUnique({
      where: { id: params.id },
    });

    if (!item) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    const item = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        name: body.name,
        text: body.text,
        photo: body.photo,
        isActive: body.isActive,
        sortOrder: body.sortOrder,
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { user, error, status } = await authenticateRequest(request);
    if (error) {
      return NextResponse.json({ success: false, error }, { status });
    }

    const auth = requireRole(user!.role, ["ADMIN", "SUPER_ADMIN"]);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    await prisma.testimonial.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
