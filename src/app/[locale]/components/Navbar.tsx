"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { X } from "@phosphor-icons/react/dist/ssr";
import { Handbag } from "@phosphor-icons/react/dist/ssr";
import { SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { List } from "@phosphor-icons/react/dist/ssr";
import { User } from "@phosphor-icons/react/dist/ssr";
import { House } from "@phosphor-icons/react/dist/ssr";
import { useClickAway } from "react-use";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import { Moon } from "@phosphor-icons/react/dist/ssr";
import { Sun } from "@phosphor-icons/react/dist/ssr";

interface cartItems {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  prevPrice: number;
  quantity: number;
}

function Navbar() {
  const t = useTranslations("Navbar");

  // const navRef = useRef(null);
  const navRef = useRef(null);

  const [navOpen, setNavOpen] = useState(false);

  // toggle the sidebar visibility
  const toggleSideBar = () => {
    setNavOpen((prevState) => !prevState);
  };

  // closing the sidebar when clicking outside of it
  useClickAway(navRef, () => setNavOpen(false));

  const [cartItems, setCartItems] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const cartArray: cartItems[] = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    setCartItems(cartArray.length);
  }, [cartArray]);

  const pathname = usePathname();
  // console.log(pathname)

  const navLinks = [
    { id: 0, name: `${t("Home")}`, href: "/" },
    { id: 1, name: `${t("About_us")}`, href: "/about" },
    { id: 2, name: `${t("Men")}`, href: "/men" },
    { id: 3, name: `${t("Women")}`, href: "/women" },
    { id: 4, name: `${t("Jewellery")}`, href: "/jewellery" },
    { id: 5, name: `${t("Perfume")}`, href: "/perfume" },
    { id: 6, name: `${t("Order")}`, href: "/order" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const [isClick, setISClick] = useState(false);

  function handleLanguageClick() {
    setISClick(!isClick);
  }

  const [authenticatedUser, setAuthenticatedUser] = useState("");
  const router = useRouter();

  function updateUserProfile(user: any) {
    const username = user.displayName;
    let userEmail = user.email;

    const e = document.querySelector<HTMLElement>("#hello");
    if (e) {
      e.textContent = userEmail.slice(0, 4);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setAuthenticatedUser(user);
        updateUserProfile(user);
      } else {
        // signed out
        setAuthenticatedUser("");
      }
    });
  }, []);

  const userSignout = () => {
    signOut(auth)
      .then(() => {
        router.push("/signup");
        alert("user signed out");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const mode = localStorage.getItem("theme");

  return (
    <div>
      <div>
        <ul
          ref={navRef}
          className={`nav-links ${
            navOpen ? "active" : "inactive"
          }  relative  sm:flex items-center justify-center gap-7 text-lg capitalize font-medium hidden dark:bg-[#131927] dark:text-white`}
        >
          {navLinks.map((link) => {
            return (
              <li key={link.id}>
                <Link
                  className={`${
                    pathname === link.href ? "active" : ""
                  } nav-link dark:text-white`}
                  href={link.href}
                  key={link.name}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="dark:text-white sm:hidden flex"
            >
              {mode === "dark" ? <Sun size={32} /> : <Moon size={32} />}
            </button>
          </li>
        </ul>
      </div>

      {/* small screen navbar on the page bottom when resizing the screen */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white left-[50%] -translate-x-[50%] max-w-[500px] px-8 z-50 rounded-lg dark:bg-[#131927] dark:text-white">
        <div className="flex justify-between items-center text-[28px] py-2 cursor-pointer">
          <div className="bars" onClick={toggleSideBar}>
            {navOpen ? (
              <X
                size={32}
                onClick={() => setNavOpen(false)}
                className="hover:text-accent"
              />
            ) : (
              <List size={32} className="hover:text-accent" />
            )}
          </div>
          <div className="relative">
            <Link
              href={`order`}
              className={pathname === "/order" ? "text-accent" : ""}
            >
              {cartItems !== 0 ? (
                <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                  {cartItems}
                </div>
              ) : (
                ""
              )}

              {pathname === "/order" ? (
                <Handbag size={32} weight="fill" />
              ) : (
                <Handbag size={32} className="hover:text-accent" />
              )}
            </Link>
          </div>
          <Link href={`/`} className={pathname === "/" ? "text-accent" : ""}>
            {pathname === "/" ? (
              <House size={32} weight="fill" />
            ) : (
              <House size={32} className="hover:text-accent" />
            )}
          </Link>
          {authenticatedUser === "" ? (
            <div ref={navRef}>
              <User
                size={32}
                onClick={toggleDropdown}
                className="hover:text-accent"
              />
              {isOpen && (
                <div className="origin-top-right absolute bottom-9 right-11 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <ul
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <li>
                      <Link
                        href={`signin`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer capitalize"
                        onClick={closeDropdown}
                      >
                        {t("sign_in")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`signup`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer capitalize"
                        onClick={closeDropdown}
                      >
                        {t("sign_up")}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/"
              id="hello"
              onClick={userSignout}
              className="text-normal capitalize text-accent font-bold"
            >
              {/* sign-out */}
            </Link>
          )}

          <div className="relative">
            <SquaresFour
              size={32}
              onClick={handleLanguageClick}
              className="hover:text-accent"
            />
            {isClick && (
              <span className="absolute bottom-7 right-1 text-base">
                <LanguageSwitcher />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
