import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="flex justify-between bg-orange-600 text-white py-2">
      <div className="logo">
        <span className="font-bold text-x1 mx-9 ">
          <Link href={"/"}>iTask</Link>
        </span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="cursor-pointer hover:font-bold transition-all">
          <Link href={"/signout"}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
