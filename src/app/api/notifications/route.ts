export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, createApiResponse } from "@/lib/api-helpers";
import { ApiResponse } from "@/types";

export async function GET(request: NextRequest) {
  const { user, error, status } = await authenticateRequest(request);
  if (error) {
    return NextResponse.json(createApiResponse(false, null, error), { status });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(createApiResponse(true, notifications), { status: 200 });
  } catch (error) {
    return NextResponse.json(createApiResponse(false, null, "Failed to fetch notifications"), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { user, error, status } = await authenticateRequest(request);
  if (error) {
    return NextResponse.json(createApiResponse(false, null, error), { status });
  }

  try {
    const body = await request.json();
    const { type, title, message, data } = body;

    const notification = await prisma.notification.create({
      data: { userId: user!.id, type, title, message, data },
    });

    return NextResponse.json(createApiResponse(true, notification), { status: 201 });
  } catch (error) {
    return NextResponse.json(createApiResponse(false, null, "Failed to create notification"), { status: 500 });
  }
}
