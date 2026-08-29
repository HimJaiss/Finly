"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({
  title,
  description,
  backLabel = "Back",
}) {
  const router = useRouter();

  return (
    <div className="mb-8">

      <button
        onClick={() => router.back()}
        className="group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
      >
        <ArrowLeft
          size={18}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        {backLabel}
      </button>

      <div className="mt-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-slate-500">
            {description}
          </p>
        )}
      </div>

      <div className="mt-6 border-b border-slate-200" />
    </div>
  );
}