import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

// history
async function addHistory({ toolName, brand, spec, PN, action, source, quantityChange, description, receiver }) {
  return prisma.stockHistory.create({
    data: {
      toolName,
      brand,
      spec,
      PN,
      action,
      source,
      quantityChange,
      description,
      receiver
    },
  });
}

// stok ke Tools Room
export async function POST(req) {
  try {
    const body = await req.json();
    const { toolId, toolName, brand, spec, PN, quantity } = body;

    if (!toolId || !toolName || !quantity) {
      return NextResponse.json(
        { error: "toolId, toolName dan quantity wajib diisi" },
        { status: 400 }
      );
    }

    // stok dari warehouse
    const tool = await prisma.stock_warehouse.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      return NextResponse.json(
        { error: "Alat tidak ditemukan di Warehouse" },
        { status: 404 }
      );
    }

    if (tool.quantity < quantity) {
      return NextResponse.json(
        { error: `Stok tidak cukup. Tersedia: ${tool.quantity}` },
        { status: 400 }
      );
    }

    // kurangi stok dari warehouse
    await prisma.stock_warehouse.update({
      where: { id: toolId },
      data: {
        quantity: { decrement: Number(quantity) },
      },
    });

    //  apakah tool sudah ada di Tools Room
    const existingTool = await prisma.stock_toolRoom.findFirst({
      where: { toolId },
    });

    let result;

    if (existingTool) {
      result = await prisma.stock_toolRoom.update({
        where: { id: existingTool.id },
        data: {
          quantity: { increment: Number(quantity) },
        },
      });
    } else {
      result = await prisma.stock_toolRoom.create({
        data: {
          toolId,
          toolName,
          brand,
          spec,
          PN,
          quantity: Number(quantity),
        },
      });
    }

    // history pengeluaran gudang
    await addHistory({
      toolName,
      brand,
      spec,
      PN,
      source: "Gudang",
      receiver:"Tools Room",
      action: "OUT",
      quantityChange: -Number(quantity),
      description: "Tools keluar dari gudang",
    });

    // history penambahan tools room
    await addHistory({
      toolName,
      brand,
      spec,
      PN,
      source: "Tools Room",
      action: "IN",
      quantityChange: Number(quantity),
      description: "Tools masuk ke Tools Room",
    });

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Gagal mencatat penambahan tools" },
      { status: 500 }
    );
  }
}
