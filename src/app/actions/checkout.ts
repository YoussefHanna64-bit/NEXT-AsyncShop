"use server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/services/mongodb";
import { authConfig } from "@/services/auth";

export async function placeOrder(shippingDetails: any, cartItems: any[]) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user?.email) {
      return { error: "You must be logged in to checkout." };
    }

    const client = await clientPromise;
    const db = client.db();

    const orderTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const newOrder = {
      userEmail: session.user.email,
      shippingDetails,
      items: cartItems,
      totalAmount: orderTotal,
      status: "Processing",
      createdAt: new Date(),
    };

    await db.collection("orders").insertOne(newOrder);

    return { success: true };
  } catch (error) {
    console.error("Checkout Error:", error);
    return { error: "Failed to process checkout. Please try again." };
  }
}
