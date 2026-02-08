import Image from "next/image";
import errorImg from "../../public/Images/error.svg";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="h-screen container flex flex-col gap-y-9 items-center justify-center">
      <Image src={errorImg} alt="" />
      <h2 className="cursor-pointer hover:bg-green-800 transition-all duration-300 py-3 px-7 rounded-2xl bg-green-600 text-white">
        <Link href={"/"}>Home Page</Link>
      </h2>
    </div>
  );
}
