import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, userName, password } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!userName || userName.trim() === "") {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }
    if (!password || password.trim() === "") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const existingUser = await prisma.user.findUnique({
      where: { userName: userName.trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    const userData = {
      name: name.trim(),
      userName: userName.trim(),
      password: hashedPassword,
    };

    const user = await prisma.user.create({
      data: userData,
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    if (err.name === "PrismaClientValidationError") {
      const errorString = err.toString();
      return NextResponse.json(
        {
          error: "Data validation error",
          details: errorString,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
