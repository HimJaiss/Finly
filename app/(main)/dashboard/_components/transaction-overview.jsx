"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

// =====================================================
// Chart Colors
// =====================================================

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFB347",
  "#D4A5A5",
  "#9FA8DA",
];

// =====================================================
// Indian Currency Formatter (Fixed with ₹ symbol)
// =====================================================

const formatCurrency = (amount) => {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

  return `₹${formattedNumber}`;
};

// =====================================================
// Custom Tooltip
// Removes the unwanted "0"
// =====================================================

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0];

  return (
    <div
      className="
        min-w-[170px]
        rounded-lg
        border
        border-gray-200
        bg-white
        px-4
        py-3
        shadow-lg

        dark:border-[#21406D]
        dark:bg-[#071A33]

        transition-colors
        duration-300
      "
    >
      <p
        className="
          mb-1
          text-sm
          font-semibold
          capitalize
          text-gray-900
          dark:text-white
        "
      >
        {data.name}
      </p>

      <p
        className="
          text-sm
          font-medium
          text-gray-600
          dark:text-[#D5DDF0]
        "
      >
        {formatCurrency(data.value)}
      </p>
    </div>
  );
};

// =====================================================
// Dashboard Overview
// =====================================================

export function DashboardOverview({ accounts, transactions }) {
  // ===================================================
  // Selected Account
  // ===================================================

  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((account) => account.isDefault)?.id ||
      accounts[0]?.id ||
      ""
  );

  // ===================================================
  // Filter Transactions
  // ===================================================

  const accountTransactions = transactions.filter(
    (transaction) => transaction.accountId === selectedAccountId
  );

  // ===================================================
  // Recent Transactions
  // ===================================================

  const recentTransactions = [...accountTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // ===================================================
  // Current Month Expenses
  // ===================================================

  const currentDate = new Date();

  const currentMonthExpenses = accountTransactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.date);

      return (
        transaction.type === "EXPENSE" &&
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear()
      );
    }
  );

  // ===================================================
  // Group Expenses By Category
  // ===================================================

  const expensesByCategory = currentMonthExpenses.reduce(
    (accumulator, transaction) => {
      const category = transaction.category || "Other";

      if (!accumulator[category]) {
        accumulator[category] = 0;
      }

      accumulator[category] += Number(transaction.amount) || 0;

      return accumulator;
    },
    {}
  );

  // ===================================================
  // Pie Chart Data
  // ===================================================

  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  // ===================================================
  // Longest Account Name
  // Used for automatic dropdown width
  // ===================================================

  const longestAccountName =
    accounts.reduce(
      (longest, account) =>
        account.name.length > longest.length
          ? account.name
          : longest,
      ""
    ) || "Select Account";

  const dropdownWidth = Math.max(
    145,
    Math.min(longestAccountName.length * 8 + 55, 260)
  );

  // ===================================================
  // JSX
  // ===================================================

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* ================================================= */}
      {/* Recent Transactions */}
      {/* ================================================= */}

      <Card
        className="
          border-gray-200
          bg-white

          dark:border-[#21406D]
          dark:bg-[#071A33]

          transition-colors
          duration-300
        "
      >
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle
              className="
                text-base
                font-medium
                text-gray-900
                dark:text-white
              "
            >
              Recent Transactions
            </CardTitle>

            {/* =============================== */}
            {/* Account Dropdown */}
            {/* =============================== */}

            <Select
              value={selectedAccountId}
              onValueChange={setSelectedAccountId}
            >
              <SelectTrigger
                style={{
                  width: `${dropdownWidth}px`,
                }}
                className="
                  h-9
                  shrink-0

                  rounded-md
                  border
                  border-gray-200
                  bg-white

                  px-3

                  text-sm
                  font-medium
                  text-gray-800

                  focus:ring-2
                  focus:ring-[#2D7DFF]/30

                  dark:border-[#21406D]
                  dark:bg-[#0A1830]
                  dark:text-[#D5DDF0]

                  transition-colors
                  duration-300
                "
              >
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>

              <SelectContent
                className="
                  border-gray-200
                  bg-white
                  text-gray-800

                  dark:border-[#21406D]
                  dark:bg-[#0A1830]
                  dark:text-[#D5DDF0]
                "
              >
                {accounts.map((account) => (
                  <SelectItem
                    key={account.id}
                    value={account.id}
                    className="
                      cursor-pointer

                      focus:bg-gray-100
                      focus:text-gray-900

                      dark:focus:bg-[#102B50]
                      dark:focus:text-white
                    "
                  >
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {recentTransactions.length === 0 ? (
            <p
              className="
                py-8
                text-center
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              No recent transactions
            </p>
          ) : (
            <div className="space-y-5">
              {recentTransactions.map((transaction) => {
                const isExpense = transaction.type === "EXPENSE";

                return (
                  <div
                    key={transaction.id}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    {/* Transaction Information */}

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-medium

                          text-gray-900
                          dark:text-white
                        "
                      >
                        {transaction.description ||
                          "Untitled Transaction"}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        {format(
                          new Date(transaction.date),
                          "PP"
                        )}
                      </p>
                    </div>

                    {/* Transaction Amount */}

                    <div
                      className={cn(
                        "flex shrink-0 items-center gap-1.5",
                        "text-sm font-medium",
                        isExpense
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {isExpense ? (
                        <ArrowDownRight size={15} />
                      ) : (
                        <ArrowUpRight size={15} />
                      )}

                      <span>
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================================================= */}
      {/* Monthly Expense Breakdown */}
      {/* ================================================= */}

      <Card
        className="
          border-gray-200
          bg-white

          dark:border-[#21406D]
          dark:bg-[#071A33]

          transition-colors
          duration-300
        "
      >
        <CardHeader>
          <CardTitle
            className="
              text-base
              font-medium
              text-gray-900
              dark:text-white
            "
          >
            Monthly Expense Breakdown
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pb-5">
          {pieChartData.length === 0 ? (
            <p
              className="
                py-12
                text-center
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              No expenses this month
            </p>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="45%"
                    innerRadius={0}
                    outerRadius={78}
                    dataKey="value"
                    nameKey="name"
                    paddingAngle={2}
                    stroke="#ffffff"
                    strokeWidth={1}
                    label={({ name, value }) =>
                      `${name}: ${formatCurrency(value)}`
                    }
                    labelLine={{
                      stroke: "#9CA3AF",
                      strokeWidth: 1,
                    }}
                  >
                    {pieChartData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index % COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  {/* Professional Custom Tooltip */}

                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={false}
                  />

                  {/* Legend */}

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{
                      paddingTop: "10px5"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}