"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

// ======================================================
// GEMINI AI
// ======================================================

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// ======================================================
// HELPER: SERIALIZE PRISMA DECIMAL
// ======================================================

const serializeAmount = (obj) => ({
  ...obj,
  amount:
    obj.amount && typeof obj.amount.toNumber === "function"
      ? obj.amount.toNumber()
      : Number(obj.amount),
});

// ======================================================
// CREATE TRANSACTION
// ======================================================

export async function createTransaction(data) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // ------------------------------------------
    // ArcJet rate limiting
    // ------------------------------------------

    const req = await request();

    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new Error(
          "Too many requests. Please try again later."
        );
      }

      throw new Error("Request blocked");
    }

    // ------------------------------------------
    // Find user
    // ------------------------------------------

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // ------------------------------------------
    // Find account
    // ------------------------------------------

    const account = await db.account.findUnique({
      where: {
        id: data.accountId,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    // ------------------------------------------
    // Calculate balance
    // ------------------------------------------

    const amount = Number(data.amount);

    const balanceChange =
      data.type === "EXPENSE"
        ? -amount
        : amount;

    const newBalance =
      account.balance.toNumber() + balanceChange;

    // ------------------------------------------
    // Create transaction
    // ------------------------------------------

    const transaction = await db.$transaction(
      async (tx) => {
        const newTransaction =
          await tx.transaction.create({
            data: {
              ...data,
              amount,
              userId: user.id,

              nextRecurringDate:
                data.isRecurring &&
                data.recurringInterval
                  ? calculateNextRecurringDate(
                      data.date,
                      data.recurringInterval
                    )
                  : null,
            },
          });

        await tx.account.update({
          where: {
            id: data.accountId,
          },

          data: {
            balance: newBalance,
          },
        });

        return newTransaction;
      }
    );

    revalidatePath("/dashboard");
    revalidatePath(
      `/account/${transaction.accountId}`
    );

    return {
      success: true,
      data: serializeAmount(transaction),
    };
  } catch (error) {
    console.error(
      "Create transaction error:",
      error
    );

    throw new Error(
      error?.message ||
        "Failed to create transaction"
    );
  }
}

// ======================================================
// GET TRANSACTION
// ======================================================

export async function getTransaction(id) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const transaction =
    await db.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return serializeAmount(transaction);
}

// ======================================================
// UPDATE TRANSACTION
// ======================================================

export async function updateTransaction(id, data) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // ------------------------------------------
    // Get original transaction
    // ------------------------------------------

    const originalTransaction =
      await db.transaction.findUnique({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!originalTransaction) {
      throw new Error(
        "Transaction not found"
      );
    }

    // ------------------------------------------
    // Prevent account changing bug
    // ------------------------------------------

    const oldAccountId =
      originalTransaction.accountId;

    const newAccountId =
      data.accountId;

    const oldAmount =
      originalTransaction.amount.toNumber();

    const newAmount =
      Number(data.amount);

    const oldBalanceChange =
      originalTransaction.type === "EXPENSE"
        ? -oldAmount
        : oldAmount;

    const newBalanceChange =
      data.type === "EXPENSE"
        ? -newAmount
        : newAmount;

    // ------------------------------------------
    // Update transaction + accounts
    // ------------------------------------------

    const transaction =
      await db.$transaction(
        async (tx) => {
          // Update transaction
          const updated =
            await tx.transaction.update({
              where: {
                id,
                userId: user.id,
              },

              data: {
                ...data,
                amount: newAmount,

                nextRecurringDate:
                  data.isRecurring &&
                  data.recurringInterval
                    ? calculateNextRecurringDate(
                        data.date,
                        data.recurringInterval
                      )
                    : null,
              },
            });

          // ------------------------------------
          // Same account
          // ------------------------------------

          if (
            oldAccountId === newAccountId
          ) {
            const netBalanceChange =
              newBalanceChange -
              oldBalanceChange;

            await tx.account.update({
              where: {
                id: oldAccountId,
              },

              data: {
                balance: {
                  increment:
                    netBalanceChange,
                },
              },
            });
          }

          // ------------------------------------
          // Account changed
          // ------------------------------------

          else {
            // Reverse old transaction
            await tx.account.update({
              where: {
                id: oldAccountId,
              },

              data: {
                balance: {
                  increment:
                    -oldBalanceChange,
                },
              },
            });

            // Apply transaction to new account
            await tx.account.update({
              where: {
                id: newAccountId,
              },

              data: {
                balance: {
                  increment:
                    newBalanceChange,
                },
              },
            });
          }

          return updated;
        }
      );

    revalidatePath("/dashboard");

    revalidatePath(
      `/account/${oldAccountId}`
    );

    revalidatePath(
      `/account/${newAccountId}`
    );

    return {
      success: true,
      data: serializeAmount(transaction),
    };
  } catch (error) {
    console.error(
      "Update transaction error:",
      error
    );

    throw new Error(
      error?.message ||
        "Failed to update transaction"
    );
  }
}

// ======================================================
// GET USER TRANSACTIONS
// ======================================================

export async function getUserTransactions(
  query = {}
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const transactions =
      await db.transaction.findMany({
        where: {
          userId: user.id,
          ...query,
        },

        include: {
          account: true,
        },

        orderBy: {
          date: "desc",
        },
      });

    return {
      success: true,
      data: transactions,
    };
  } catch (error) {
    console.error(
      "Get transactions error:",
      error
    );

    throw new Error(
      error?.message ||
        "Failed to get transactions"
    );
  }
}

// ======================================================
// SCAN RECEIPT WITH GEMINI AI
// ======================================================

