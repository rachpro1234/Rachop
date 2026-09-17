"use client";

import { useTranslations } from "next-intl";
import React, { useState, useId } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { EyeSlash, Checks } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import cs from "../auth.module.css";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";


const SignUp = () => {
  const t = useTranslations("SignUp");

  const id = useId();

  const [signUpFormData, setsignUpFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const [errors, setErrors] = useState([]);

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

    // error handling translated text variables
  const usernameErrorText = t('username_error_text');
  const emailErrorText = t('email_error_text');
  const passwordErrorText = t('password_error_text');
  const invalidEmailErrorText = t('invalid_email_error_text');
  const passwordLengthError = t('password_length_error');


   const onFocusUsernameInput = () => {
    if (usernameReg.test(signUpFormData.username)) {
      setUsernameError("")
      setUsernameFocus(true);
    }
    else if (signUpFormData.username === "") {
      setUsernameError(usernameErrorText);
      setUsernameFocus(false);
    }
  };

  const onFocusEmailInput = () => {
     if (signUpFormData.email === "") {
      setEmailError(emailErrorText);
      setEmailFocus(false);
    } else if(emailRegex.test(signUpFormData.email)) {
      setEmailError("");
      setEmailFocus(true);
    }
  }

  const onFocusPasswordInput = () => {
    if(signUpFormData.password.length >= 6) {
      setPasswordError("")
      setPasswordFocus(true)
    } else if (signUpFormData.password === "") {
      setPasswordError(passwordErrorText);
      setPasswordFocus(false);
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
      if (value === "") {
        setUsernameError(usernameErrorText);
        setUsernameFocus(false);
      } else if(!usernameReg.test(value)) {
        setUsernameError("name should start with an alphabet");
        setUsernameFocus(false);
      } else {
        setUsernameError("")
        setUsernameFocus(true)
      }
    }

    if(name === "email") {
      if (value === "") {
       setEmailError(emailErrorText);
       setEmailFocus(false);
      } else if(!emailRegex.test(value)) {
        setEmailError(invalidEmailErrorText);
        setEmailFocus(false);
      } else {
        setEmailError("");
        setEmailFocus(true)
      }
    }

    if(name === "password") {
      if(value === "") {
       setPasswordError(passwordErrorText);
       setPasswordFocus(false);
      }
      else if(signUpFormData.password.length < 6) {
        setPasswordError(passwordLengthError);
        setPasswordFocus(false);
      } else {
        setPasswordError("");
        setPasswordFocus(true);
      }
    }
  };


  const router = useRouter();
  const [successRegister, setSuccessRegister] = useState(false);
  const [newUser, setNewUser] = useState("");

  // fetch user registration data
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // check inputs
      const { username, email, password } = signUpFormData;

      if(!username) {
         setUsernameError(usernameErrorText);
         setUsernameFocus(false);
      } else {
        setUsernameError("");
         setUsernameFocus(true);
      }

      if (!email) {
        setEmailError(emailErrorText);
        setEmailFocus(false);
      } else {
        setEmailError("");
        setEmailFocus(true);
      }

       if (!password) {
        setPasswordError(passwordErrorText);
        setPasswordFocus(false);
      } else {
         setPasswordError("");
        setPasswordFocus(true);
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, signUpFormData);
      setsignUpFormData(response.data);

      setSuccessRegister(true);
      setNewUser(signUpFormData.username)
      setsignUpFormData({
        username: "",
        email: "",
        password: ""
      })
      console.log(response.data);
      setTimeout(() => {
        router.push("signin");
      }, 4000)
    } catch (error) {
      console.log("can't sign up this user", error);
      alert("no account has been created");
    }
  };


  return (
    <div className="flex items-center justify-center pt-[160px] mb-10">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold capitalize text-gray-900 dark:text-white">
            {t("sign_up")}
          </h2>
        </div>

          <Modal show={successRegister} size="md" onClose={() => setSuccessRegister(false)} popup className="bg-opacity-10 border border-gray-100">
            <ModalHeader />
            <ModalBody>
              <div className="text-center">
                <Checks className="mx-auto mb-4 h-14 w-14 text-green-500" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {t("Welcome_msg")} <span className="text-accent uppercase">{newUser}</span>
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="purple" className="px-10 rounded-2xl" onClick={() => setSuccessRegister(false)}>
                    {t("close")}
                  </Button>
                </div>
              </div>
          </ModalBody>
        </Modal>

        {/* Form */}
        <form
          className={`${cs.inputContainer} space-y-4 transition-all duration-500 ease-in-out transform`}
          onSubmit={handleSubmit}
        >
          <div className={`${cs.inputContainer} 
           ${usernameError.length > 0 ? cs.inputContainerError : usernameFocus ? cs.inputContainerSuccess : ""}`}>
            <label
              htmlFor="username"
              className="block text-sm capitalize font-medium text-gray-700 dark:text-white"
            >
              {t("username")}
            </label>
            <input
              type="username"
              id={`${id}-username`}
              value={signUpFormData.username}
              onChange={handleChange}
              onFocus={onFocusUsernameInput}
              name="username"
              placeholder={t("enter_your_username")}
              className="block w-full p-2 mt-1 border rounded-md focus:!border-accent shadow-sm"
            />
            <span className={cs.error}>{usernameError}</span>
          </div>

          <div  className={`${cs.inputContainer} 
           ${emailError.length > 0 ? cs.inputContainerError : emailFocus ? cs.inputContainerSuccess : ""}`}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              {t("email")}
            </label>
            <input
              type="email"
              id={`${id}-email`}
              value={signUpFormData.email}
              onChange={handleChange}
              onFocus={onFocusEmailInput}
              name="email"
              placeholder={t("enter_your_email")}
              className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:!border-accent"
            />
            <span className={cs.error}>{emailError}</span>
          </div>

          <div className={`${cs.inputContainer} 
           ${passwordError.length > 0 ? cs.inputContainerError : passwordFocus ? cs.inputContainerSuccess : ""} relative`}>
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
              onFocus={onFocusPasswordInput}
              name="password"
              placeholder={t("enter_your_password")}
              className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:!border-accent"
            />
            <span
              className="absolute right-4 top-9 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {icon}
            </span>
            <span className={cs.error}>{passwordError}</span>
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
