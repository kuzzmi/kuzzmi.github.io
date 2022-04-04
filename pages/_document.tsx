import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class FundofDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="dns-prefetch" href="https://www.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;500;600&display=swap"
            rel="stylesheet"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <style type="text/css" media="all">
            {"* { box-sizing: border-box; }"}
          </style>
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
