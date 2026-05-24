export const metadata = {
  title: "Categories",
  description: "Categories",
};

export default function Categories() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-3xl font-bold text-white mb-4">
        Select a Category
      </h1>
      <p className="text-gray-400 text-lg">
        Choose a category to view products
      </p>
    </div>
  );
}