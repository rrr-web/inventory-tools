import {NextResponse} from 'next/server';;
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  try {
    const requests = await prisma.request_tool.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
