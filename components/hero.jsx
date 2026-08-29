"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerSlides = [
  {
    id: 1,
    src: "/banner1.png",
    alt: "Finly Family Financial Planning and Education Savings",
  },
  {
    id: 2,
    src: "/banner2.png",
    alt: "Finly Student & Career Budget Habits",
  },
  {
    id: 3,
    src: "/banner3.png",
    alt: "Finly Smart Salary & Wealth Management",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  }, []);

  // Automatic slide transition every 5 seconds, speeds up to 2.5 seconds on hover
  useEffect(() => {
    const intervalTime = isHovered ? 2500 : 5000;
    const timer = setInterval(() => {
      nextSlide();
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-white
        text-gray-900
        dark:bg-[#050B18]
        dark:text-white
        transition-colors
        duration-300
      "
    >
      {/* ================= HERO CONTENT ================= */}
      <div
        className="
          w-full
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-4
          sm:px-6
          md:px-8
          pt-14
          sm:pt-21
          md:pt-23
          lg:pt-26
          xl:pt-32
          pb-10
          sm:pb-14
          md:pb-16
          lg:pb-20
        "
      >
        {/* ================= HEADING ================= */}
        <h1
          className="
            w-full
            max-w-7xl
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-8xl
            font-extrabold
            leading-[1.05]
            tracking-tight
            pb-2
            overflow-visible
            bg-gradient-to-r
            from-[#2D7DFF]
            via-[#4F46E5]
            to-[#7C3AED]
            bg-clip-text
            text-transparent
            dark:from-[#60A5FA]
            dark:via-[#6366F1]
            dark:to-[#A78BFA]
          "
        >
          Manage Your Finances
          <br />
          With Intelligence
        </h1>

        {/* ================= DESCRIPTION ================= */}
        <p
          className="
            mt-6 
            sm:mt-7 
            md:mt-8
            w-full 
            max-w-4xl
            mx-auto
            px-5
            sm:px-0
            text-sm 
            sm:text-base 
            md:text-lg 
            lg:text-xl
            leading-relaxed
            font-medium
            text-gray-600
            dark:text-[#D5DDF0]
            dark:font-semibold
            transition-colors 
            duration-300
          "
        >
          An AI-powered financial platform delivering real-time insights, intelligent analytics,
          and personalized recommendations for smarter spending and saving.
        </p>

        {/* ================= BUTTONS ================= */}
        <div
          className="
            mt-7
            sm:mt-8
            md:mt-10
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-3
            sm:gap-4
            w-full
            sm:w-auto
          "
        >
          {/* Get Started */}
          <Link href="/sign-up" className="w-full sm:w-auto">
            <Button
              className="
                w-full
                sm:w-auto
                h-11
                sm:h-12
                px-7
                sm:px-8
                rounded-lg
                bg-white
                text-gray-900
                border
                border-gray-200
                shadow-sm
                hover:bg-gray-50
                hover:border-[#2D7DFF]
                dark:bg-[#0A1830]
                dark:text-white
                dark:border-[#21406D]
                dark:hover:bg-[#102B50]
                dark:hover:border-[#2D7DFF]
                transition-all
                duration-300
              "
            >
              Get Started
            </Button>
          </Link>

          {/* Watch Demo */}
          <Button
            className="
              w-full
              sm:w-auto
              h-11
              sm:h-12
              px-7
              sm:px-8
              rounded-lg
              bg-black
              text-white
              hover:bg-[#2D7DFF]
              dark:bg-[#0A1830]
              dark:text-white
              dark:border
              dark:border-[#21406D]
              dark:hover:bg-[#102B50]
              dark:hover:border-[#2D7DFF]
              transition-all
              duration-300
            "
          >
            Watch Demo
          </Button>
        </div>
      </div>

      {/* ================= HERO IMAGE CAROUSEL ================= */}
      <div
        className="
          relative
          group
          w-[94%]
          sm:w-[92%]
          md:w-[90%]
          lg:w-[88%]
          max-w-[1600px]
          mx-auto
          overflow-hidden
          rounded-xl
          sm:rounded-2xl
          border
          border-gray-200
          dark:border-[#21406D]
          shadow-lg
          sm:shadow-xl
          dark:shadow-blue-950/30
          transition-all
          duration-500
          bg-slate-900
        "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides Stack */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`
                absolute
                inset-0
                transition-opacity
                duration-700
                ease-in-out
                ${
                  index === currentSlide
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }
              `}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="
                  (max-width: 640px) 94vw,
                  (max-width: 768px) 92vw,
                  (max-width: 1024px) 90vw,
                  88vw
                "
                className="
                  block
                  w-full
                  h-full
                  object-cover
                  transition-all
                  duration-500
                  brightness-100
                  contrast-100
                  dark:brightness-100
                  dark:contrast-[1.05]
                "
              />
            </div>
          ))}
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="
            absolute
            left-3
            sm:left-5
            top-1/2
            -translate-y-1/2
            z-30
            h-9
            w-9
            sm:h-11
            sm:w-11
            rounded-full
            flex
            items-center
            justify-center
            backdrop-blur-md
            bg-white/80
            text-gray-900
            hover:bg-white
            border
            border-gray-200
            shadow-lg
            dark:bg-[#050B18]/80
            dark:text-white
            dark:border-[#21406D]
            dark:hover:bg-[#0A1830]
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            cursor-pointer
          "
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="
            absolute
            right-3
            sm:right-5
            top-1/2
            -translate-y-1/2
            z-30
            h-9
            w-9
            sm:h-11
            sm:w-11
            rounded-full
            flex
            items-center
            justify-center
            backdrop-blur-md
            bg-white/80
            text-gray-900
            hover:bg-white
            border
            border-gray-200
            shadow-lg
            dark:bg-[#050B18]/80
            dark:text-white
            dark:border-[#21406D]
            dark:hover:bg-[#0A1830]
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            cursor-pointer
          "
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Indicator Dot Navigation */}
        <div
          className="
            absolute
            bottom-3
            sm:bottom-5
            left-1/2
            -translate-x-1/2
            z-30
            flex
            items-center
            space-x-2
            px-3.5
            py-1.5
            rounded-full
            backdrop-blur-md
            bg-white/80
            border
            border-gray-200
            dark:bg-[#050B18]/80
            dark:border-[#21406D]
            shadow-sm
          "
        >
          {bannerSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`
                h-2
                sm:h-2.5
                rounded-full
                transition-all
                duration-300
                ${
                  idx === currentSlide
                    ? "w-6 sm:w-7 bg-[#2D7DFF] dark:bg-[#60A5FA]"
                    : "w-2 sm:w-2.5 bg-gray-400/70 dark:bg-gray-500/70 hover:bg-gray-600"
                }
              `}
            />
          ))}
        </div>

        {/* Dark Mode Border & Glow */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-xl
            sm:rounded-2xl
            ring-1
            ring-inset
            ring-transparent
            dark:ring-[#2D7DFF]/20
            transition-all
            duration-500
          "
        />
      </div>

      {/* ================= BOTTOM SPACING ================= */}
      <div
        className="
          h-10
          sm:h-12
          md:h-16
          lg:h-20
          bg-white
          dark:bg-[#050B18]
          transition-colors
          duration-300
        "
      />
    </section>
  );
};

export default HeroSection;