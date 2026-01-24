import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import PublicationDetailsClient from './PublicationDetailsClient';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  const publication = await prisma.publication.findUnique({
    where: { slug },
  });

  if (!publication) return { title: 'Publication Not Found' };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const pageUrl = `${baseUrl}/publications/${slug}`;

  // Create excerpt from content (first 160 characters of plain text)
  const plainText = publication.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .trim();
  const excerpt = plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');

  return {
    title: `${publication.title} | La Peritum Law Practice`,
    description: excerpt,
    keywords: [
      'legal article',
      'Nigeria law',
      'corporate law',
      'business law',
      publication.title,
    ],
    authors: [{ name: 'La Peritum Law Practice' }],
    openGraph: {
      title: publication.title,
      description: excerpt,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: publication.image || `${baseUrl}/assets/og-image.png`,
          width: 1200,
          height: 630,
          alt: publication.title,
        },
      ],
      publishedTime: publication.datePublished?.toISOString(),
      authors: ['La Peritum Law Practice'],
    },
    twitter: {
      card: 'summary_large_image',
      title: publication.title,
      description: excerpt,
      images: [publication.image || `${baseUrl}/assets/og-image.png`],
      creator: '@LaPeritumLaw',
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function SinglePublicationPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const publication = await prisma.publication.findUnique({
    where: { slug },
  });

  if (!publication) notFound();

  const latestPublications = await prisma.publication.findMany({
    where: { slug: { not: slug } },
    orderBy: { datePublished: 'desc' },
    take: 3,
  });

  const safePublication = {
    ...publication,
    image: publication.image || '',
    datePublished: publication.datePublished?.toString() || '',
  };

  const safeLatestPublications = latestPublications.map(pub => ({
    ...pub,
    image: pub.image || '',
    datePublished: pub.datePublished?.toString() || '',
  }));

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.laperitum.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Publications",
                item: "https://www.laperitum.com/publications",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: publication.title,
                item: `https://www.laperitum.com/publications/${slug}`,
              },
            ],
          }),
        }}
      />
      <PublicationDetailsClient
        publication={safePublication}
        latestPublications={safeLatestPublications}
      />
    </>
  );
}