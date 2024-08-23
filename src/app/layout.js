import { Inter } from "next/font/google";
import "./globals.css";
import { WixClientProvider } from "@/context/wixContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fire Cutter | Men's Shop",
  description: "Export Men's Collections",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WixClientProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </WixClientProvider>
      </body>
    </html>
  );
}
