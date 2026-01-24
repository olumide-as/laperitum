import type { Metadata } from "next";
import Disclaimer from "./disclaimer"; // Ensure you have a Disclaimer component in the same folder

export const metadata: Metadata = {
  title: "Disclaimer | La Peritum Law Practice",
  description:
    "Read the legal disclaimer of La Peritum Law Practice. Understand liability limitations and the informational purpose of content provided on this website.",
  alternates: {
    canonical: "https://www.laperitum.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return <Disclaimer />;
}