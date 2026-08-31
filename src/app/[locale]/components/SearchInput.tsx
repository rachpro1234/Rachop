"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { User } from "@phosphor-icons/react/dist/ssr";
import { Handbag } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useClickAway } from "react-use";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";

// import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Moon } from "@phosphor-icons/react/dist/ssr";
import { Sun } from "@phosphor-icons/react/dist/ssr";
import Navbar from "./Navbar";

interface cartItems {
  id: number;
  slug: string;
  title_key: string;
  desc_key: string;
  category: string;
  img: string;
  price: number;
  prev_price: number | null;
  quantity: number;
}

const SearchInput = () => {
  const t = useTranslations("Index");

  const [cartItems, setCartItems] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const cartArray: cartItems[] = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    setCartItems(cartArray.length);
  }, [cartArray]);

  const navRef = useRef(null);

  // closing the sidebar when clicking outside of it
  useClickAway(navRef, () => setIsOpen(false));

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const [authenticatedUser, setAuthenticatedUser] = useState<null | undefined>();
  const router = useRouter();

  function updateUserProfile(user: any) {
    let userEmail = user.email;

    const e = document.querySelector<HTMLElement>("#profile");
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
        setAuthenticatedUser(null);
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


  const [mode, setMode] = useState<String | null>(null) 


  useEffect(() => {
    setMode(localStorage.getItem("theme"))
  })


  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  

  return (
    <div className="container flex items-center justify-between py-3 flex-col sm:flex-row gap-4">
      <div className="flex items-center justify-center gap-4 text-4xl font-bold uppercase dark:text-white text-blakish">
        <Link href="/">
          <span className="hover:text-accent">R</span>
          <span className=" hover:text-accent">a</span>
          <span className=" hover:text-accent">c</span>
          <span className=" hover:text-accent">h</span>
          <span className=" hover:text-accent">o</span>
          <span className=" hover:text-accent">p</span>
        </Link>
      </div>

      <Navbar />

      <div className="sm:flex items-center gap-4 text-2xl hidden relative">
        {authenticatedUser === null ? (
          <div ref={navRef}>
            <User
              size={32}
              onClick={toggleDropdown}
              className="cursor-pointer dark:text-white hover:text-accent"
            />
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 dark:bg-[#131927] dark:text-white">
                <ul
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <li role="menuitem">
                    <Link
                      href={`signin`}
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blakish cursor-pointer capitalize dark:bg-[#131927] dark:text-white"
                      onClick={closeDropdown}
                    >
                      {t("sign_in")}
                    </Link>
                  </li>
                  <li role="menuitem">
                    <Link
                      href={`signup`}
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blakish cursor-pointer capitalize dark:bg-[#131927] dark:text-white"
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
            id="profile"
            onClick={userSignout}
            className="text-4xl capitalize text-accent font-bold"
          >
            {/* sign-out */}
          </Link>
        )}
        <button type="button" onClick={toggleTheme} className="dark:text-white">
          {mode === "dark" ? (
            <Sun size={32} className="hover:text-accent" />
          ) : (
            <Moon size={32} className="hover:text-accent" />
          )}
        </button>
        <Link href={`/order`} className="cursor-pointer">
          {cartItems !== 0 ? (
            <p className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[20px] text-[12px] text-white flex items-center justify-center -translate-x-15.5 -translate-y-1">
              {cartItems}
            </p>
          ) : (
            ""
          )}

          <Handbag size={32} className="dark:text-white hover:text-accent" />
        </Link>

        {/* <div ref={navRef}>
          <User size={32} onClick={toggleDropdown} className="cursor-pointer" />
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
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
        </div> */}
      </div>
    </div>
  );
};

export default SearchInput;