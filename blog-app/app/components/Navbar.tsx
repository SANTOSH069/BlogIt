"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home",     href: "/" },
    { name: "About",    href: "/pages/about" },
    { name:  "Create",  href: "/pages/create"},
    { name:  "Manage",  href: "/pages/manage"},
  ];

  return (
    <nav className="sticky top-0 z-50 bg-blue-900/95 backdrop-blur-md shadow-md font-sans">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-wide text-white">
          BlogIt
        </h1>
        <ul className="hidden items-center gap-10 text-lg font-medium text-white lg:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative transition duration-300 hover:text-yellow-300 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <div
        className={`overflow-hidden bg-blue-950 transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 text-lg text-white">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="block rounded-md py-3 transition hover:bg-blue-800 hover:pl-3"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;