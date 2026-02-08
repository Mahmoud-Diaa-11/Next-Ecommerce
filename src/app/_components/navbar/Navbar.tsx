"use client";

import Image from "next/image";
import imageNav from "../../../../public/Images/freshcart-logo.svg";
import Link from "next/link";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { signOut, useSession } from "next-auth/react";
import {
  ShoppingCart,
  Menu,
  X,
  Moon,
  Sun,
  MoonIcon,
  SunIcon,
  Heart,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const { theme, setTheme } = useTheme();
  const cartContext = useContext(CartContext);
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  async function handleSignOut() {
    await signOut({ callbackUrl: "/login" });
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <nav className="bg-slate-300 p-5 dark:bg-zinc-900 dark:shadow-zinc-800 shadow-xl dark:text-white">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image width={160} height={60} src={imageNav} alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <li
            className={
              pathName == "/"
                ? "bg-green-600 text-white rounded-2xl px-5 py-1.5 "
                : ""
            }
          >
            <Link
              className={`mx-3 transition-all duration-300 ${
                pathName == "/" ? "hover:text-white" : "hover:text-green-600"
              }`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li
            className={
              pathName == "/products"
                ? "bg-green-600 rounded-2xl px-5 py-1.5 text-white"
                : ""
            }
          >
            <Link
              className={`transition-all duration-300 ${
                pathName == "/products"
                  ? "hover:text-white"
                  : "hover:text-green-600"
              }`}
              href="/products"
            >
              Products
            </Link>
          </li>
          <li
            className={
              pathName == "/categories"
                ? "bg-green-600 rounded-2xl px-5 py-1.5 text-white"
                : ""
            }
          >
            <Link
              className={`transition-all duration-300 ${
                pathName == "/categories"
                  ? "hover:text-white"
                  : "hover:text-green-600"
              }`}
              href="/categories"
            >
              Categories
            </Link>
          </li>
          <li
            className={
              pathName == "/brands"
                ? "bg-green-600 rounded-2xl px-5 py-1.5 text-white"
                : ""
            }
          >
            <Link
              className={`transition-all duration-300 ${
                pathName == "/brands"
                  ? "hover:text-white"
                  : "hover:text-green-600"
              }`}
              href="/brands"
            >
              Brands
            </Link>
          </li>
          {data && (
            <li
              className={
                pathName == "/allorders"
                  ? "bg-green-600 rounded-2xl px-5 py-1.5 text-white"
                  : ""
              }
            >
              <Link
                className={`transition-all duration-300 ${
                  pathName == "/allorders"
                    ? "hover:text-white"
                    : "hover:text-green-600"
                }`}
                href="/allorders"
              >
                All orders
              </Link>
            </li>
          )}
          <li className="mx-2">
            {theme == "light" ? (
              <MoonIcon
                onClick={() => {
                  setTheme("dark");
                }}
                className="cursor-pointer"
              />
            ) : (
              <SunIcon
                onClick={() => {
                  setTheme("light");
                }}
                className="cursor-pointer"
              />
            )}
          </li>
        </ul>

        {/* Desktop Right */}
        <ul className="hidden md:flex items-center gap-4">
          {data ? (
            <>
              <li>
                <Link className="relative" href="/wishlist">
                  <Heart className="transition-all duration-300 hover:text-green-600" />
                </Link>
              </li>
              <li>
                <Link className="relative" href="/cart">
                  <ShoppingCart className="text-green-600 fill-green-600" />
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartContext?.numOfCartItem}
                  </span>
                </Link>
              </li>

              <li>
                <button
                  onClick={handleSignOut}
                  className="hover:text-red-600 transition-all duration-300 cursor-pointer"
                >
                  Sign Out
                </button>
              </li>
              <li>
                <span>
                  Hello,{" "}
                  <span className="text-green-600 capitalize font-semibold">
                    {data.user?.name}
                  </span>
                </span>
              </li>
            </>
          ) : (
            <>
              <Link
                className="transition-all duration-300 hover:text-green-600"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="transition-all duration-300 hover:text-green-600"
                href="/register"
              >
                Register
              </Link>
            </>
          )}
        </ul>

        {/* Mobile Icon */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 dark:bg-black/50 bg-slate-200 p-4 rounded-lg">
          <ul className="flex flex-col gap-3">
            <Link
              className={`transition-all duration-300 ${
                pathName == "/" ? "hover:text-white" : "hover:text-green-600"
              }`}
              href="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              className={`transition-all duration-300 ${
                pathName == "/products"
                  ? "hover:text-white"
                  : "hover:text-green-600"
              }`}
              href="/products"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              className={`transition-all duration-300 ${
                pathName == "/categories"
                  ? "hover:text-white"
                  : "hover:text-green-600"
              }`}
              href="/categories"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              className={`transition-all duration-300 ${
                pathName == "/brands"
                  ? "hover:text-white"
                  : "hover:text-green-600"
              }`}
              href="/brands"
              onClick={() => setIsOpen(false)}
            >
              Brands
            </Link>

            {data ? (
              <>
                <Link
                  className="transition-all duration-300 hover:text-green-600"
                  href="/cart"
                >
                  Cart ({cartContext?.numOfCartItem})
                </Link>
                <button
                  onClick={handleSignOut}
                  className=" w-full hover:bg-red-500 text-black  hover:text-white  p-1 rounded-2xl transition-all duration-300 dark:text-white border-red-500 border cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  className="transition-all duration-300 hover:text-green-600"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="transition-all duration-300 hover:text-green-600"
                  href="/register"
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
