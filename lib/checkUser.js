import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    // 1. Check if user already exists by Clerk User ID
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // 2. Fallback check by email to prevent duplicate key crashes
    const userEmail = user.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) return null;

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    // Handle safely without creating "null" strings
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

    if (existingUserByEmail) {
      // Update the existing user with the new Clerk ID
      return await db.user.update({
        where: { email: userEmail },
        data: {
          clerkUserId: user.id,
          name: name || existingUserByEmail.name,
          imageUrl: user.imageUrl,
        },
      });
    }

    // 3. Create brand new user
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: userEmail,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Prisma user creation error:", error);
    throw error;
  }
};