'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // remove useRouter here
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  // const router = useRouter();  <-- remove this line

  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const baseMenuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Practice Area', path: '/services' },
    { name: 'Publications', path: '/publications' },
  ];

  const menuItems = session
    ? [...baseMenuItems, { name: 'Dashboard', path: '/admin/dashboard' }]
    : baseMenuItems;

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
    closeMobileMenu();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#ECE3D8] border-b-2 border-gray-200 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <Link href="/">
            <Image src="/assets/logo.svg" alt="Logo" width={150} height={40} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${
                isActive(item.path)
                  ? 'bg-[#2F3545] text-[#C1A17C] shadow-none'
                  : 'text-[#2F3545] hover:bg-[#272C3A] hover:shadow-md shadow-black hover:text-white'
              } px-4 py-2 rounded-md`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-4">
          <Link
            href="/contact"
            className={`${
              isActive('/contact')
                ? 'bg-[#F8F3E0] text-[#2F3545] border-2 border-[#2F3545]'
                : 'bg-[#C1A17C] text-[#2F3545] border-2 border-gray-200'
            } px-4 py-2 rounded-md hover:bg-[#61513E] hover:text-white transition-all duration-300`}
          >
            Contact Us
          </Link>
          {session && (
            <button
              onClick={handleLogout}
              className="bg-[#C1A17C] text-[#2F3545] border-2 border-gray-200 px-4 py-2 rounded-md hover:bg-[#61513E] hover:text-white transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-[#1e1e1e]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#C1A17C]/30 px-4 py-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeMobileMenu}
              className={`${
                isActive(item.path)
                  ? 'bg-[#2F3545] text-[#C1A17C]'
                  : 'text-[#2F3545] hover:bg-[#2F3545] hover:text-[#C1A17C]'
              } block px-4 py-2 rounded-md`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className={`block ${
              isActive('/contact')
                ? 'bg-[#F8F3E0] text-[#2F3545] border-2 border-[#2F3545]'
                : 'bg-[#C1A17C] text-[#2F3545] border-2 border-gray-200'
            } px-4 py-2 rounded-md hover:bg-[#61513E] hover:text-white transition-all duration-300`}
          >
            Contact Us
          </Link>
          {session && (
            <button
              onClick={handleLogout}
              className="bg-[#C1A17C] text-[#2F3545] border-2 border-gray-200 px-4 py-2 rounded-md hover:bg-[#61513E] hover:text-white transition-all duration-300 mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;