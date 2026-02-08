import BrandDetailsCard from "@/app/_components/brandDetailsCard/BrandDetailsCard";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <BrandDetailsCard id={id} />
    </>
  );
}
