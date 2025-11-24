import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
    const { id } = await context.params;

    try {
        const deleted = await prisma.stockHistory.delete({
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


export async function PATCH(req, context) {
  const { id } = await context.params; // 
  const body = await req.json();
  const { toolName,brand,PN,spec, action, quantityChange, createdAt } = body;

  try {
    const updated = await prisma.stockHistory.update({
      where: { id }, 
      data: {
        ...(toolName && { toolName }),
        ...(brand && { brand }),
        ...(PN && { PN }),
        ...(spec && { action }),
        ...(quantityChange && {quantityChange: Number(quantityChange) }),
        ...(createdAt && { createdAt: new Date(createdAt) })
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ PATCH error:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}