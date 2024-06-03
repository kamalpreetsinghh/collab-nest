import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/AppThemeProvider";
import SessionProvider from "@/components/Provider";
import ApolloClientProvider from "@/components/ApolloClientProvider";
import { poppins } from "./fonts";

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
            <ApolloClientProvider>
              <div className="min-h-screen">
                <Navbar />
                <main>{children}</main>
              </div>
              <Footer />
            </ApolloClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
