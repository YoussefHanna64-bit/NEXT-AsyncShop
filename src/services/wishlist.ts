import { getServerSession } from "next-auth/next";
import { authConfig } from "./auth";
import clientPromise from "./mongodb";

export async function getCurrentUserWishlistIds() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return [] as number[];
  }

  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection<User>("users");

  const user = await usersCollection.findOne({ email: session.user.email });

  return user?.wishlistIds ?? [];
}