import "./globals.css";

import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import Script from "next/script";

export const metadata = {
  title: "Summarizer - AI Summarization tool for youtube videos",
  description:
    "Summarizer is an AI summarization tool that generates summaries for youtube videos. It uses AI to generate summaries for youtube videos.",
  metadataBase: new URL("https://summarizer.yusyp.dev"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <main className="flex min-h-[90vh] w-full flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "lsbtqzx0wc");`,
          }}
          id="actually-clarity"
        />
      </body>
    </html>
  );
}
