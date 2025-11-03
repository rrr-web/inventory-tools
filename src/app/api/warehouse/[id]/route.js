import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


// PATCH: Update data stock gudang
export async function PATCH(req, context) {
  const { id } = await context.params; // 
  const body = await req.json();
  const { toolName, brand, PN, spec, quantity, location } = body;

  try {
    const updated = await prisma.stock_warehouse.update({
      where: { id }, 
      data: {
        ...(toolName && { toolName }),
        ...(brand && { brand }),
        ...(PN && { PN }),
        ...(spec && { spec }),
        ...(quantity && { quantity: Number(quantity) }),
        ...(location && { location }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ PATCH error:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

// DELETE: Hapus data stock gudang
export async function DELETE(req, context) {
  const { id } = await context.params;

  try {
    const deleted = await prisma.stock_warehouse.delete({
      where: { id }, 
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