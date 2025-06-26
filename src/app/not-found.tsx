// src/app/not-found.tsx
"use client";

import React from "react";
import Link from "next/link";



const NotFound = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/assets/notfoundbg.jpg')",
      }}
    >
      {/* Fading overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <main className="flex items-center justify-center h-full">
        <div className="max-w-2xl mx-auto space-y-6 text-center text-white relative z-10">
          <h3 className="text-6xl md:text-6xl">Oops! Page Not Found</h3>
          <p>
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#C1A17C] text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-[#b89e5c] transition duration-150"
          >
            Go Back
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;