import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  // ✅ Cek Authorization Header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token || token !== process.env.GOOGLE_FORM_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const newRequest = await prisma.request.create({
      data: {
        toolName: body.toolName,
        quantity: body.quantity,
        requester: body.requester,
        merk: body.merk || "N/A",
        PN: body.PN || "N/A",
        spec: body.spec || "N/A",
        price: Number(body.price) || 0,
        reason: body.reason,
        location: body.location,
        notes: body.notes || null,
      },
    });

    return NextResponse.json({ success: true, data: newRequest });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
