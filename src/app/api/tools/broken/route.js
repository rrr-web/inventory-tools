import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { toolId, toolName, quantity, reportedBy, description, brokenDate } = body;

    if (!toolId || !quantity || !reportedBy || !brokenDate) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Ambil stok alat
    const tool = await prisma.stock_toolRoom.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      return NextResponse.json(
        { error: "Alat tidak ditemukan" },
        { status: 404 }
      );
    }

    if (tool.quantity < quantity) {
      return NextResponse.json(
        { error: `Stok tidak cukup. Stok tersedia: ${tool.quantity}` },
        { status: 400 }
      );
    }

    // 1️⃣ Kurangi stok
    await prisma.stock_toolRoom.update({
      where: { id: toolId },
      data: {
        quantity: { decrement: quantity },
      },
    });

    // 2️⃣ Tambahkan log alat rusak
    const broken = await prisma.toolBroken.create({
      data: {
        toolId,
        toolName,
        quantity,
        reportedBy,
        description: description || null,
        brokenDate: new Date(brokenDate).toISOString(),
      },
    });

    return NextResponse.json(
      { success: true, data: broken },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ POST /broken error:", error);
    return NextResponse.json(
      { error: "Gagal mencatat kerusakan alat" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const brokenTools = await prisma.toolBroken.findMany({
     
    });

    return NextResponse.json(brokenTools)
  } catch (error) {
    console.error("❌ GET /broken error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kerusakan alat" },
      { status: 500 }
    );
  }
}