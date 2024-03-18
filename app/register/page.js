"use client";
import React from "react";
import Link from "next/link";
import { auth } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/firebase/auth";
import "./register_stle.css";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
const page = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const { authUser, isLoading, setAuthUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  const submitHandler = async () => {
    if (!userName || !password) return;
    try {
      await createUserWithEmailAndPassword(auth, userName, password);
    } catch {
      alert("Some error occured.");
    }
  };
  return isLoading || (!isLoading && !!authUser) ? (
    <Loader />
  ) : (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                    <button
                      onClick={submitHandler}
                      className="mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account with us?
                    <Link
                      href="/login"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Login in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              id="style_1"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
