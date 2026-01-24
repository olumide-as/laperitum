import type { Metadata } from "next";
import Contact from "./contact"; // Ensure you have a Contact component in the same folder

export const metadata: Metadata = {
  title: "Contact Us | La Peritum Law Practice",
  description:
    "Need expert legal guidance? Contact La Peritum Law Practice for a consultation. We support your legal and business needs with professionalism.",
  alternates: {
    canonical: "https://www.laperitum.com/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}