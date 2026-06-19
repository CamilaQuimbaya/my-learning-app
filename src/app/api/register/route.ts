import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "El correo y la contraseña son obligatorios." },
        { status: 400 }
      );
    }
    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const db = await getDb();
    const users = db.collection("users");

    const existing = await users.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con ese correo." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    await users.insertOne({
      name: name?.trim() || normalizedEmail.split("@")[0],
      email: normalizedEmail,
      password: hashed,
      image: null,
      emailVerified: null,
      progress: { points: 0, exercises: {} },
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Error en /api/register:", err);
    return NextResponse.json(
      { error: "Error del servidor. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
