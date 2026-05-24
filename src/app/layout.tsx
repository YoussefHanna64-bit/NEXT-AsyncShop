import "./globals.css";
import { Montserrat } from "next/font/google";
import Providers from "../components/Providers";

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
      <body
        className={
          montserrat.className +
          " min-h-screen flex flex-col relative text-white"
        }
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
