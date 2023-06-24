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
    <html lang="en">
      <body>
        Navbar
        <main>{children}</main>
        Footer
      </body>
    </html>
  );
}
