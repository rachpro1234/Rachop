"use client";

import { useTranslations } from "next-intl";
import React, { useState, useId } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { EyeSlash } from "@phosphor-icons/react/dist/ssr";

const SignUp = () => {
  const t = useTranslations("SignUp");

  const id = useId();

  const [signUpFormData, setsignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeSlash size={20} />);
  const [isVisible, setIsVisible] = useState(false);

  // toggle the password visibility when clicking on the eye icon
  const togglePasswordVisibility = () => {
    if (!isVisible) {
      setIsVisible(true);
      setType("text");
      setIcon(<Eye size={20} />);
    } else {
      setIsVisible(false);
      setType("password");
      setIcon(<EyeSlash size={20} />);
    }
  };

  const handleChange = (event: { target: { name: string; value: any } }) => {
    const { name, value } = event.target;
    setsignUpFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  // const id = useId();

  const router = useRouter();

  const formSignUpSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(signUpFormData);
    createUserWithEmailAndPassword(
      auth,
      signUpFormData.email,
      signUpFormData.password
    )
      .then((userCredential: { user: any }) => {
        const user = userCredential.user;
        // console.log(user);

        router.push("signin");
        alert("successfully created account");
      })
      .catch((error: { code: any; message: any }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage)
        alert(errorMessage);
      });
  };

  return (
    <div className="flex items-center justify-center pt-7 mb-10">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("sign_up")}
          </h2>
        </div>

        {/* Form */}
        <form
          className={
            "space-y-4 transition-all duration-500 ease-in-out transform "
          }
          onSubmit={formSignUpSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              {t("name")}
            </label>
            <input
              type="name"
              // id="name"
              id={`${id} + -name`}
              required
              value={signUpFormData.name}
              onChange={handleChange}
              name="name"
              placeholder={t("enter_your_name")}
              className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              {t("email")}
            </label>
            <input
              type="email"
              // id="email"
              id={`${id} + -email`}
              required
              value={signUpFormData.email}
              onChange={handleChange}
              name="email"
              placeholder={t("enter_your_email")}
              className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              {t("password")}
            </label>
            <input
              type={type}
              // id="password"
              id={`${id} + -password`}
              value={signUpFormData.password}
              onChange={handleChange}
              name="password"
              required
              placeholder={t("enter_your_password")}
              className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span
              className="absolute right-4 top-9 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {icon}
            </span>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-accent rounded-md hover:bg-purple-500 dark:text-white"
          >
            {t("sign_up")}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          <p>
            {t("already_have_account")}?{" "}
            <Link
              href={"signin"}
              type="button"
              className="font-medium text-accent hover:text-purple-500 focus:outline-none"
            >
              {t("sign_in")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
