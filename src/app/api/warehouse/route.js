import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Ambil semua data gudang
export async function GET() {
  try {
    const tools = await prisma.stock_warehouse.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data gudang" },
      { status: 500 }
    );
  }
}


// POST: Tambah data stovk gudang
export async function POST(request) {
  try {
    const body = await request.json()

    const tools = await prisma.stock_warehouse.create({
      data: {
        toolName: body.toolName,
        brand: body.brand,
        PN: body.PN,
        spec: body.spec,
        quantity: Number(body.quantity),
        location: body.location,
      },
    })

    return NextResponse.json(tools)
  } catch (error) {
    console.error("Error POST /api/warehouse:", error)
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 })
  }
}