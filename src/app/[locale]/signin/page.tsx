"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useId, use } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../firebase/firebase";

import { useRouter } from "next/navigation";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { EyeSlash } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import cs from "../auth.module.css";
// import { toast } from 'react-toastify';


function SignIn() {
  const t = useTranslations("SignIn");

  const [signInFormData, setsignInFormData] = useState({
    username: "",
    password: "",
  });

  const [user, setUser] = useState(null);

  const [usernameError, setUsernameError] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);

  const usernameReg = /^[a-z]+\s*[a-z]*/gi;

  // error handling translated text variables
  const usernameErrorText = t('username_error_text');
  const passwordErrorText = t('password_error_text');
  const passwordLengthError = t('password_length_error');


   const onFocusUsernameInput = () => {
    if (usernameReg.test(signInFormData.username)) {
      setUsernameFocus(true);
    }
    else{
      setUsernameFocus(false);
      setUsernameError(usernameErrorText)
    }
  };

  const onFocusPasswordInput = () => {
    if(signInFormData.password.length >= 6) {
      setPasswordFocus(true)
    } else if (signInFormData.password === "") {
      setPasswordError(passwordErrorText)
      setPasswordFocus(false)
    }
  }


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

    if(name === "username") {
      if(value === "") {
        setUsernameError(usernameErrorText);
        setUsernameFocus(false);
      } else {
        setUsernameError("")
        setUsernameFocus(true);
      }
    }

      if(name === "password") {
      if (value === "") {
      setPasswordError(passwordErrorText)
      setPasswordFocus(false)
      } 
      else if(signInFormData.password.length < 6) {
        setPasswordError(passwordLengthError);
        setPasswordFocus(false)
      } else {
        setPasswordError("")
        setPasswordFocus(true);
      }
    }

  };

  const router = useRouter();

  // submitting the form
  // const formSignInSubmit = (e: any) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(
  //     auth,
  //     signInFormData.email,
  //     signInFormData.password
  //   )
  //     .then((userCredential) => {
  //       const user = userCredential.user; // signed in
  //       router.push("/");
  //       alert("successfully logged in");
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = "account not found";
  //       console.log(errorCode, errorMessage);
  //       alert(errorMessage);
  //     });
  // };

  // console.log(id);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { username, password } = signInFormData;

      if(!username) {
        setUsernameError(usernameErrorText);
        setUsernameFocus(false);
      } else {
        setUsernameError("");
        setUsernameFocus(true);
      }
      
      if (!password) {
        setPasswordError(passwordErrorText);
        setPasswordFocus(false);
      }  else {
        setPasswordError("");
        setPasswordFocus(true);
      }


      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, signInFormData);

      let token = response.data.token;

      localStorage.setItem("jwtToken", token);

      const storedToken = localStorage.getItem('jwtToken');
      console.log('stored token: ', storedToken);

      const profile = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
      
      console.log(profile.data);

      setsignInFormData(response.data);
      setsignInFormData({
        username: "",
        password: ""
      })
      setUser(response.data);
      setTimeout(() => {
        router.push('/');
      }, 4000);
      console.log(signInFormData);
      console.log(user);
      alert(`you've successfully login in to your Rachop Space`);
      localStorage.setItem("tokenKey", 'token');
      console.log(localStorage.getItem("tokenKey"));
    } catch (error) {
      console.log("we couldn't sign you in", error);
    }
  }


  const handleLogout = () => {
    localStorage.removeItem("tokenKey");
    router.push('/signin');
  }



  return (
    <div className="flex items-center justify-center pt-[160px] mb-10">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold capitalize text-gray-900  dark:text-white">
            {t("sign_in")}
          </h2>
        </div>

        {/* Form */}
        <form
          className={`${cs.inputContainer} space-y-4 transition-all duration-500 ease-in-out transform `}
          onSubmit={handleLogin}
        >
          {/* // USERNAME // */}
           <div className={`${cs.inputContainer} 
           ${usernameError.length > 0 ? cs.inputContainerError : usernameFocus ? cs.inputContainerSuccess : ""}`}>
            <label
              htmlFor="username"
              className="block text-sm font-medium capitalize text-gray-700  dark:text-white"
            >
              {t("username")}
            </label>
            <input
              type="username"
              // id="email"
              id={`${id}-username`}
              value={signInFormData.username}
              onChange={handleChange}
              onFocus={onFocusUsernameInput}
              name="username"
              placeholder={t("enter_your_username")}
              className="block w-full p-2 mt-1 rounded-md shadow-sm "
            />
            <div className={cs.error}>{usernameError}</div>
          </div>

          {/* password // */}
          <div className={` ${cs.inputContainer} 
          ${passwordError.length > 0 ? cs.inputContainerError : passwordFocus ? cs.inputContainerSuccess : ""} relative`}>
            <label
              htmlFor="password"
              className="block text-sm font-medium capitalize text-gray-700  dark:text-white"
            >
              {t("password")}
            </label>
            <input
              type={type}
              // id="password"
              id={`${id}-password`}
              value={signInFormData.password}
              onChange={handleChange}
              onFocus={onFocusPasswordInput}
              name="password"
              placeholder={t("enter_your_password")}
              className="block w-full p-2 mt-1 rounded-md shadow-sm"
            />
            <span
              className="absolute right-4 top-10 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {icon}
            </span>
            <div className={cs.error}>{passwordError}</div>
          </div>

          <div className={cs.loginBtnDiv}>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-accent rounded-md hover:bg-purple-500  dark:text-white"
            >
              {t("sign_in")}
            </button>
          </div>
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
