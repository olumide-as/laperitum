import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: "Missing passwords" }, { status: 400 });
    }

    // TODO: get user ID from session or token
    // For demo, assume userId = 1 (replace with real auth logic)
    const userId = 1;

    // Fetch user from DB
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 401 });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in DB
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}