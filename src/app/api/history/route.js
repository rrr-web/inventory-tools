import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const {searchParams} = new URL(req.url)
  const source = searchParams.get('source')

    const where = source ? ({source : "Gudang"}) : ({source : "Tools Room"})
  try {
    const history = await prisma.stockHistory.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(history);
  } catch (err) {
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
          decrement: Number(quantity)
        }
      }
    });
  } catch (error) {
    console.error("Error decreasing stock:", error);
    throw new Error("Gagal mengurangi stok");
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Received data:", body);
    
    const { toolId, toolName, brand, spec, PN, quantity, receiver } = body;

    if (!toolId || !toolName || !quantity || !receiver) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

   
    const currentStock = await prisma.stock_warehouse.findUnique({
      where: { id: toolId },
      select: { quantity: true }
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
      }
    });

    console.log("✅ History created:", result);

    
    await decreaseStock(toolId, quantity);

    return NextResponse.json(
      { 
        success: true, 
        data: result,
        message: "Data berhasil disimpan dan stok diperbarui"
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("error:", err);
        
    if (err.code === 'P2025') {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }
    
    if (err.code === 'P2003') {
      return NextResponse.json(
        { error: "Foreign key constraint failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: "Gagal menambahkan data",
        details: err.message 
      },
      { status: 500 }
    );
  }
}

