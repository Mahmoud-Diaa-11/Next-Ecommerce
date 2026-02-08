import HomeSlider from "./_components/homeSlider/HomeSlider";
import CategorySlider from "./_components/categorySlider/CategorySlider";
import MainProducts from "./_components/mainProducts/MainProducts";

export default function Home() {
  return (
    <>
      <div className="p-8 container space-y-5">
        <HomeSlider />
        <CategorySlider />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <MainProducts />
        </div>
      </div>
    </>
  );
}
