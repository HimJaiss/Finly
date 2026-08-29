import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, HelpCircle, LogIn } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function NotFound() {
  return (
    <div
      className="
        relative 
        min-h-[85vh] 
        flex 
        items-center 
        justify-center 
        px-6 
        py-16 
        overflow-hidden 
        bg-white 
        text-gray-900 
        dark:bg-[#050B18] 
        dark:text-white 
        transition-colors 
        duration-300
      "
    >
      {/* Background Decorative Glow Elements */}
      <div
        className="
          pointer-events-none 
          absolute 
          top-1/4 
          left-1/2 
          -translate-x-1/2 
          w-96 
          h-96 
          bg-blue-500/10 
          dark:bg-blue-600/15 
          rounded-full 
          blur-[120px]
        "
      />
      <div
        className="
          pointer-events-none 
          absolute 
          bottom-10 
          right-1/4 
          w-72 
          h-72 
          bg-indigo-500/10 
          dark:bg-indigo-600/10 
          rounded-full 
          blur-[100px]
        "
      />

      {/* Main Content Card */}
      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Floating Icon Badge */}
        <div
          className="
            mb-6 
            flex 
            h-16 
            w-16 
            items-center 
            justify-center 
            rounded-2xl 
            bg-blue-50 
            border 
            border-blue-100 
            dark:bg-[#0A1830] 
            dark:border-[#21406D] 
            shadow-sm 
            animate-bounce
          "
        >
          <HelpCircle className="h-8 w-8 text-[#2D7DFF] dark:text-[#60A5FA]" />
        </div>

        {/* 404 Gradient Display */}
        <h1
          className="
            text-7xl 
            sm:text-8xl 
            font-black 
            tracking-tight 
            bg-gradient-to-tr 
            from-[#2D7DFF] 
            via-[#4F46E5] 
            to-[#7C3AED] 
            bg-clip-text 
            text-transparent 
            mb-2
          "
        >
          404
        </h1>

        {/* Heading & Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-[#C8D4E8] max-w-md mx-auto leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          {/* Primary Action: Home */}
          <Link href="/" className="w-full sm:w-auto">
            <Button
              className="
                w-full 
                sm:w-auto 
                h-11 
                px-6 
                rounded-xl 
                gap-2 
                bg-[#2D7DFF] 
                hover:bg-[#1F6FE5] 
                text-white 
                font-semibold 
                border 
                border-[#2D7DFF] 
                hover:shadow-lg 
                hover:shadow-blue-500/25 
                transition-all 
                duration-300
              "
            >
              <Home size={17} />
              Return Home
            </Button>
          </Link>

          {/* Secondary Action: If Signed In -> Dashboard */}
          <SignedIn>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="
                  w-full 
                  sm:w-auto 
                  h-11 
                  px-6 
                  rounded-xl 
                  gap-2 
                  border-gray-200 
                  dark:border-[#21406D] 
                  bg-gray-50 
                  dark:bg-[#0A1830] 
                  text-gray-700 
                  dark:text-[#D5DDF0] 
                  hover:bg-blue-50 
                  dark:hover:bg-[#102B50] 
                  hover:text-[#2D7DFF] 
                  dark:hover:text-white 
                  hover:border-[#2D7DFF] 
                  font-medium 
                  transition-all 
                  duration-300
                "
              >
                <ArrowLeft size={17} />
                Dashboard
              </Button>
            </Link>
          </SignedIn>

          {/* Secondary Action: If Signed Out -> Clean Sign In Link */}
          <SignedOut>
            <Link href="/sign-in" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="
                  w-full 
                  sm:w-auto 
                  h-11 
                  px-6 
                  rounded-xl 
                  gap-2 
                  border-gray-200 
                  dark:border-[#21406D] 
                  bg-gray-50 
                  dark:bg-[#0A1830] 
                  text-gray-700 
                  dark:text-[#D5DDF0] 
                  hover:bg-blue-50 
                  dark:hover:bg-[#102B50] 
                  hover:text-[#2D7DFF] 
                  dark:hover:text-white 
                  hover:border-[#2D7DFF] 
                  font-medium 
                  transition-all 
                  duration-300
                "
              >
                <LogIn size={17} />
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}