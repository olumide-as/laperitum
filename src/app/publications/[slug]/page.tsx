import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PublicationDetailsClient from './PublicationDetailsClient';

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
    <PublicationDetailsClient
      publication={safePublication}
      latestPublications={safeLatestPublications}
    />
  );
}