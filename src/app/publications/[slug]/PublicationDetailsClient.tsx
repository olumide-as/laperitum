"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Publication {
  id: number;
  slug: string;
  title: string;
  content: string;
  image: string;
  datePublished: string | Date;
}

interface Props {
  publication: Publication;
  latestPublications: Publication[];
}

export default function PublicationDetailsClient({
  publication,
  latestPublications,
}: Props) {
  // Add JSON-LD structured data
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const pageUrl = `${baseUrl}/publications/${publication.slug}`;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: publication.title,
      description: publication.content
        .replace(/<[^>]*>/g, "")
        .substring(0, 160),
      image: publication.image || `${baseUrl}/assets/og-image.png`,
      datePublished: new Date(publication.datePublished).toISOString(),
      author: {
        "@type": "Organization",
        name: "La Peritum Law Practice",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "La Peritum Law Practice",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/assets/logo.svg`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(articleSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [publication]);
  // Format date helper
  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const pageUrl = `${baseUrl}/publications/${publication.slug}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${encodeURIComponent(
      publication.title
    )}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${encodeURIComponent(
      publication.title
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      publication.title + " " + pageUrl
    )}`,
  };

  return (
    <div className="pb-24">
      <div
        className="relative bg-cover bg-center h-96 w-full"
        style={{ backgroundImage: "url(/assets/publicationbg.png)" }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-[#2F3545]">Publications</h1>
        </div>
      </div>

      <div className="px-8 md:px-16 lg:px-32 mt-[-80px] z-10 relative">
        <div className="bg-white rounded-2xl border-2 border-[#C1A17C] shadow-lg">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden">
            <Image
              src={publication.image || "/assets/placeholder.jpg"}
              alt={publication.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-4 left-4 px-6 py-2 text-white w-full">
              <h2 className="text-left text-3xl font-semibold">
                {publication.title}
              </h2>
              <p className="text-left text-base mt-1">By Bolanle Opadokun</p>
            </div>
          </div>

          <div
            className="text-[#2F3545] leading-relaxed mb-6 p-6"
            dangerouslySetInnerHTML={{ __html: publication.content }}
          />

          <div className="flex flex-col md:flex-row md:justify-between md:items-center p-6">
            <span className="text-sm text-gray-600 mb-2">
              {formatDate(publication.datePublished)}
            </span>
            <div>
              <p className="text-lg font-semibold text-[#2F3545] mb-2">
                Share:
              </p>
              <div className="flex space-x-6">
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} size="xl" />
                </a>
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} size="xl" />
                </a>
                <a
                  href={shareUrls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="xl" />
                </a>
                <a
                  href={shareUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <FontAwesomeIcon icon={faWhatsapp} size="xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-16 lg:px-32 mt-16">
        <h2 className="text-2xl font-semibold text-[#2F3545] mb-6">
          Latest Publications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPublications.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-lg border border-[#C1A17C] overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={pub.image || "/assets/placeholder.jpg"}
                  alt={pub.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#2F3545] mb-2">
                  {pub.title}
                </h3>
                <div
                  className="text-sm text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: pub.content.substring(0, 100),
                  }}
                />
                <div className="flex items-center justify-between">
                  <Link
                    href={`/publications/${pub.slug}`}
                    className="bg-[#C1A17C] text-[#2F3545] py-2 px-4 rounded-md hover:bg-opacity-90"
                  >
                    Read More
                  </Link>
                  <span className="text-xs text-gray-500">
                    {formatDate(pub.datePublished)}
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
