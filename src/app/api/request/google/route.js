import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const API_KEY = process.env.GOOGLE_FORM_API_KEY; // ✅ simpan key di .env

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (authHeader !== `Bearer ${API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const created = await prisma.request.create({
      data: {
        toolName: body.toolName,
        quantity: Number(body.quantity),
        requester: body.requester,
        status: "Open", // default
        // createdAt otomatis terisi
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
