"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Eye, ShieldCheck } from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToSection = (id) => {
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    }
  };

  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-white
        text-gray-900
        border-t
        border-gray-200
        dark:bg-[#050B18]
        dark:text-white
        dark:border-[#21406D]
        transition-colors
        duration-300
      "
    >
      {/* Subtle Background Glows */}
      <div
        className="
          pointer-events-none
          absolute
          -top-28
          left-1/2
          -translate-x-1/2
          w-96
          h-96
          bg-blue-500/5
          dark:bg-blue-500/10
          rounded-full
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          w-80
          h-80
          bg-indigo-500/5
          dark:bg-indigo-500/10
          rounded-full
          blur-[100px]
        "
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        {/* ===================== MAIN FOOTER CONTENT ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* ================= COLUMN 1: BRAND ================= */}
          <div
            className="
              lg:pr-8
              lg:border-r
              border-gray-200
              dark:border-[#21406D]/60
            "
          >
            {/* Finly Logo (Rounded Gradient Badge + Finly.) */}
            <Link
              href="/"
              className="group flex items-center gap-3 select-none w-fit mb-5"
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-b
                  from-[#6366F1]
                  via-[#3B82F6]
                  to-[#2563EB]
                  shadow-md
                  shadow-blue-500/25
                  group-hover:scale-105
                  transition-transform
                  duration-200
                "
              >
                <Eye className="h-6 w-6 text-white stroke-[2.5]" />
              </div>

              <span className="text-3xl font-black tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
                Finly<span className="text-[#3B82F6] dark:text-[#60A5FA]">.</span>
              </span>
            </Link>

            <p
              className="
                text-sm
                leading-relaxed
                text-gray-600
                dark:text-[#C8D4E8]
                max-w-sm
              "
            >
              Smart AI-powered finance platform that helps you track expenses,
              analyze spending patterns, and achieve your financial goals effortlessly.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/HimJaiss"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-gray-300
                  dark:border-[#21406D]
                  bg-gray-50
                  dark:bg-[#0A1830]
                  text-gray-700
                  dark:text-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  hover:bg-[#2D7DFF]
                  hover:text-white
                  hover:border-[#2D7DFF]
                  hover:scale-110
                  shadow-sm
                "
              >
                <FaGithub className="text-base" />
              </a>

              <a
                href="https://www.linkedin.com/in/himanshu-jaiswal-893b36228/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-gray-300
                  dark:border-[#21406D]
                  bg-gray-50
                  dark:bg-[#0A1830]
                  text-gray-700
                  dark:text-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  hover:bg-[#0077B5]
                  hover:text-white
                  hover:border-[#0077B5]
                  hover:scale-110
                  shadow-sm
                "
              >
                <FaLinkedin className="text-base" />
              </a>

              <a
                href="mailto:jaiswalhimanshu0909@gmail.com"
                aria-label="Email"
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-gray-300
                  dark:border-[#21406D]
                  bg-gray-50
                  dark:bg-[#0A1830]
                  text-gray-700
                  dark:text-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  hover:bg-red-500
                  hover:text-white
                  hover:border-red-500
                  hover:scale-110
                  shadow-sm
                "
              >
                <FaEnvelope className="text-sm" />
              </a>

              <a
                href="tel:+918292147781"
                aria-label="Phone"
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-gray-300
                  dark:border-[#21406D]
                  bg-gray-50
                  dark:bg-[#0A1830]
                  text-gray-700
                  dark:text-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  hover:bg-green-600
                  hover:text-white
                  hover:border-green-600
                  hover:scale-110
                  shadow-sm
                "
              >
                <FaPhoneAlt className="text-sm" />
              </a>
            </div>
          </div>

          {/* ================= COLUMN 2: QUICK LINKS ================= */}
          <div
            className="
              lg:px-8
              lg:border-r
              border-gray-200
              dark:border-[#21406D]/60
            "
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h2>
            <div className="w-10 h-1 bg-[#2D7DFF] rounded-full mt-2 mb-5" />

            <div className="space-y-2">
              <Link
                href="/"
                className="
                  flex
                  items-center
                  gap-3
                  py-1.5
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  hover:text-[#2D7DFF]
                  dark:hover:text-[#60A5FA]
                  transition-colors
                  group
                "
              >
                <FaArrowRight className="text-xs text-[#2D7DFF] group-hover:translate-x-1 transition-transform" />
                Home
              </Link>

              {/* Features Button with Smooth Scroll & Route Redirect */}
              <button
                type="button"
                onClick={() => handleScrollToSection("features")}
                className="
                  flex
                  items-center
                  gap-3
                  py-1.5
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  hover:text-[#2D7DFF]
                  dark:hover:text-[#60A5FA]
                  transition-colors
                  group
                  cursor-pointer
                  w-full
                  text-left
                "
              >
                <FaArrowRight className="text-xs text-[#2D7DFF] group-hover:translate-x-1 transition-transform" />
                Features
              </button>

              {/* Testimonials Button with Smooth Scroll & Route Redirect */}
              <button
                type="button"
                onClick={() => handleScrollToSection("testimonials")}
                className="
                  flex
                  items-center
                  gap-3
                  py-1.5
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  hover:text-[#2D7DFF]
                  dark:hover:text-[#60A5FA]
                  transition-colors
                  group
                  cursor-pointer
                  w-full
                  text-left
                "
              >
                <FaArrowRight className="text-xs text-[#2D7DFF] group-hover:translate-x-1 transition-transform" />
                Testimonials
              </button>

              <Link
                href="/sign-in"
                className="
                  flex
                  items-center
                  gap-3
                  py-1.5
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  hover:text-[#2D7DFF]
                  dark:hover:text-[#60A5FA]
                  transition-colors
                  group
                "
              >
                <FaArrowRight className="text-xs text-[#2D7DFF] group-hover:translate-x-1 transition-transform" />
                Login
              </Link>
            </div>
          </div>

          {/* ================= COLUMN 3: CONTACT ================= */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Contact
            </h2>
            <div className="w-10 h-1 bg-[#2D7DFF] rounded-full mt-2 mb-5" />

            <div className="space-y-3.5">
              <a
                href="mailto:jaiswalhimanshu0909@gmail.com"
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  hover:text-[#2D7DFF]
                  dark:hover:text-[#60A5FA]
                  transition-colors
                  group
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-gray-50
                    dark:bg-[#0A1830]
                    border
                    border-gray-200
                    dark:border-[#21406D]
                    flex
                    items-center
                    justify-center
                    group-hover:bg-red-500
                    group-hover:text-white
                    group-hover:border-red-500
                    transition-colors
                    shrink-0
                  "
                >
                  <FaEnvelope className="text-xs" />
                </div>
                <span className="truncate">jaiswalhimanshu0909@gmail.com</span>
              </a>

              <a
                href="tel:+918292147781"
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  hover:text-[#2D7DFF]
                  dark:hover:text-[#60A5FA]
                  transition-colors
                  group
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-gray-50
                    dark:bg-[#0A1830]
                    border
                    border-gray-200
                    dark:border-[#21406D]
                    flex
                    items-center
                    justify-center
                    group-hover:bg-green-600
                    group-hover:text-white
                    group-hover:border-green-600
                    transition-colors
                    shrink-0
                  "
                >
                  <FaPhoneAlt className="text-xs" />
                </div>
                <span>+91 8292147781</span>
              </a>

              <a
                href="https://www.linkedin.com/in/himanshu-jaiswal-893b36228/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  hover:text-[#2D7DFF]
                  dark:hover:text-[#60A5FA]
                  transition-colors
                  group
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-gray-50
                    dark:bg-[#0A1830]
                    border
                    border-gray-200
                    dark:border-[#21406D]
                    flex
                    items-center
                    justify-center
                    group-hover:bg-[#0077B5]
                    group-hover:text-white
                    group-hover:border-[#0077B5]
                    transition-colors
                    shrink-0
                  "
                >
                  <FaLinkedin className="text-xs" />
                </div>
                <span className="truncate">linkedin.com/in/himanshu-jaiswal</span>
              </a>

              <a
                href="https://github.com/HimJaiss"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  hover:text-[#2D7DFF]
                  dark:hover:text-[#60A5FA]
                  transition-colors
                  group
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-gray-50
                    dark:bg-[#0A1830]
                    border
                    border-gray-200
                    dark:border-[#21406D]
                    flex
                    items-center
                    justify-center
                    group-hover:bg-[#2D7DFF]
                    group-hover:text-white
                    group-hover:border-[#2D7DFF]
                    transition-colors
                    shrink-0
                  "
                >
                  <FaGithub className="text-xs" />
                </div>
                <span className="truncate">github.com/HimJaiss</span>
              </a>
            </div>
          </div>
        </div>

        {/* ===================== BOTTOM BAR ===================== */}
        <div
          className="
            border-t
            border-gray-200
            dark:border-[#21406D]/60
            mt-12
            pt-6
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
              gap-4
            "
          >
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Finly Inc. All rights reserved.
            </p>

            {/* Security Badge */}
            <div
              className="
                flex
                items-center
                gap-2.5
                bg-blue-50/80
                dark:bg-[#0A1830]
                border
                border-blue-200
                dark:border-[#21406D]
                px-4
                py-1.5
                rounded-full
                shadow-xs
              "
            >
              <ShieldCheck className="h-4 w-4 text-[#2D7DFF] dark:text-[#60A5FA]" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-[#D5DDF0]">
                256-bit Bank-Grade Encryption
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-[#2D7DFF] dark:hover:text-[#60A5FA] transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                href="/terms"
                className="hover:text-[#2D7DFF] dark:hover:text-[#60A5FA] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}