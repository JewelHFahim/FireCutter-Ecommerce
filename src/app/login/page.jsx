"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";

const MODE = Object.freeze({
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  RESET_PASSWORD: "RESET_PASSWORD",
  EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
});

const LoginPage = () => {
  const wixClient = useWixClient();

  const isLoggedin = wixClient.auth.loggedIn();
  console.log(isLoggedin);

  const [mode, setMode] = useState(MODE.LOGIN);

  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;

        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: userName },
          });
          break;

        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail({
            email,
            pathname,
          });
          setMessage("password reset email sent. Please, check your email");
          break;

        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;

        default:
          break;
      }

      switch (response.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );
          console.log(tokens?.refreshToken);

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });

          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;

        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password");
          } else {
            setError("Smothing went wrong!");
          }

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>

        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              placeholder="jhon"
              className="ring-2 ring-gray-300 p-4 rounded-md"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="jhon@gmail.com"
              className="ring-2 ring-gray-300 p-4 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification Code</label>
            <input
              type="emailCode"
              placeholder="code"
              className="ring-2 ring-gray-300 p-4 rounded-md"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}

        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 p-4 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}

        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forget Password?
          </div>
        )}

        <button
          className="bg-vsb  p-2 rounded-md text-white disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>

        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            onClick={() => setMode(MODE.REGISTER)}
            className="text-sm underline cursor-pointer"
          >
            Dont&apos;t have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            onClick={() => setMode(MODE.LOGIN)}
            className="text-sm underline cursor-pointer"
          >
            Have an account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            onClick={() => setMode(MODE.LOGIN)}
            className="text-sm underline cursor-pointer"
          >
            Go back to Login
          </div>
        )}

        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
