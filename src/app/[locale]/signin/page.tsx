"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useId } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

import { useRouter } from "next/navigation";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { EyeSlash } from "@phosphor-icons/react/dist/ssr";

function SignIn() {
  const t = useTranslations("SignIn");

  const [signInFormData, setsignInFormData] = useState({
    email: "",
    password: "",
  });

  const id = useId();

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
    setsignInFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const router = useRouter();

  // submitting the form
  const formSignInSubmit = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      signInFormData.email,
      signInFormData.password
    )
      .then((userCredential) => {
        const user = userCredential.user; // signed in
        router.push("/");
        alert("successfully logged in");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = "account not found";
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  console.log(id);

  return (
    <div className="flex items-center justify-center pt-7 mb-10">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900  dark:text-white">
            {t("sign_in")}
          </h2>
        </div>

        {/* Form */}
        <form
          className={
            "space-y-4 transition-all duration-500 ease-in-out transform "
          }
          onSubmit={formSignInSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700  dark:text-white"
            >
              {t("email")}
            </label>
            <input
              type="email"
              // id="email"
              id={`${id} + -email`}
              required
              value={signInFormData.email}
              onChange={handleChange}
              name="email"
              placeholder={t("enter_your_email")}
              className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700  dark:text-white"
            >
              {t("password")}
            </label>
            <input
              type={type}
              // id="password"
              id={`${id} + -password`}
              required
              value={signInFormData.password}
              onChange={handleChange}
              name="password"
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
            className="w-full px-4 py-2 font-bold text-white bg-accent rounded-md hover:bg-purple-500  dark:text-white"
          >
            {t("sign_in")}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          <p>
            {t("don't_have_an_account")}?{" "}
            <Link
              href={"signup"}
              type="button"
              className="font-medium text-accent hover:text-purple-500 focus:outline-none"
            >
              {t("sign_up")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
