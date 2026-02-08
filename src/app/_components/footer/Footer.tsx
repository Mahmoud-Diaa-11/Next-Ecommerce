import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-5 dark:bg-zinc-900 dark:shadow-zinc-800 shadow-xl border-t mt-12">
      <div className="container px-4 ">
        <div className="flex  flex-col  text-center items-center md:items-start md:text-left md:flex-row md:justify-around gap-10">
          {/* Column 1: Branding and Socials */}
          <div className="flex flex-col gap-4 max-w-xs">
            <h2 className="text-3xl font-bold">
              <span className="text-green-600">Fresh</span>Cart
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              FreshCart is your one-stop destination for fresh groceries,
              organic produce, and household essentials delivered right to your
              doorstep.
            </p>
            <ul className="flex justify-center md:justify-start  gap-5 items-center mt-2">
              <li className="cursor-pointer transition-colors duration-300 hover:text-green-600">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook-f text-xl"></i>
                </Link>
              </li>
              <li className="cursor-pointer transition-colors duration-300 hover:text-green-600">
                <Link
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-x-twitter text-xl"></i>
                </Link>
              </li>
              <li className="cursor-pointer transition-colors duration-300 hover:text-green-600">
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram text-xl"></i>
                </Link>
              </li>
              <li className="cursor-pointer transition-colors duration-300 hover:text-green-600">
                <Link
                  href="https://www.pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-pinterest text-xl"></i>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Placeholder */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="text-gray-600 dark:text-gray-400 flex flex-col gap-2">
              <li className="hover:text-green-600  transition  cursor-pointer">
                Home
              </li>
              <li className="hover:text-green-600  transition  cursor-pointer">
                Products
              </li>
              <li className="hover:text-green-600   transition cursor-pointer">
                Cart
              </li>
            </ul>
          </div>

          {/* Column 3: Placeholder */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Support</h3>
            <ul className="text-gray-600 dark:text-gray-400 flex flex-col gap-2">
              <li className="hover:text-green-600  transition  cursor-pointer">
                Contact Us
              </li>
              <li className="hover:text-green-600  transition  cursor-pointer">
                Shipping
              </li>
              <li className="hover:text-green-600  transition  cursor-pointer">
                FAQ
              </li>
            </ul>
          </div>

          {/* Column 4: Placeholder */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get the latest updates on our store.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-zinc-800 mt-10 pt-8 text-center text-gray-500 dark:text-gray-400 ">
          <p className="text-sm">
            &copy; 2025{" "}
            <span className="text-green-600 font-semibold">Fresh</span>Cart.All
            rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
