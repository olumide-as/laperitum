'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Publication {
  id: number;
  title: string;
  slug: string;        // Add slug field
  content: string;
  image: string;
  datePublished: string;
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('/api/publications');
        const data = await response.json();

        if (Array.isArray(data)) {
          setPublications(data);
        } else {
          console.error('Unexpected response:', data);
        }
      } catch (error) {
        console.error('Error fetching publications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96 w-full flex items-center justify-center text-center mb-12"
        style={{ backgroundImage: "url(/assets/publicationbg.png)" }}
      >
        <h1 className="text-4xl font-bold text-[#2F3545]">Publications</h1>
      </div>

      {/* Publications Content */}
      <div className="px-8 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication) => (
            <div
              key={publication.id}
              className="bg-white rounded-lg border border-[#C1A17C] overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={publication.image || '/assets/placeholder.jpg'}
                  alt={publication.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#2F3545] mb-2">
                  {publication.title}
                </h3>
                <div
                  className="text-sm text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: publication.content.substring(0, 100),
                  }}
                />
                <div className="flex items-center justify-between">
                  <Link
                    href={`/publications/${publication.slug}`}  
                    className="bg-[#C1A17C] text-[#2F3545] font-semibold py-2 px-4 rounded-md hover:bg-opacity-90"
                  >
                    Read More
                  </Link>
                  <span className="text-xs text-gray-500">
                    {formatDate(publication.datePublished)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}