"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Loader2,
  Wallet,
  Tag,
  FileText,
  Repeat,
  IndianRupee,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";

import {
  createTransaction,
  updateTransaction,
} from "@/actions/transaction";

import { transactionSchema } from "@/app/lib/schema";
import { ReceiptScanner } from "./recipt-scanner";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),

    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  // ==========================================
  // Submit
  // ==========================================

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  // ==========================================
  // Receipt Scanner
  // ==========================================

  const handleScanComplete = (scannedData) => {
    if (!scannedData) return;

    setValue("amount", scannedData.amount.toString());

    if (scannedData.date) {
      setValue("date", new Date(scannedData.date));
    }

    if (scannedData.description) {
      setValue("description", scannedData.description);
    }

    if (scannedData.category) {
      setValue("category", scannedData.category);
    }

    toast.success("Receipt scanned successfully");
  };

  // ==========================================
  // Success
  // ==========================================

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );

      reset();

      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [
    transactionResult,
    transactionLoading,
    editMode,
    reset,
    router,
  ]);

  // ==========================================
  // Form Values
  // ==========================================

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  // ==========================================
  // Input Style
  // ==========================================

  const inputClass = `
    h-11
    rounded-lg

    border-gray-200
    bg-white
    text-gray-900

    placeholder:text-gray-400

    focus:border-[#2D7DFF]
    focus:ring-2
    focus:ring-[#2D7DFF]/20

    dark:border-[#21406D]
    dark:bg-[#0A1830]
    dark:text-white
    dark:placeholder:text-gray-500

    dark:focus:border-[#2D7DFF]
    dark:focus:ring-[#2D7DFF]/20

    transition-all
    duration-200
  `;

  const selectTriggerClass = `
    h-11
    w-full
    rounded-lg

    border-gray-200
    bg-white
    text-gray-900

    dark:border-[#21406D]
    dark:bg-[#0A1830]
    dark:text-white

    focus:ring-2
    focus:ring-[#2D7DFF]/20
    focus:border-[#2D7DFF]

    transition-all
    duration-200
  `;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        w-full
        max-w-4xl
        mx-auto

        space-y-6
        pb-8
      "
    >
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          rounded-2xl
          border

          border-gray-200
          bg-white

          dark:border-[#21406D]
          dark:bg-[#071A33]

          p-5
          sm:p-6

          shadow-sm
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl

              bg-blue-50
              text-[#2D7DFF]

              dark:bg-[#0A2447]
            "
          >
            {type === "EXPENSE" ? (
              <ArrowDownRight size={22} />
            ) : (
              <ArrowUpRight size={22} />
            )}
          </div>

          <div>
            <h1
              className="
                text-xl
                sm:text-2xl
                font-semibold

                text-gray-900
                dark:text-white
              "
            >
              {editMode
                ? "Edit Transaction"
                : "Add New Transaction"}
            </h1>

            <p
              className="
                mt-1
                text-sm

                text-gray-500
                dark:text-[#AEBBD0]
              "
            >
              {editMode
                ? "Update your transaction details"
                : "Record your income or expense"}
            </p>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* RECEIPT SCANNER */}
      {/* ================================================= */}

      {!editMode && (
        <div
          className="
            rounded-2xl
            border

            border-blue-100
            bg-blue-50/60

            dark:border-[#21406D]
            dark:bg-[#0A2447]/50

            p-4
            sm:p-5
          "
        >
          <ReceiptScanner onScanComplete={handleScanComplete} />
        </div>
      )}

      {/* ================================================= */}
      {/* TRANSACTION DETAILS */}
      {/* ================================================= */}

      <div
        className="
          rounded-2xl
          border

          border-gray-200
          bg-white

          dark:border-[#21406D]
          dark:bg-[#071A33]

          p-5
          sm:p-6

          shadow-sm
        "
      >
        <div className="mb-6">
          <h2
            className="
              text-lg
              font-semibold

              text-gray-900
              dark:text-white
            "
          >
            Transaction Details
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
              dark:text-[#AEBBD0]
            "
          >
            Enter the basic information about this transaction.
          </p>
        </div>

        <div className="space-y-6">
          {/* ================================================= */}
          {/* TYPE */}
          {/* ================================================= */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Transaction Type
            </label>

            <Select
              value={type}
              onValueChange={(value) =>
                setValue("type", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent
                className="
                  border-gray-200
                  bg-white

                  dark:border-[#21406D]
                  dark:bg-[#0A1830]
                  dark:text-white
                "
              >
                <SelectItem value="EXPENSE">
                  <div className="flex items-center gap-2">
                    <ArrowDownRight
                      size={16}
                      className="text-red-500"
                    />
                    Expense
                  </div>
                </SelectItem>

                <SelectItem value="INCOME">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight
                      size={16}
                      className="text-green-500"
                    />
                    Income
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {errors.type && (
              <p className="text-sm text-red-500">
                {errors.type.message}
              </p>
            )}
          </div>

          {/* ================================================= */}
          {/* AMOUNT + ACCOUNT */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Amount */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Amount
              </label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2

                    text-gray-400
                    dark:text-gray-500
                  "
                />

                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("amount")}
                  className={`${inputClass} pl-10`}
                />
              </div>

              {errors.amount && (
                <p className="text-sm text-red-500">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Account */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Account
              </label>

              <Select
                value={getValues("accountId")}
                onValueChange={(value) =>
                  setValue("accountId", value, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>

                <SelectContent
                  className="
                    border-gray-200
                    bg-white

                    dark:border-[#21406D]
                    dark:bg-[#0A1830]
                    dark:text-white
                  "
                >
                  {accounts.map((account) => (
                    <SelectItem
                      key={account.id}
                      value={account.id}
                    >
                      <div className="flex items-center gap-2">
                        <Wallet size={15} />

                        <span>
                          {account.name}
                        </span>

                        <span className="text-xs text-gray-500">
                          ₹
                          {parseFloat(
                            account.balance
                          ).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </SelectItem>
                  ))}

                  <CreateAccountDrawer>
                    <Button
                      type="button"
                      variant="ghost"
                      className="
                        w-full
                        justify-start
                        text-[#2D7DFF]

                        hover:bg-blue-50
                        hover:text-[#2D7DFF]

                        dark:hover:bg-[#102B50]
                      "
                    >
                      + Create Account
                    </Button>
                  </CreateAccountDrawer>
                </SelectContent>
              </Select>

              {errors.accountId && (
                <p className="text-sm text-red-500">
                  {errors.accountId.message}
                </p>
              )}
            </div>
          </div>

          {/* ================================================= */}
          {/* CATEGORY */}
          {/* ================================================= */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Category
            </label>

            <Select
              value={getValues("category")}
              onValueChange={(value) =>
                setValue("category", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className={selectTriggerClass}>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-400" />

                  <SelectValue placeholder="Select category" />
                </div>
              </SelectTrigger>

              <SelectContent
                className="
                  border-gray-200
                  bg-white

                  dark:border-[#21406D]
                  dark:bg-[#0A1830]
                  dark:text-white
                "
              >
                {filteredCategories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.category && (
              <p className="text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* ================================================= */}
          {/* DATE */}
          {/* ================================================= */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Date
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    `
                      h-11
                      w-full
                      justify-between
                      rounded-lg

                      border-gray-200
                      bg-white
                      text-gray-900

                      dark:border-[#21406D]
                      dark:bg-[#0A1830]
                      dark:text-white

                      hover:bg-gray-50
                      dark:hover:bg-[#102B50]

                      focus:ring-2
                      focus:ring-[#2D7DFF]/20
                    `,
                    !date &&
                      "text-gray-400 dark:text-gray-500"
                  )}
                >
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}

                  <CalendarIcon
                    size={17}
                    className="opacity-60"
                  />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="
                  w-auto
                  p-0

                  border-gray-200
                  bg-white

                  dark:border-[#21406D]
                  dark:bg-[#0A1830]
                "
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) =>
                    setValue("date", selectedDate, {
                      shouldValidate: true,
                    })
                  }
                  disabled={(date) =>
                    date > new Date() ||
                    date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {errors.date && (
              <p className="text-sm text-red-500">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>

            <div className="relative">
              <FileText
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2

                  text-gray-400
                  dark:text-gray-500
                "
              />

              <Input
                placeholder="e.g. Grocery shopping"
                {...register("description")}
                className={`${inputClass} pl-10`}
              />
            </div>

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* RECURRING TRANSACTION */}
      {/* ================================================= */}

      <div
        className="
          rounded-2xl
          border

          border-gray-200
          bg-white

          dark:border-[#21406D]
          dark:bg-[#071A33]

          p-5
          sm:p-6

          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg

                bg-blue-50
                text-[#2D7DFF]

                dark:bg-[#0A2447]
              "
            >
              <Repeat size={19} />
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Recurring Transaction
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#AEBBD0]">
                Automatically repeat this transaction.
              </p>
            </div>
          </div>

          <Switch
            checked={isRecurring}
            onCheckedChange={(checked) =>
              setValue("isRecurring", checked)
            }
          />
        </div>

        {/* Recurring Interval */}

        {isRecurring && (
          <div className="mt-5 border-t border-gray-200 pt-5 dark:border-[#21406D]">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Recurring Interval
            </label>

            <Select
              value={getValues("recurringInterval")}
              onValueChange={(value) =>
                setValue("recurringInterval", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>

              <SelectContent
                className="
                  border-gray-200
                  bg-white

                  dark:border-[#21406D]
                  dark:bg-[#0A1830]
                  dark:text-white
                "
              >
                <SelectItem value="DAILY">
                  Daily
                </SelectItem>

                <SelectItem value="WEEKLY">
                  Weekly
                </SelectItem>

                <SelectItem value="MONTHLY">
                  Monthly
                </SelectItem>

                <SelectItem value="YEARLY">
                  Yearly
                </SelectItem>
              </SelectContent>
            </Select>

            {errors.recurringInterval && (
              <p className="mt-2 text-sm text-red-500">
                {errors.recurringInterval.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* ACTION BUTTONS */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3

          sm:flex-row
          sm:justify-end
        "
      >
        <Button
          type="button"
          variant="outline"
          className="
            h-11
            w-full
            rounded-lg

            border-gray-200

            dark:border-[#21406D]
            dark:bg-[#071A33]
            dark:text-white

            hover:bg-gray-50
            dark:hover:bg-[#102B50]

            sm:w-36
          "
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={transactionLoading}
          className="
            h-11
            w-full
            rounded-lg

            bg-[#2D7DFF]
            text-white

            hover:bg-[#1F6FE5]

            shadow-sm
            hover:shadow-lg
            hover:shadow-blue-500/20

            transition-all

            sm:w-48
          "
        >
          {transactionLoading ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
              />

              {editMode
                ? "Updating..."
                : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </Button>
      </div>
    </form>
  );
}