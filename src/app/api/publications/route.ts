import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import slugify from 'slugify';

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
    const image = formData.get('image') as File;

    if (!title || !content || !datePublished || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save uploaded image
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${randomUUID()}-${image.name}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    await writeFile(filePath, buffer);

    const slug = slugify(title, { lower: true, strict: true });

    const publication = await prisma.publication.create({
      data: {
        title,
        slug,
        content,
        datePublished: new Date(datePublished),
        image: `/uploads/${fileName}`,
      },
    });

    return NextResponse.json(publication, { status: 201 });
  } catch (error) {
    console.error('Error creating publication:', error);
    return NextResponse.json({ error: 'Failed to create publication' }, { status: 500 });
  }
}