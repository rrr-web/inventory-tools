import {NextResponse} from 'next/server';;
import { prisma } from '@/lib/prisma';

export async function GET(req) {
 const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

   const where = status
      ? { status: status === "open" ? "Open" : "Close" }
      : {}; 
  try {
    const requests = await prisma.request_tool.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
     const count = await prisma.request_tool.count({ where });
    return NextResponse.json({requests, count})
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
