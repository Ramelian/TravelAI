import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Travel Guide",
  description: "A travel guide powered by AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html>
        <Providers>
          <body className={inter.className}>{children}</body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
