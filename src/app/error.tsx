"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center mt-25">
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        Error: {error.message}
      </h2>
    </div>
  );
}
