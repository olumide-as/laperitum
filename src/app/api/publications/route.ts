import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';
import slugify from 'slugify';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function GET() {
  try {
    const publications = await prisma.publication.findMany({
      orderBy: {
        datePublished: 'desc',
      },
    });

    return NextResponse.json(publications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json({ error: 'Failed to fetch publications' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const datePublished = formData.get('datePublished') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    // Validation
    if (!title || !content || !datePublished) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, datePublished' },
        { status: 400 }
      );
    }

    if (!imageFile && !imageUrl) {
      return NextResponse.json(
        { error: 'Either image file or imageUrl is required' },
        { status: 400 }
      );
    }

    let imagePath = '';

    // Handle file upload
    if (imageFile) {
      // Validate file size
      if (imageFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'File size exceeds 5MB limit' },
          { status: 400 }
        );
      }

      // Validate file type
      if (!imageFile.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload an image.' },
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

    const slug = slugify(title, { lower: true, strict: true });

    const publication = await prisma.publication.create({
      data: {
        title: title.trim(),
        slug,
        content: content.trim(),
        datePublished: new Date(datePublished),
        image: imagePath,
      },
    });

    return NextResponse.json(publication, { status: 201 });
  } catch (error) {
    console.error('Error creating publication:', error);
    return NextResponse.json({ error: 'Failed to create publication' }, { status: 500 });
  }
}