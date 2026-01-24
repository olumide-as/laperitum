import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function getIdFromUrl(req: NextRequest): number | null {
  const url = new URL(req.url);
  const idString = url.pathname.split("/").pop();
  const id = Number(idString);
  return isNaN(id) ? null : id;
}

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
    const imageFile = formData.get("image") as File | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const existingImage = formData.get("existingImage") as string | null;

    // Validation
    if (!title || !content || !datePublished) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let imagePath = existingImage || "";

    // Handle new file upload
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      // Validate file size
      if (imageFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File size exceeds 5MB limit" },
          { status: 400 }
        );
      }

      // Validate file type
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload an image." },
          { status: 400 }
        );
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${randomUUID()}-${imageFile.name}`;
      
      try {
        const blob = await put(fileName, buffer, {
          access: 'public',
          addRandomSuffix: false,
        });
        imagePath = blob.url;
      } catch (error) {
        console.error('Error uploading to Vercel Blob:', error);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    } else if (imageUrl) {
      imagePath = imageUrl;
    }

    const updated = await prisma.publication.update({
      where: { id },
      data: {
        title: title.trim(),
        content: content.trim(),
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