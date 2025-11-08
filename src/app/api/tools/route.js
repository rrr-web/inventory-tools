import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Ambil semua data tools
export async function GET() {
  try {
    const tools = await prisma.stock_toolRoom.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data tools" },
      { status: 500 }
    );
  }
}


// POST: Tambah data stovk tools
export async function POST(req) {
  try {
    const body = await req.json();
    const { toolId, toolName, brand, spec, PN, quantity, location } = body;

    if (!toolId || !quantity || !location) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // 🔍 Cari tool dari warehouse
    const tool = await prisma.stock_warehouse.findUnique({
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

    // 🔽 Kurangi stok di warehouse
    await prisma.stock_warehouse.update({
      where: { id: toolId },
      data: {
        quantity: { decrement: quantity },
      },
    });

    // ➕ Tambahkan ke stok toolroom
    const add = await prisma.stock_toolRoom.create({
      data: {
        toolName,
        brand,
        PN,
        spec,
        quantity,
        location,
      },
    });

    return NextResponse.json({ success: true, data: add }, { status: 201 });
  } catch (error) {
    console.error("❌ POST /add tools error:", error);
    return NextResponse.json(
      { error: "Gagal mencatat penambahan alat" },
      { status: 500 }
    );
  }
}
