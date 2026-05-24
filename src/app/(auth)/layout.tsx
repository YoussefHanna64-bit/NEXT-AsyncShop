export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 flex flex-col w-full items-center justify-center min-h-screen bg-gray-900">
      {children}
    </main>
  );
}
