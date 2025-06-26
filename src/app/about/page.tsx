import type { Metadata } from "next";
import About from "./about";

export const metadata: Metadata = {
  title: "About Us | La Peritum Law Practice",
  description:
    "La Peritum Law Practice is a dynamic full-service law firm offering legal and corporate advisory services across industries. Learn about our mission, values, and proven track record of excellence.",
  alternates: {
    canonical: "https://laperitum.com/about",
  },
};

export default function AboutPage() {
  return <About />;
}