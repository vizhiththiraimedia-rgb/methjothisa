import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const remedy = await prisma.remedy.findUnique({
      where: { id: params.id },
    });

    if (!remedy) {
      return NextResponse.json({ success: false, error: "Remedy not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: remedy });
  } catch (error) {
    console.error("Error fetching remedy:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch remedy" }, { status: 500 });
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
    const remedy = await prisma.remedy.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        category: body.category,
        subCategory: body.subCategory,
        price: body.price,
        currency: body.currency,
        description: body.description,
        image: body.image,
        isActive: body.isActive,
        sortOrder: body.sortOrder,
      },
    });

    return NextResponse.json({ success: true, data: remedy });
  } catch (error) {
    console.error("Error updating remedy:", error);
    return NextResponse.json({ success: false, error: "Failed to update remedy" }, { status: 500 });
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

    await prisma.remedy.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Error deleting remedy:", error);
    return NextResponse.json({ success: false, error: "Failed to delete remedy" }, { status: 500 });
  }
}
