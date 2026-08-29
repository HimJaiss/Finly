import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Finly",
  description: "Learn how Finly collects, encrypts, and protects your financial data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#050B18] dark:text-white transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2D7DFF] dark:text-[#60A5FA] hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* Page Header */}
        <div className="border-b border-gray-200 dark:border-[#21406D] pb-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-[#0A1830] border border-blue-200 dark:border-[#21406D] text-[#2D7DFF]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: August 2026 • Effective Immediately
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              Finly (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects only the minimal necessary data to deliver AI-driven financial insights:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Account Credentials:</strong> User authentication details managed securely via Clerk.</li>
              <li><strong>Transaction Data:</strong> Amounts, dates, categories, descriptions, and account balances input manually or parsed from uploaded receipts.</li>
              <li><strong>Receipt Images:</strong> Uploaded invoice/receipt images processed by Google Gemini AI for automated expense tagging.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">
              Your financial records are used exclusively to operate your dashboard:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Generating budget tracking, monthly reports, and expense breakdown analytics.</li>
              <li>Executing automated recurring transaction alerts via background workflows.</li>
              <li>Providing generative AI suggestions tailored to your budget constraints.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              3. Data Security & Encryption
            </h2>
            <p>
              We enforce 256-bit SSL/TLS encryption for all data in transit and AES-256 encryption at rest within PostgreSQL databases. Edge request verification and rate limiting prevent unauthorized access and DDoS exploitation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              4. Third-Party Disclosures & AI Privacy
            </h2>
            <p>
              We do not sell, rent, or monetize your personal or financial data. Receipt parsing and analytical summaries utilize enterprise API connections that do not use your private financial data for model training.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              5. Your Data Rights
            </h2>
            <p>
              You retain full ownership of your data. You may export transaction histories (CSV/PDF) or delete your account and associated records directly from your user dashboard at any time.
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200 dark:border-[#21406D]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Contact Privacy Team
            </h2>
            <p className="text-sm">
              If you have inquiries regarding our data handling practices, reach us at{" "}
              <a
                href="mailto:jaiswalhimanshu0909@gmail.com"
                className="text-[#2D7DFF] dark:text-[#60A5FA] underline"
              >
                jaiswalhimanshu0909@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}