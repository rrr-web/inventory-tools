import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



export async function PATCH(req, context) {
  const { id } = await context.params; // 
  const body = await req.json();
  const { 
    toolName, 
    quantity, 
    requester,
    brand, 
    spec,
    PN, 
    price,
    reason,
    location,
    reference,
    note,
    status,
     } = body;

  try {
    const updated = await prisma.request_tool.update({
      where: { id }, 
      data: {
        ...(toolName && { toolName }),
        ...(quantity && { quantity }),
        ...(requester && { requester }),
        ...(price && { price }),
        ...(brand && { brand }),
        ...(PN && { PN }),
        ...(reason && { reason }),
        ...(reference && { reference }),
        ...(note && { note }),
        ...(spec && { spec }),
        ...(location && { location }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}



export async function DELETE(req, context) {
  const { id } = await context.params;

  try {
    const deleted = await prisma.request_tool.delete({
      where: { id }, 
    });

    return NextResponse.json({
      message: "Data berhasil dihapus",
      deleted,
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}
