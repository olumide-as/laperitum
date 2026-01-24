import type { Metadata } from "next";
import Services from "./services"; // Make sure this component exists

export const metadata: Metadata = {
  title: "Services | La Peritum Law Practice",
  description:
    "Explore the comprehensive legal and corporate advisory services offered by La Peritum Law Practice, tailored to meet diverse industry needs.",
  alternates: {
    canonical: "https://www.laperitum.com/services",
  },
};

export default function ServicesPage() {
  return <Services />;
}