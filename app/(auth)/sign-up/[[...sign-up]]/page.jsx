"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main
      className="
        min-h-screen
        w-full
        flex
        flex-col
        items-center
        justify-center

        px-4
        sm:px-6
        md:px-8

        py-10
        sm:py-14
        lg:py-16

        bg-white
        dark:bg-[#050B18]

        transition-colors
        duration-300
      "
    >
      <div
        className="
          w-full
          max-w-[420px]
          sm:max-w-[440px]
          md:max-w-[460px]

          mx-auto
        "
      >
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            variables: {
              colorPrimary: "#2D7DFF",
              borderRadius: "0.75rem",
            },

            elements: {
              rootBox: `
                w-full
                flex
                justify-center
              `,

              card: `
                w-full
                max-w-full
                shadow-xl
                border

                bg-white
                border-gray-200

                dark:bg-[#0A1830]
                dark:border-[#21406D]

                transition-colors
                duration-300
              `,

              headerTitle: `
                text-gray-900
                dark:text-white
                font-bold
                text-xl
                sm:text-2xl
              `,

              headerSubtitle: `
                text-gray-500
                dark:text-[#AEBBD0]
                text-sm
                sm:text-base
              `,

              socialButtonsBlockButton: `
                w-full
                border-gray-200
                bg-white
                text-gray-800

                hover:bg-gray-50

                dark:bg-[#071A33]
                dark:border-[#21406D]
                dark:text-white
                dark:hover:bg-[#10264A]
              `,

              socialButtonsBlockButtonText: `
                text-gray-800
                dark:text-white
              `,

              dividerLine: `
                bg-gray-200
                dark:bg-[#21406D]
              `,

              dividerText: `
                text-gray-500
                dark:text-[#8FA2BF]
              `,

              formFieldLabel: `
                text-gray-800
                dark:text-[#D5DDF0]
              `,

              formFieldInput: `
                w-full
                bg-white
                border-gray-300
                text-gray-900

                placeholder:text-gray-400

                focus:border-[#2D7DFF]
                focus:ring-[#2D7DFF]

                dark:bg-[#071A33]
                dark:border-[#21406D]
                dark:text-white
                dark:placeholder:text-[#71829D]
              `,

              formButtonPrimary: `
                w-full
                bg-[#2D7DFF]
                hover:bg-[#2563EB]
                text-white
                transition-colors
              `,

              footerActionText: `
                text-gray-500
                dark:text-[#AEBBD0]
              `,

              footerActionLink: `
                text-[#2D7DFF]
                hover:text-[#60A5FA]
              `,
            },
          }}
        />
      </div>
    </main>
  );
}