import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Ambil semua data tools
export async function GET() {
  try {
    const tools = await prisma.stock_ToolRoom.findMany({
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
export async function POST(request) {
  try {
    const body = await request.json()

    const tools = await prisma.stock_ToolRoom.create({
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
    console.error("Error POST /api/tools:", error)
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 })
  }
}