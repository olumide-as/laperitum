import type { Metadata } from "next";
import About from "./about";

export const metadata: Metadata = {
  title: "About Us | La Peritum Law Practice",
  description:
    "La Peritum Law Practice is a full-service firm offering legal and corporate advisory across industries. Discover our mission, values, and expertise.",
  alternates: {
    canonical: "https://laperitum.com/about",
  },
};

export default function AboutPage() {
  return <About />;
}