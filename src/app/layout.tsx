import Header from "@/components/Header";
import "./globals.css";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "AsyncShop",
  description: "An e-commerce app",
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className + " min-h-screen flex flex-col relative text-white"}>
        <Header />
        <main className="flex-1 flex flex-col w-full">{children}</main>
      </body>
    </html>
  );
}
