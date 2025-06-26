import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const validInviteCodes = process.env.VALID_INVITE_CODES
  ? process.env.VALID_INVITE_CODES.split(",").map(code => code.trim())
  : [];

export async function POST(req: Request) {
  try {
    const { username, password, inviteCode } = await req.json();

    console.log("Signup attempt:", { username, inviteCode });
    console.log("Valid invite codes loaded from .env:", validInviteCodes);

    if (!username || !password || !inviteCode) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Username, password, and invite code are required" },
        { status: 400 }
      );
    }

    // Validate invite code
    if (!validInviteCodes.includes(inviteCode)) {
      console.log("Invalid invite code:", inviteCode);
      return NextResponse.json(
        { error: "Invalid invite code" },
        { status: 403 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      console.log("Username already taken:", username);
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log("User created with ID:", user.id);
    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}