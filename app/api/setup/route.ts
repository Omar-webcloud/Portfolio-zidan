import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { email, password } = data

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Check if any user already exists to prevent open registration
    const userCount = await prisma.user.count()
    if (userCount > 0) {
      return NextResponse.json({ error: "Admin already exists. Setup is disabled." }, { status: 403 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    return NextResponse.json({ message: "Admin created successfully", email: user.email })
  } catch (error) {
    return NextResponse.json({ error: "Failed to set up admin" }, { status: 500 })
  }
}
