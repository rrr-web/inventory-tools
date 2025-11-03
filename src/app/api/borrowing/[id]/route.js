import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


// PATCH: Update data peminjaman
export async function PATCH(req, context) {
  const { id } = await context.params; // 
  const body = await req.json();
  const { status, returnDate, condition } = body;

  try {
    const updated = await prisma.borrow.update({
      where: { id }, 
      data: {
        ...(status && { status }),
        ...(condition && { condition }),
        ...(returnDate && { returnDate: new Date(returnDate) }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ PATCH error:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}


// DELETE: Hapus data peminjaman
export async function DELETE(req, context) {
  const { id } = await context.params;

  try {
    const deleted = await prisma.borrow.delete({
      where: { id }, // Prisma otomatis pakai String id (karena di schema sudah pakai @map("_id"))
    });

    return NextResponse.json({
      message: "Data berhasil dihapus",
      deleted,
    });
  } catch (error) {
    console.error("❌ DELETE error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}
