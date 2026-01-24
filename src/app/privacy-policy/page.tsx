import type { Metadata } from "next";
import Privacy from "./privacy"; // Ensure this component exists in the folder

export const metadata: Metadata = {
  title: "Privacy Policy | La Peritum Law Practice",
  description:
    "Learn how La Peritum Law Practice collects, uses, and safeguards your personal data in line with Nigerian privacy regulations and global best practices.",
  alternates: {
    canonical: "https://www.laperitum.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <Privacy />;
}