import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/zod";
import { hash } from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validasi input
    const validated = RegisterSchema.safeParse(body);
    if (!validated.success) {
      return Response.json(
        { error: validated.error.errors[0].message },
        { status: 400 }
      );
    }

    const { userName, name, password } = validated.data;

    const existing = await prisma.user.findUnique({
      where: { userName },
    });

    if (existing) {
      return Response.json(
        { error: "Username sudah digunakan" },
        { status: 409 }
      );
    }

   
    const hashed = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        userName,
        name,
        password: hashed,
      },
    });

    return Response.json(
      {
        message: "User berhasil dibuat",
        user: {
          id: newUser.id,
          userName: newUser.userName,
          name: newUser.name,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
