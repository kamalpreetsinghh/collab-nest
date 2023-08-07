import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/AppThemeProvider";
import SessionProvider from "@/components/Provider";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "300", subsets: ["latin"] });

export const metadata = {
  title: "Flexibbble",
  description: "Showcase your amazing projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider>
          <SessionProvider>
            <div className="min-h-screen">
              <Navbar />
              <main>{children}</main>
            </div>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
