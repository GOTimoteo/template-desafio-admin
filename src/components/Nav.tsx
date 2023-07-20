import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useAuth } from "contexts/auth";

const Nav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { analyst } = useAuth();
  const { logout } = useAuth();
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Users", href: "/users" },
    { label: "Audits", href: "/audits" },
    { label: "Login", href: "/login" },
  ];

  const handleLogout = () => {
    toggleMenu();
    logout();
  };

  return (
    <>
      <nav className="bg-stone-green-500 px-[2vw] md:px-[6vw] xl:px-[10vw] py-2">
        <div className="flex items-center justify-between">
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
            } top-0 right-0 left-0 bottom-0 bg-stone-green-500 z-10`}
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
              {Object.keys(analyst).length !== 0 && (
                <li className="my-4">
                  <button
                    className="text-white hover:text-gray-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
            <button
              className="absolute top-4 right-4 text-white"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <IoClose />
            </button>
          </div>
          <ul className="hidden sm:flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href} className="mr-4">
                <Link
                  className="text-white hover:text-gray-300"
                  to={link.href}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {Object.keys(analyst).length !== 0 && (
              <li>
                <button
                  className="text-white hover:text-gray-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
