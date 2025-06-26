import type { Metadata } from "next";
import Publications from "./publications"; // Make sure you have this component

export const metadata: Metadata = {
  title: "Publications | La Peritum Law Practice",
  description:
    "Stay informed with expert legal insights and updates from La Peritum Law Practice. Explore our publications on corporate governance, fintech, intellectual property, and more.",
  alternates: {
    canonical: "https://laperitum.com/publications",
  },
};

export default function PublicationsPage() {
  return <Publications />;
}