import "./styles.css";
import "react18-loaders/dist/index.css";
import { Core } from "nextjs-darkmode";
import { Layout } from "@repo/shared/dist/server";
import { GlobalLoader, Header } from "@repo/shared";
import { Inter } from "next/font/google";
import { MouseTrail } from "react-webgl-trails";

const inter = Inter({ subsets: ["latin"] });

/** Root layout. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Core />
        <Layout>
          <Header />
          {children}
        </Layout>
        <GlobalLoader />
        <MouseTrail />
      </body>
    </html>
  );
}
