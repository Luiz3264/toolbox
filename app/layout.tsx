import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "toolbox",
  description: "a collection of tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root" className="main">
          {children}
        </div>
      </body>
    </html>
  );
}
