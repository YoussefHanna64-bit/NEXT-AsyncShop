"use server";
import clientPromise from "@/services/mongodb";
import bcrypt from "bcryptjs";

export async function registerUser(data: any) {
  try {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return { error: "All fields are required." };
    }

    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      wishlistIds: [],
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Failed to register. Please try again." };
  }
}
