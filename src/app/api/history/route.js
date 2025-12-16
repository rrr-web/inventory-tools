import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getStartAndEndOfMonth() {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  return { startOfMonth, endOfMonth };
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const sourceParam = searchParams.get("source");
  const actionParam = searchParams.get("action");
  const filterMonth = searchParams.get("filterMonth");

  let where = {};

  if (sourceParam) {
    where.source = sourceParam;
  }

  if (actionParam) {
    where.action = actionParam;
  }

  if (filterMonth === "true") {
    const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();

    where.createdAt = {
      gte: startOfMonth,
      lte: endOfMonth,
    };
  }

  try {
    if (searchParams.get("countOnly") === "true") {
      const count = await prisma.stockHistory.count({ where });
      return NextResponse.json(count);
    }

    const history = await prisma.stockHistory.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(history);
  } catch (err) {
    console.error("Error fetching stock history:", err);
    return NextResponse.json(
      { success: false, err: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

async function decreaseStock(toolId, quantity) {
  try {
    return await prisma.stock_warehouse.update({
      where: { id: toolId },
      data: {
        quantity: {
          decrement: Number(quantity),
        },
      },
    });
  } catch (error) {
    console.error("Error decreasing stock:", error);
    throw new Error("Gagal mengurangi stok");
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(" data:", body);

    const { toolId, toolName, brand, spec, PN, quantity, receiver } = body;

    if (!toolId || !toolName || !quantity || !receiver) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const currentStock = await prisma.stock_warehouse.findUnique({
      where: { id: toolId },
      select: { quantity: true },
    });

    if (!currentStock) {
      return NextResponse.json(
        { error: "Tool tidak ditemukan di warehouse" },
        { status: 404 }
      );
    }

    if (currentStock.quantity < quantity) {
      return NextResponse.json(
        { error: "Stok tidak mencukupi" },
        { status: 400 }
      );
    }

    const result = await prisma.stockHistory.create({
      data: {
        toolName,
        brand,
        spec,
        PN,
        source: "Gudang",
        receiver,
        action: "OUT",
        quantityChange: -Number(quantity),
        description: "Tools keluar dari gudang",
      },
    });

    console.log("✅ History created:", result);

    await decreaseStock(toolId, quantity);

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: "Data berhasil disimpan dan stok diperbarui",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("error:", err);

    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    if (err.code === "P2003") {
      return NextResponse.json(
        { error: "Foreign key constraint failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Gagal menambahkan data",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
