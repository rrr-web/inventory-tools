import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



export async function PATCH(req, context) {
  const { id } = await context.params; // 
  const body = await req.json();
  const { toolName, quantity, brokenDate,reportedBy,description,status  } = body;

  try {
    const updated = await prisma.toolBroken.update({
      where: { id }, 
      data: {
        ...(toolName && { toolName }),
        ...(quantity && { quantity }),
        ...(reportedBy && { reportedBy }),
        ...(description && { description }),
        ...(brokenDate && { brokenDate: new Date(brokenDate) }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ PATCH error:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  const { id } = await context.params;

  try {
    const deleted = await prisma.toolBroken.delete({
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
