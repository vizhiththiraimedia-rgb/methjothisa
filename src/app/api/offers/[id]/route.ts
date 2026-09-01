import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/api-helpers";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: params.id },
    });

    if (!offer) {
      return NextResponse.json({ success: false, error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: offer });
  } catch (error) {
    console.error("Error fetching offer:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch offer" }, { status: 500 });
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
    const offer = await prisma.offer.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        subtitle: body.subtitle,
        originalPrice: body.originalPrice,
        discountedPrice: body.discountedPrice,
        discount: body.discount,
        pages: body.pages,
        languages: body.languages,
        delivery: body.delivery,
        image: body.image,
        href: body.href,
        isActive: body.isActive,
        sortOrder: body.sortOrder,
      },
    });

    return NextResponse.json({ success: true, data: offer });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json({ success: false, error: "Failed to update offer" }, { status: 500 });
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

    await prisma.offer.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json({ success: false, error: "Failed to delete offer" }, { status: 500 });
  }
}
