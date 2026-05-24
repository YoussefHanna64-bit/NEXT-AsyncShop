import { getServerSession } from "next-auth/next";
import { authConfig } from "@/services/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import EditProfileForm from "@/components/EditProfileForm";
import { getCurrentUserWishlistIds } from "@/services/wishlist";
import { getProductById } from "@/services/productsAPI";
import ProductCard from "@/components/ProductCard";
import clientPromise from "@/services/mongodb";

export const metadata = {
  title: "Your Profile | AsyncShop",
};

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);
  if (!session || !session.user?.email) {
    redirect("/login?callbackUrl=/profile");
  }

  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: session.user.email });

  if (!user) {
    redirect("/login?callbackUrl=/profile");
  }

  const wishlistIds = await getCurrentUserWishlistIds();

  const wishlistProducts = await Promise.all(
    wishlistIds.map((id) => getProductById(id)),
  );

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 mt-5 w-full">
      <h1 className="text-4xl font-bold mb-10">My Account</h1>

      <div className="bg-gray-800/40 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
        {user.image ? (
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 flex-shrink-0">
            <Image
              src={user.image}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl border-4 border-gray-600 flex-shrink-0">
            {user.name?.charAt(0) || "U"}
          </div>
        )}

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {user.name || session.user.name}
            </h2>
            <p className="text-gray-400">{user.email}</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4 border-t border-gray-700/50">
            <div className="bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800">
              <span className="text-sm text-gray-400 block mb-1">
                Items in Wishlist
              </span>
              <span className="text-xl font-bold text-teal-400">
                {wishlistIds.length}
              </span>
            </div>
            <div className="bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800">
              <span className="text-sm text-gray-400 block mb-1">
                Total Orders
              </span>
              <span className="text-xl font-bold text-teal-400">0</span>
            </div>
          </div>
        </div>

        <EditProfileForm userName={user.name || ""} />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 border-b border-gray-800 pb-4">
          Your Wishlist
        </h2>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/20 border border-gray-800 rounded-2xl">
            <p className="text-gray-400 text-lg">
              You haven't saved any items yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                initialIsWished={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
