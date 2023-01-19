import "../styles/globals.css";
import ProvidersWrapper from "./ProvidersWrapper";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <ProvidersWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
