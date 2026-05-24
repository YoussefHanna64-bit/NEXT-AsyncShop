import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/services/mongodb";
import { authConfig } from "@/services/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to modify your wishlist." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("asyncshop");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
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

    return NextResponse.json({
      success: true,
      message: isWished ? "Removed from wishlist" : "Added to wishlist",
      isWished: !isWished,
    });
  } catch (error) {
    console.error("Wishlist API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
