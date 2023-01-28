import "../styles/globals.css";
import { Inter as FontSans } from "@next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Toast";
import ProvidersWrapper from "@/components/ProvidersWrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}>
      <head />
      <ProvidersWrapper>
        <body className="min-h-screen">
          {children}
          <Toaster position="bottom-right" />
        </body>
      </ProvidersWrapper>
    </html>
  );
}
