"use server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/services/mongodb";
import { authConfig } from "@/services/auth";
import { revalidatePath } from "next/cache";

export async function updateProfileName(newName: string) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user?.email) {
      return { error: "You must be logged in to update your profile." };
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    await usersCollection.updateOne(
      { email: session.user.email },
      { $set: { name: newName } },
    );

    revalidatePath("/profile");

    return { success: true };
  } catch (error) {
    console.error("Profile Update Error:", error);
    return { error: "Internal Server Error" };
  }
}
