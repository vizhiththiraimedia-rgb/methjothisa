export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ApiResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message, chartId } = body;

    if (!message) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Message is required" }, { status: 400 });
    }

    const chart = chartId ? await prisma.chart.findUnique({ where: { id: chartId }, include: { birthDetails: true } }) : null;

    const systemPrompt = chart
      ? `You are an expert astrologer. The user has a ${chart.chartType} chart. Moon: ${chart.moonSign}, Sun: ${chart.sunSign}, Ascendant: ${chart.ascendant}, Nakshatra: ${chart.nakshatra}.`
      : "You are an expert astrologer assistant.";

    const reply = `Based on your query about "${message}", here is my astrological analysis:\n\nThis is a placeholder response. In production, this would call OpenAI, Claude, or Gemini APIs with the system prompt: ${systemPrompt}`;

    return NextResponse.json<ApiResponse>({ success: true, data: { reply, chartId } }, { status: 200 });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Failed to process message" }, { status: 500 });
  }
}
