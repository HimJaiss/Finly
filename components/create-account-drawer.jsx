"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Landmark, Wallet } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAccount } from "@/actions/dashboard";
import useFetch from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";

const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z.string().min(1, "Initial balance is required"),
  isDefault: z.boolean().default(false),
});

export function CreateAccountDrawer({ children }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    loading: createAccountLoading,
    fn: createAccountFn,
    data: newAccount,
    error,
  } = useFetch(createAccount);

  const selectedType = watch("type");

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-white/95 dark:bg-[#071A33]/95 backdrop-blur-xl border-t border-gray-200 dark:border-[#21406D]/60 max-w-2xl mx-auto rounded-t-2xl">
        <DrawerHeader className="text-left border-b border-gray-200/80 dark:border-[#21406D]/40 pb-4">
          <DrawerTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Create New Account
          </DrawerTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Add a new bank account or wallet to manage your finances
          </p>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Account Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
              Account Name
            </label>
            <Input
              placeholder="e.g. Main Checking, Savings, HDFC Bank"
              {...register("name")}
              className="bg-white dark:bg-[#0A1830] border-gray-200 dark:border-[#21406D]"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Account Type Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setValue("type", "CURRENT")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold border transition-all duration-200",
                  selectedType === "CURRENT"
                    ? "bg-blue-500/10 border-blue-500 text-blue-500 shadow-sm"
                    : "border-gray-200 dark:border-[#21406D] text-gray-500 hover:bg-gray-100 dark:hover:bg-[#0A1830]"
                )}
              >
                <Landmark className="h-4 w-4" />
                Current
              </button>

              <button
                type="button"
                onClick={() => setValue("type", "SAVINGS")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold border transition-all duration-200",
                  selectedType === "SAVINGS"
                    ? "bg-purple-500/10 border-purple-500 text-purple-500 shadow-sm"
                    : "border-gray-200 dark:border-[#21406D] text-gray-500 hover:bg-gray-100 dark:hover:bg-[#0A1830]"
                )}
              >
                <Wallet className="h-4 w-4" />
                Savings
              </button>
            </div>
            {errors.type && (
              <p className="text-xs text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Initial Balance Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
              Initial Balance
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                ₹
              </span>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
                className="pl-8 text-base font-semibold bg-white dark:bg-[#0A1830] border-gray-200 dark:border-[#21406D]"
              />
            </div>
            {errors.balance && (
              <p className="text-xs text-red-500">{errors.balance.message}</p>
            )}
          </div>

          {/* Default Account Switch */}
          <div className="flex flex-row items-center justify-between rounded-xl border border-gray-200/80 dark:border-[#21406D]/60 dark:bg-[#0A1830]/50 p-4">
            <div className="space-y-0.5">
              <label className="text-sm font-semibold leading-none text-gray-900 dark:text-gray-100">
                Set as Default Account
              </label>
              <p className="text-xs text-muted-foreground">
                This account will be pre-selected for new transactions
              </p>
            </div>
            <Switch
              checked={watch("isDefault")}
              onCheckedChange={(checked) => setValue("isDefault", checked)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={createAccountLoading}
            >
              {createAccountLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}