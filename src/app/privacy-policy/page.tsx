import type { Metadata } from "next";
import Privacy from "./privacy"; // Ensure this component exists in the folder

export const metadata: Metadata = {
  title: "Privacy Policy | La Peritum Law Practice",
  description:
    "Learn about how La Peritum Law Practice collects, uses, and protects your personal information in accordance with privacy laws.",
  alternates: {
    canonical: "https://laperitum.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <Privacy />;
}