export async function scanReceipt(file) {
  try {
    // ------------------------------------------
    // Check API key
    // ------------------------------------------

    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "Gemini API key is not configured. Add GEMINI_API_KEY to your .env file."
      );
    }

    // ------------------------------------------
    // Validate file
    // ------------------------------------------

    if (!file) {
      throw new Error(
        "No receipt image was uploaded."
      );
    }

    if (
      !file.type ||
      !file.type.startsWith("image/")
    ) {
      throw new Error(
        "Please upload a valid image receipt."
      );
    }

    // Maximum 5 MB
    if (
      file.size >
      5 * 1024 * 1024
    ) {
      throw new Error(
        "Receipt image must be less than 5MB."
      );
    }

    // ------------------------------------------
    // Gemini model
    // ------------------------------------------

    const model =
      genAI.getGenerativeModel({
        model: "gemini-3.6-flash",
      });

    // ------------------------------------------
    // Convert image to Base64
    // ------------------------------------------

    const arrayBuffer =
      await file.arrayBuffer();

    const base64String =
      Buffer.from(
        arrayBuffer
      ).toString("base64");

    // ------------------------------------------
    // Receipt prompt
    // ------------------------------------------

    const prompt = `
You are an AI receipt scanner.

Analyze the uploaded image carefully.

Extract the following information:

1. amount
- The FINAL TOTAL amount paid.
- Return only a number.
- Do not include currency symbols.
- Do not include commas.

2. date
- The transaction date printed on the receipt.
- Return in YYYY-MM-DD format.

3. description
- A short summary of what was purchased.

4. merchantName
- The store, restaurant, company, or merchant name.

5. category
- Choose exactly ONE of these categories:

housing
transportation
groceries
utilities
entertainment
food
shopping
healthcare
education
personal
travel
insurance
gifts
bills
other-expense

IMPORTANT RULES:

- Use the FINAL TOTAL, not subtotal.
- Do not use tax as the amount.
- Do not guess values that cannot be read.
- If the image is not a receipt, return {}.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not add explanations.

Return exactly this structure:

{
  "amount": 850.00,
  "date": "2026-08-03",
  "description": "Restaurant meal",
  "merchantName": "ABC Restaurant",
  "category": "food"
}
`;

    // ------------------------------------------
    // Send image to Gemini
    // ------------------------------------------

    const result =
      await model.generateContent([
        {
          inlineData: {
            data: base64String,
            mimeType: file.type,
          },
        },
        prompt,
      ]);

    // ------------------------------------------
    // Get Gemini response
    // ------------------------------------------

    const response =
      await result.response;

    const text =
      response.text();

    console.log(
      "Gemini receipt response:",
      text
    );

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    // ------------------------------------------
    // Clean JSON response
    // ------------------------------------------

    let cleanedText =
      text.trim();

    // Remove ```json
    cleanedText =
      cleanedText.replace(
        /^```json\s*/i,
        ""
      );

    // Remove ```
    cleanedText =
      cleanedText.replace(
        /^```\s*/i,
        ""
      );

    cleanedText =
      cleanedText.replace(
        /\s*```$/i,
        ""
      );

    cleanedText =
      cleanedText.trim();

    // ------------------------------------------
    // Parse JSON
    // ------------------------------------------

    let data;

    try {
      data =
        JSON.parse(cleanedText);
    } catch (parseError) {
      console.error(
        "Invalid Gemini JSON:",
        cleanedText
      );

      throw new Error(
        "Gemini returned an invalid receipt response."
      );
    }

    // ------------------------------------------
    // Not a receipt
    // ------------------------------------------

    if (
      !data ||
      Object.keys(data).length === 0
    ) {
      throw new Error(
        "The uploaded image does not appear to be a receipt."
      );
    }

    // ------------------------------------------
    // Validate amount
    // ------------------------------------------

    const amount =
      Number(data.amount);

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      throw new Error(
        "Could not detect the receipt amount."
      );
    }

    // ------------------------------------------
    // Validate date
    // ------------------------------------------

    const date =
      new Date(data.date);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      throw new Error(
        "Could not detect the receipt date."
      );
    }

    // ------------------------------------------
    // Allowed categories
    // ------------------------------------------

    const allowedCategories = [
      "housing",
      "transportation",
      "groceries",
      "utilities",
      "entertainment",
      "food",
      "shopping",
      "healthcare",
      "education",
      "personal",
      "travel",
      "insurance",
      "gifts",
      "bills",
      "other-expense",
    ];

    const category =
      allowedCategories.includes(
        data.category
      )
        ? data.category
        : "other-expense";

    // ------------------------------------------
    // Return scanned data
    // ------------------------------------------

    return {
      amount,

      date,

      description:
        data.description ||
        "Receipt purchase",

      category,

      merchantName:
        data.merchantName || "",
    };
  } catch (error) {
    console.error(
      "================================"
    );

    console.error(
      "RECEIPT SCANNING ERROR:"
    );

    console.error(error);

    console.error(
      "================================"
    );

    throw new Error(
      error?.message ||
        "Failed to scan receipt."
    );
  }
}

// ======================================================
// CALCULATE NEXT RECURRING DATE
// ======================================================

function calculateNextRecurringDate(
  startDate,
  interval
) {
  const date =
    new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(
        date.getDate() + 1
      );
      break;

    case "WEEKLY":
      date.setDate(
        date.getDate() + 7
      );
      break;

    case "MONTHLY":
      date.setMonth(
        date.getMonth() + 1
      );
      break;

    case "YEARLY":
      date.setFullYear(
        date.getFullYear() + 1
      );
      break;

    default:
      break;
  }

  return date;
}