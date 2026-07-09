"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Create",
      href: "/create",
    },
    {
      name: "Manage",
      href: "/manage",
    },
  ];

  return (
    <header className="fixed top-2 left-0 right-0 z-50 flex justify-center px-4 ">
      <nav className="w-full max-w-5xl rounded-full border border-neutral-700  bg-black/90 backdrop-blur-xl shadow-md">
        <div className="flex items-center justify-between px-7 py-4">
          <Link href="/">
            <h1 className="text-xl font-bold tracking-wide text-white">
              BlogIt
            </h1>
          </Link>

          <ul className="hidden items-center gap-8 text-sm text-gray-300 lg:flex">
            {links.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/create"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:scale-105 lg:block"
          >
            Start Writing
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="text-white lg:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="border-t border-neutral-800 lg:hidden">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-7 py-4 text-gray-300 hover:bg-neutral-900 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;