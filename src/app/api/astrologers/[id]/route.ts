import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const astrologer = await prisma.astrologer.findUnique({
      where: { id: params.id },
    });

    if (!astrologer) {
      return NextResponse.json({ success: false, error: "Astrologer not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: astrologer });
  } catch (error) {
    console.error("Error fetching astrologer:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch astrologer" }, { status: 500 });
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
    const astrologer = await prisma.astrologer.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        experience: body.experience,
        photo: body.photo,
        category: body.category,
        languages: body.languages,
        areas: body.areas,
        isActive: body.isActive,
        sortOrder: body.sortOrder,
      },
    });

    return NextResponse.json({ success: true, data: astrologer });
  } catch (error) {
    console.error("Error updating astrologer:", error);
    return NextResponse.json({ success: false, error: "Failed to update astrologer" }, { status: 500 });
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

    await prisma.astrologer.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Error deleting astrologer:", error);
    return NextResponse.json({ success: false, error: "Failed to delete astrologer" }, { status: 500 });
  }
}
