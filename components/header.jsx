"use client";

import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Eye } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
// import { checkUser } from "@/lib/checkUser";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  // await checkUser();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        bg-white/95
        dark:bg-[#050B18]/95
        border-b
        border-gray-200
        dark:border-[#21406D]
        backdrop-blur-md
        shadow-sm
        transition-colors
        duration-300
      "
    >
      <nav
        className="
          flex
          h-20
          w-full
          items-center
          justify-between
          px-6
          sm:px-8
          lg:px-12
        "
      >
        {/* ================================================== */}
        {/* LEFT SIDE - FINLY LOGO WITH EYE ICON */}
        {/* ================================================== */}
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="group flex items-center gap-2.5 select-none"
          >
            {/* Glowing Eye Icon Badge */}
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-tr
                from-[#2D7DFF]
                via-[#4F46E5]
                to-[#7C3AED]
                shadow-md
                shadow-blue-500/20
                group-hover:scale-105
                transition-transform
                duration-200
              "
            >
              <Eye className="h-5 w-5 text-white" />
            </div>

            {/* Brand Title */}
            <span
              className="
                text-2xl
                sm:text-3xl
                font-black
                tracking-tight
                text-gray-900
                dark:text-white
                transition-colors
                duration-300
              "
            >
              Finly
              <span className="text-[#2D7DFF] dark:text-[#60A5FA]">.</span>
            </span>
          </Link>
        </div>

        {/* ================================================== */}
        {/* CENTER NAVIGATION - SIGNED OUT */}
        {/* ================================================== */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-10
            lg:gap-14
            absolute
            left-1/2
            -translate-x-1/2
          "
        >
          <SignedOut>
            {/* Features */}
            <button
              type="button"
              onClick={() => scrollToSection("features")}
              className="
                group
                relative
                text-base
                lg:text-lg
                font-semibold
                text-gray-700
                dark:text-gray-200
                hover:text-[#2D7DFF]
                dark:hover:text-[#60A5FA]
                transition-colors
                duration-300
                cursor-pointer
              "
            >
              Features
              <span
                className="
                  absolute
                  -bottom-1.5
                  left-0
                  h-[2.5px]
                  w-0
                  rounded-full
                  bg-[#2D7DFF]
                  dark:bg-[#60A5FA]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </button>

            {/* Testimonials */}
            <button
              type="button"
              onClick={() => scrollToSection("testimonials")}
              className="
                group
                relative
                text-base
                lg:text-lg
                font-semibold
                text-gray-700
                dark:text-gray-200
                hover:text-[#2D7DFF]
                dark:hover:text-[#60A5FA]
                transition-colors
                duration-300
                cursor-pointer
              "
            >
              Testimonials
              <span
                className="
                  absolute
                  -bottom-1.5
                  left-0
                  h-[2.5px]
                  w-0
                  rounded-full
                  bg-[#2D7DFF]
                  dark:bg-[#60A5FA]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </button>
          </SignedOut>
        </div>

        {/* ================================================== */}
        {/* RIGHT SIDE ACTIONS */}
        {/* ================================================== */}
        <div
          className="
            ml-auto
            flex
            items-center
            gap-3
            sm:gap-4
          "
        >
          {/* THEME TOGGLE */}
          <ThemeToggle />

          {/* SIGNED OUT - LOGIN */}
          <SignedOut>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="
                  h-10
                  sm:h-11
                  px-5
                  sm:px-6
                  rounded-lg
                  border-[#2D7DFF]
                  bg-transparent
                  text-sm
                  sm:text-base
                  font-semibold
                  text-gray-800
                  dark:text-white
                  hover:bg-[#2D7DFF]
                  hover:text-white
                  hover:border-[#2D7DFF]
                  transition-all
                  duration-300
                "
              >
                Login
              </Button>
            </Link>
          </SignedOut>

          {/* SIGNED IN */}
          <SignedIn>
            {/* DASHBOARD */}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="
                  h-10
                  px-3.5
                  sm:px-4
                  rounded-lg
                  gap-2
                  border-gray-200
                  dark:border-[#21406D]
                  bg-gray-50
                  dark:bg-[#0A1830]
                  text-gray-700
                  dark:text-[#D5DDF0]
                  font-medium
                  hover:bg-blue-50
                  dark:hover:bg-[#102B50]
                  hover:text-[#2D7DFF]
                  dark:hover:text-white
                  hover:border-[#2D7DFF]
                  transition-all
                  duration-300
                "
              >
                <LayoutDashboard
                  size={17}
                  className="text-[#2D7DFF]"
                />
                <span className="hidden sm:inline">
                  Dashboard
                </span>
              </Button>
            </Link>

            {/* ADD TRANSACTION */}
            <Link href="/transaction/create">
              <Button
                className="
                  h-10
                  px-3.5
                  sm:px-5
                  rounded-lg
                  gap-2
                  bg-[#2D7DFF]
                  text-white
                  text-sm
                  sm:text-base
                  font-semibold
                  border
                  border-[#2D7DFF]
                  hover:bg-[#1F6FE5]
                  hover:border-[#1F6FE5]
                  hover:shadow-lg
                  hover:shadow-blue-500/25
                  transition-all
                  duration-300
                "
              >
                <PenBox size={17} />
                <span className="hidden sm:inline">
                  Add Transaction
                </span>
              </Button>
            </Link>

            {/* USER PROFILE */}
            <div
              className="
                ml-1
                pl-2
                sm:pl-3
                border-l
                border-gray-200
                dark:border-[#21406D]
                flex
                items-center
              "
            >
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 sm:w-10 sm:h-10 border border-[#2D7DFF]",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;