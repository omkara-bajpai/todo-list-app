"use client";
import React from "react";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  signOut(auth).then(() => {
    router.push("/login");
  });
  return <div></div>;
};

export default page;
