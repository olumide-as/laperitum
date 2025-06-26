import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

function getIdFromUrl(req: NextRequest): number | null {
  const url = new URL(req.url);
  const idString = url.pathname.split("/").pop();
  const id = Number(idString);
  return isNaN(id) ? null : id;
}
// ✅ GET a single publication by ID using context
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop());

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const publication = await prisma.publication.findUnique({
      where: { id },
    });

    if (!publication) {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    }

    return NextResponse.json(publication);
  } catch (error) {
    console.error("Error fetching publication by ID:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (id === null) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const datePublished = formData.get("datePublished") as string;
    const image = formData.get("image") as File | null;
    const existingImage = formData.get("existingImage") as string | null;

    if (!title || !content || !datePublished) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let imagePath = existingImage || "";

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${randomUUID()}-${image.name}`;
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const updated = await prisma.publication.update({
      where: { id },
      data: {
        title,
        content,
        datePublished: new Date(datePublished),
        image: imagePath,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating publication:", error);
    return NextResponse.json({ error: "Failed to update publication" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (id === null) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.publication.delete({ where: { id } });
    return NextResponse.json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error("Error deleting publication:", error);
    return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 });
  }
}