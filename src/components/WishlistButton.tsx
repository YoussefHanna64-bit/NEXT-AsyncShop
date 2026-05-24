"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart, LoaderCircle } from "lucide-react";

interface Props {
  productId: number;
  initialIsWished?: boolean;
  variant?: "icon" | "secondary";
  className?: string;
}

export default function WishlistButton({
  productId,
  initialIsWished = false,
  variant = "icon",
  className = "",
}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isWished, setIsWished] = useState(initialIsWished);
  const [isLoading, setIsLoading] = useState(false);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session) {
      router.push("/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsWished(data.isWished);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to update wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      disabled={isLoading}
      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      className={`inline-flex items-center justify-center gap-2 rounded-full border transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
        variant === "icon"
          ? "h-11 w-11 bg-gray-950/70 text-white backdrop-blur-sm hover:scale-105"
          : "px-6 py-4 text-sm font-semibold"
      } ${
        isWished
          ? "border-teal-400 bg-teal-400/15 text-teal-300"
          : "border-gray-700 bg-gray-800/70 text-gray-200 hover:border-teal-400 hover:text-teal-300"
      } ${className}`}
    >
      {isLoading ? (
        <LoaderCircle className="h-5 w-5 animate-spin" />
      ) : (
        <Heart className="h-5 w-5" fill={isWished ? "currentColor" : "none"} />
      )}
      {variant === "secondary" && <span>Wishlist</span>}
    </button>
  );
}
