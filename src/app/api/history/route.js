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
