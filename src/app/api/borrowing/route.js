import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Ambil semua data peminjaman open
export async function GET() {
  try {
    const borrows = await prisma.borrow.findMany({
      where: { status: "Open" },
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
        condition: "Normal",
      },
    })

    return NextResponse.json(newBorrow)
  } catch (error) {
    console.error("Error POST /api/borrow:", error)
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 })
  }
}



