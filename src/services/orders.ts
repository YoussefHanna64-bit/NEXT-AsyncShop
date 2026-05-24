import { getServerSession } from "next-auth/next";
import { authConfig } from "./auth";
import clientPromise from "./mongodb";
import { Order } from "@/types/Order";

export async function getUserOrders(): Promise<Order[]> {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return [];
  }

  const client = await clientPromise;
  const db = client.db();

  const orders = await db
    .collection("orders")
    .find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return orders.map((order) => ({
    ...(order as any),
    _id: order._id.toString(),
  })) as Order[];
}
