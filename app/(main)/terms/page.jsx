import React from "react";
import Link from "next/link";
import { FileText, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Finly",
  description: "Review the terms and conditions for utilizing the Finly financial platform.",
};

export default function TermsOfService() {
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
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Terms of Service
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: August 2026 • Version 1.2
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Finly (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              2. User Accounts & Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>You are responsible for maintaining the confidentiality of your credentials.</li>
              <li>You agree to provide accurate transaction details and maintain the security of any connected payment information.</li>
              <li>Unauthorized access attempts, automated scraping, or reverse engineering of APIs will result in immediate account termination.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              3. AI Financial Advice Disclaimer
            </h2>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-sm">
              <strong className="block mb-1">Important Notice:</strong>
              Finly leverages automated AI models to organize, categorize, and summarize budgets. AI insights and projections do not constitute certified financial, legal, or investment advice. Users should consult licensed financial advisors before making investment decisions.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              4. Service Availability & Scheduled Tasks
            </h2>
            <p>
              While we target 99.9% uptime for recurring background jobs and webhook processing, we are not liable for transient network delays, third-party provider outages, or banking sync latencies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              5. Termination & Account Deletion
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate system fair-use limits, abuse rate limits, or engage in malicious API exploitation.
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200 dark:border-[#21406D]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Legal Inquiries
            </h2>
            <p className="text-sm">
              For questions regarding these terms, reach out to{" "}
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