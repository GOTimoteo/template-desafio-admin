import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Nav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Users", href: "/users" },
    { label: "Audits", href: "/audits" },
    { label: "Login", href: "/login" },
  ];

  return (
    <>
      <nav className="bg-[#00a868] px-4 py-2">
        <div className="flex items-center justify-between sm:mx-[10vw]">
          <div className="flex items-center">
            <button
              className="text-white sm:hidden mr-2"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <RxHamburgerMenu />
            </button>
            <h1 className="text-white font-bold text-lg">Rock & Stone</h1>
          </div>

          <div
            className={`sm:hidden ${
              isMenuOpen ? "fixed" : "hidden"
            } top-0 right-0 left-0 bottom-0 bg-gray-800 z-10`}
          >
            <ul className="flex flex-col items-center pt-12">
              {navLinks.map((link) => (
                <li key={link.href} className="my-4">
                  <Link
                    className="text-white hover:text-gray-300"
                    to={link.href}
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="absolute top-4 right-4 text-white"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <IoClose />
            </button>
          </div>
          <ul className="hidden sm:flex gap-8 sm:mt-2">
            {navLinks.map((link) => (
              <li key={link.href} className="mr-4">
                <Link className="text-white hover:text-gray-300" to={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
