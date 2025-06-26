import EditPublicationClient from "./EditPublicationClient";

export default async function EditPublicationPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <EditPublicationClient id={params.id} />;
}