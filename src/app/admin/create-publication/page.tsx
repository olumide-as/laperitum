'use client';
import dynamic from "next/dynamic";

const CreatePublicationClient = dynamic(() => import("./CreatePublicationClient"), {
  ssr: false,
});

export default function CreatePublicationPage() {
  return <CreatePublicationClient />;
}