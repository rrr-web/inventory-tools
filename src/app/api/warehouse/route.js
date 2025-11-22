import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Ambil semua data gudang
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lowStock = searchParams.get("lowStock");
     const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;


    const where = lowStock
      ? { quantity: { lte: 3 } } // jika ?lowStock=true
      : {}; // jika tidak ada parameter, ambil semua

    const [tools, total] = await Promise.all([
    prisma.stock_warehouse.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.stock_warehouse.count({ where }),
    ]);

    return NextResponse.json({
      data: tools,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      filters: lowStock,
    });
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
        location: body.location,
        quantity: Number(body.quantity),
      },
    })

    return NextResponse.json(tools)
  } catch (error) {
    console.error("Error POST /api/warehouse:", error)
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 })
  }
}