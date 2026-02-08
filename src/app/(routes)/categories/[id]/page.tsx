import CategoriesDetailsCard from "@/app/_components/categoriesDetailsCard/categoriesDetailsCard";
import { getCategoriesDetails } from "@/app/services/category/getCategoriesDetails.api";
import React from "react";

export default async function CategoriesDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  async function handleCategoriesDetails() {
    const data = await getCategoriesDetails(id);
    console.log(data);
  }

  return (
    <>
      <CategoriesDetailsCard id={id} />
    </>
  );
}
