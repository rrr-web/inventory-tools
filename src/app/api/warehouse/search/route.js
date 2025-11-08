import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q") || ""

    const tools = await prisma.stock_warehouse.findMany({
      where: {
        toolName: { contains: q, mode: "insensitive" },
      },
      select: {
        id: true,
        toolName: true,
        brand: true,
        PN: true,
        quantity: true,
        spec: true,
      },
      take: 10,
    })

    return NextResponse.json(tools)
  } catch (error) {
    console.error("❌ Search Error:", error)
    return NextResponse.json({ error: "Gagal mencari tool" }, { status: 500 })
  }
}
