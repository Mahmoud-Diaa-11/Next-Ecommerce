import { CategoryType } from "@/types/types";
import CategorySwiper from "../categorySwiper/categorySwiper";
import { getCategories } from "@/app/services/category/getCategories.api";

export default async function CategorySlider() {
  const allCategory: CategoryType[] = await getCategories();

  return (
    <>
      <h3 className="text-3xl font-semibold">All Categories</h3>
      <CategorySwiper allCategory={allCategory} />
    </>
  );
}
