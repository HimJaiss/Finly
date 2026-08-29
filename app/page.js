import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div
      className="
        w-full
        bg-white
        text-gray-900

        dark:bg-[#050B18]
        dark:text-white

        transition-colors
        duration-300
      "
    >
      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <HeroSection />

      {/* ================================================= */}
      {/* STATS SECTION */}
      {/* ================================================= */}

      <section
        className="
          py-20
          bg-blue-50
          dark:bg-[#081426]

          transition-colors
          duration-300
        "
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="
                    text-4xl
                    font-bold
                    text-blue-600
                    dark:text-[#60A5FA]
                    mb-2
                  "
                >
                  {stat.value}
                </div>

                <div
                  className="
                    font-semibold
                    text-gray-600
                    dark:text-[#D5DDF0]
                  "
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FEATURES SECTION */}
      {/* ================================================= */}

      <section
        id="features"
        className="
          py-20
          bg-white
          dark:bg-[#050B18]

          transition-colors
          duration-300
        "
      >
        <div className="container mx-auto px-4">

          <h2
            className="
              text-3xl
              font-bold
              text-center
              mb-12

              text-gray-900
              dark:text-white
            "
          >
            Everything you need to manage your finances
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="
                  p-6

                  bg-white
                  border-gray-200
                  text-gray-900

                  dark:bg-[#0A1830]
                  dark:border-[#21406D]
                  dark:text-white

                  transition-all
                  duration-300

                  hover:shadow-md

                  dark:hover:border-[#2D7DFF]
                  dark:hover:shadow-blue-900/20
                "
              >
                <CardContent className="space-y-4 pt-4">

                  {/* Icon */}

                  <div
                    className="
                      text-[#2D7DFF]
                      dark:text-[#60A5FA]
                    "
                  >
                    {feature.icon}
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      text-gray-600
                      dark:text-[#D5DDF0]

                      font-medium
                      leading-relaxed

                      transition-colors
                      duration-300
                    "
                  >
                    {feature.description}
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* HOW IT WORKS SECTION */}
      {/* ================================================= */}

      <section
        className="
          py-20

          bg-blue-50
          dark:bg-[#081426]

          text-gray-900
          dark:text-white

          transition-colors
          duration-300
        "
      >
        <div className="container mx-auto px-4">

          {/* Heading */}

          <h2
            className="
              text-3xl
              font-bold
              text-center
              mb-16

              text-gray-900
              dark:text-white
            "
          >
            How It Works
          </h2>

          {/* Steps */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-12
            "
          >
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="text-center"
              >

                {/* Icon */}

                <div
                  className="
                    w-16
                    h-16

                    bg-blue-100
                    dark:bg-[#102B50]

                    rounded-full

                    flex
                    items-center
                    justify-center

                    mx-auto
                    mb-6

                    transition-colors
                    duration-300
                  "
                >
                  <div
                    className="
                      text-[#2D7DFF]
                      dark:text-[#60A5FA]
                    "
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Step Title */}

                <h3
                  className="
                    text-xl
                    font-bold
                    mb-4

                    text-gray-900
                    dark:text-white
                  "
                >
                  {step.title}
                </h3>

                {/* Step Description */}

                <p
                  className="
                    text-gray-600
                    dark:text-[#D5DDF0]

                    font-medium
                    leading-relaxed

                    transition-colors
                    duration-300
                  "
                >
                  {step.description}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* TESTIMONIALS SECTION */}
      {/* ================================================= */}

      <section
        id="testimonials"
        className="
          py-20

          bg-white
          dark:bg-[#050B18]

          transition-colors
          duration-300
        "
      >
        <div className="container mx-auto px-4">

          {/* Heading */}

          <h2
            className="
              text-3xl
              font-bold
              text-center
              mb-16

              text-gray-900
              dark:text-white
            "
          >
            What Our Users Say
          </h2>

          {/* Testimonials */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-8
            "
          >
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="
                  p-6

                  bg-white
                  border-gray-200
                  text-gray-900

                  dark:bg-[#0A1830]
                  dark:border-[#21406D]
                  dark:text-white

                  transition-all
                  duration-300

                  hover:shadow-md

                  dark:hover:border-[#2D7DFF]
                  dark:hover:shadow-blue-900/20
                "
              >
                <CardContent className="pt-4">

                  {/* User */}

                  <div className="flex items-center mb-4">

                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />

                    <div className="ml-4">

                      {/* Name */}

                      <div
                        className="
                          font-bold

                          text-gray-900
                          dark:text-white
                        "
                      >
                        {testimonial.name}
                      </div>

                      {/* Role */}

                      <div
                        className="
                          text-sm
                          font-medium

                          text-gray-600
                          dark:text-[#AEBBD0]
                        "
                      >
                        {testimonial.role}
                      </div>

                    </div>
                  </div>

                  {/* Quote */}

                  <p
                    className="
                      text-gray-600
                      dark:text-[#D5DDF0]

                      font-medium
                      leading-relaxed
                    "
                  >
                    {testimonial.quote}
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* CTA SECTION */}
      {/* ================================================= */}

      <section
        className="
          py-20

          bg-blue-600
          dark:bg-[#0D47A1]

          transition-colors
          duration-300
        "
      >
        <div className="container mx-auto px-4 text-center">

          <h2
            className="
              text-3xl
              font-bold
              text-white
              mb-4
            "
          >
            Ready to Take Control of Your Finances?
          </h2>

          <p
            className="
              text-blue-100
              dark:text-blue-50

              mb-8
              max-w-2xl
              mx-auto

              font-medium
              leading-relaxed
            "
          >
            Join thousands of users who are already managing their finances
            smarter with Finly
          </p>

          <Link href="/dashboard">
            <Button
              size="lg"
              className="
                bg-white
                text-blue-600

                hover:bg-blue-50

                font-semibold
              "
            >
              Start Free Trial
            </Button>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;