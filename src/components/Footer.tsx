'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkerAlt,
  faPhoneSquare,
} from '@fortawesome/free-solid-svg-icons';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#ECE3D8] text-[#2F3545] py-8">
      {/* Part 1: Main Footer Content */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* Section 1: Logo and Emails */}
        <div>
          <div className="mb-4 w-48 relative h-20">
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        {/* Section 2: Company Links */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-[#2F3545]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#2F3545]">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#2F3545]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Resources Links */}
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/publications" className="hover:text-[#2F3545]">
                Publications
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#2F3545]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-[#2F3545]">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 4: Social Links, Contact, and Consultation Button */}
        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://x.com/LaPeritumLaw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2F3545]"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
            <a
              href="https://www.instagram.com/laperitumlaw/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2F3545]"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="http://linkedin.com/company/laperitumlaw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2F3545]"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faPhoneSquare} className="pr-2" size="lg" />
            +234 803 770 9418
          </p>
          <Link href="/contact">
            <button className="mt-4 bg-[#2F3545] text-white px-4 py-2 rounded-md">
              Book a Consultation
            </button>
          </Link>
        </div>
      </div>

      {/* Part 2: Address */}
      <div className="text-[#2F3545] py-8 px-4 lg:text-center text-sm">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mx-auto mb-2" size="lg" />
        <p>14a Da Silva Street, Off Chris Madueke Drive, Lekki Phase 1</p>
      </div>

      {/* Part 3: Footer Bottom */}
      <div className="border-t border-[#2F3545] mt-4 py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between text-sm">
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="hover:text-[#2F3545]">
              Privacy Policy
            </Link>
          </div>
          <p className="lg:text-right mt-2 md:mt-0">
            &copy; {currentYear} Laperitum Law Practice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;