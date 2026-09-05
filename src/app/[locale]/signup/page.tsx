"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect, useId } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { EyeSlash } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { toast } from 'react-toastify';

const SignUp = () => {
  const t = useTranslations("SignUp");

  const id = useId();

  const [signUpFormData, setsignUpFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeSlash size={20} />);
  const [isVisible, setIsVisible] = useState(false);

    // inputs error handling
  const [usernameError, setUsernameError] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;
  const usernameReg = /^[a-z]+\s*[a-z]*/gi;

   const onFocusUsernameInput = () => {
    if (usernameReg.test(signUpFormData.username)) {
      setUsernameFocus(true);
    }
    else{
      setUsernameFocus(false);
    }
  };

  const onFocusEmailInput = () => {
    if(emailRegex.test(signUpFormData.email)) {
      setEmailFocus(true);
    }
  }

  const onFocusPasswordInput = () => {
    if(signUpFormData.password.length >= 6) {
      setPasswordFocus(true)
    }
  }


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

  // handle input value change
  const handleChange = (event: { target: { name: string; value: any } }) => {
    const { name, value } = event.target;
    setsignUpFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });

    if(name === "username") {
      setUsernameError("");
      if(!usernameReg.test(value)) {
        setUsernameError("name should start with an alphabet")
      } else {
        setUsernameFocus(true)
      }
    }

    if(name === "email") {
      setEmailError("");
      if(!emailRegex.test(signUpFormData.email)) {
        setEmailError("Invalid Email")
      } else {
        setEmailFocus(true)
      }
    }

    if(name === "password") {
      setPasswordError("");
      if(signUpFormData.password.length < 6) {
        setPasswordError("password should be at least 6 charachters");
      } else {
        setPasswordFocus(true);
      }
    }
  };


  const router = useRouter();

  // const formSignUpSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   console.log(signUpFormData);
  //   createUserWithEmailAndPassword(
  //     auth,
  //     signUpFormData.email,
  //     signUpFormData.password
  //   )
  //     .then((userCredential: { user: any }) => {
  //       const user = userCredential.user;
  //       // console.log(user);

  //       router.push("signin");
  //       alert("successfully created account");
  //     })
  //     .catch((error: { code: any; message: any }) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // console.log(errorCode, errorMessage)
  //       alert(errorMessage);
  //     });
  // };


  // fetch user registration data
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // check inputs
      const { username, email, password } = signUpFormData;

      if(!username || !email || !password) {
        toast.error("please fill all fields", {
          position: "bottom-left",
          theme: "colored"
        });
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, signUpFormData);
      setsignUpFormData(response.data);
      setsignUpFormData({
        username: "",
        email: "",
        password: ""
      })
      console.log(response.data);
      router.push("signin");
      alert(`successfully created account, welcome ${signUpFormData.username} by Rachop`);
    } catch (error) {
      console.log("can't sign up this user", error);
      alert("no account has been created");
    }
  };


  return (
    <div className="flex items-center justify-center pt-[160px] mb-10">
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
          // onSubmit={formSignUpSubmit}
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm capitalize font-medium text-gray-700 dark:text-white"
            >
              {t("username")}
            </label>
            <input
              type="username"
              id={`${id}-username`}
              required
              value={signUpFormData.username}
              onChange={handleChange}
              name="username"
              placeholder={t("enter_your_username")}
              className="block w-full p-2 mt-1 border rounded-md focus:!border-accent shadow-sm"
            />
            <span className="hidden text-red-600">{usernameError}</span>
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
                id={`${id}-email`}
              required
              value={signUpFormData.email}
              onChange={handleChange}
              name="email"
              placeholder={t("enter_your_email")}
              className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="hidden text-red-600">{emailError}</span>
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
                id={`${id}-password`}
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
            <span className="hidden text-red-600">{passwordError}</span>
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
