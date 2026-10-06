"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";
import useFetch from "@/hooks/use-fetch";
import { CreateAccountDrawer } from "@/components/create-account-drawer";

export function BudgetProgress({ initialBudget, currentExpenses, hasAccounts = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const handleStartEditing = () => {
    if (!hasAccounts) {
      toast.warning("Please create an account first before setting a monthly budget.");
      return;
    }
    setIsEditing(true);
  };

  const handleUpdateBudget = async () => {
    if (!hasAccounts) {
      toast.error("Please create an account first before setting a monthly budget.");
      setIsEditing(false);
      return;
    }

    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">
            Monthly Budget (Default Account)
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32 font-medium"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {!hasAccounts ? (
                    <span className="text-amber-500 flex items-center gap-1.5 text-xs">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Create an account first to set a budget
                    </span>
                  ) : initialBudget ? (
                    `₹${currentExpenses.toFixed(2)} of ₹${initialBudget.amount.toFixed(2)} spent`
                  ) : (
                    "No budget set"
                  )}
                </CardDescription>

                {hasAccounts ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleStartEditing}
                    className="h-6 w-6"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                ) : (
                  <CreateAccountDrawer>
                    <Button variant="outline" size="sm" className="h-7 text-xs ml-2">
                      + Create Account
                    </Button>
                  </CreateAccountDrawer>
                )}
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && hasAccounts && (
          <div className="space-y-2">
            <Progress
              value={percentUsed}
              extraStyles={
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }
            />
            <p className="text-xs text-muted-foreground text-right">
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}