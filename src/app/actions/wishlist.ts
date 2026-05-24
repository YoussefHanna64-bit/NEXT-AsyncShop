"use server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/services/mongodb";
import { authConfig } from "@/services/auth";
import { revalidatePath } from "next/cache";

export async function toggleWishlistItem(productId: number) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user?.email) {
      return { error: "You must be logged in to modify your wishlist." };
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<User>("users");

    await usersCollection.updateOne(
      { email: session.user.email },
      {
        $setOnInsert: {
          email: session.user.email,
          wishlistIds: [],
        },
      },
      { upsert: true },
    );

    const user = await usersCollection.findOne({ email: session.user.email });
    if (!user) {
      return { error: "User not found." };
    }

    const currentWishlist = user.wishlistIds || [];
    const isWished = currentWishlist.includes(productId);

    if (isWished) {
      await usersCollection.updateOne(
        { email: session.user.email },
        { $pull: { wishlistIds: productId } },
      );
    } else {
      await usersCollection.updateOne(
        { email: session.user.email },
        { $addToSet: { wishlistIds: productId } },
      );
    }

    revalidatePath("/products");

    return { success: true, isWished: !isWished };
  } catch (error) {
    console.error("Wishlist Action Error:", error);
    return { error: "Internal Server Error" };
  }
}
