import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Ambil semua data peminjaman open
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

   const where = status
      ? { status: status === "open" ? "Open" : "Close" }
      : {}; 

  try {
    const borrows = await prisma.borrow.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(borrows);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data peminjaman" },
      { status: 500 }
    );
  }
}


// POST: Tambah data peminjaman
export async function POST(request) {
  try {
    const body = await request.json()

    const newBorrow = await prisma.borrow.create({
      data: {
        toolName: body.toolName,
        borrower: body.borrower,
        borrowDate: new Date(body.borrowDate),
        status: "Open",
        location: body.location,
        tools_keeper: body.tools_keeper,
      },
    })

    return NextResponse.json(newBorrow)
  } catch (error) {
    console.error("Error POST /api/borrow:", error)
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 })
  }
}



