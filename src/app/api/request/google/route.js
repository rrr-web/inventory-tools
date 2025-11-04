import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  // ✅ Cek Authorization Header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token || token !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log(body);

    const newRequest = await prisma.request_tool.create({
      data: {
        toolName: body.toolName,
        quantity: Number(body.quantity),
        requester: body.requester,
        merk: body.merk || "N/A",
        spec: body.spec || "N/A",
        PN: body.PN || "N/A",
        price: Number(body.price) || 0,
        reason: body.reason,
        location: body.location,
        reference: body.reference || "N/A",
        note: body.note || "N/A",
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
