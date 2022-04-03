import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs";
import { Converter, Metadata } from "showdown";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        {posts.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`}>
            <a>
              {p.type === "post" ? "📝" : "🎙️"}
              {p.title}
            </a>
          </Link>
        ))}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export function getStaticProps() {
  const files = fs.readdirSync("posts");
  const posts = files.map((file) => {
    const post = file.slice(0, file.indexOf(".md"));
    const slug = post.slice(4);
    const content = fs.readFileSync(`posts/${post}.md`, "utf8");
    const converter = new Converter({ metadata: true });
    converter.makeHtml(content);
    const meta = converter.getMetadata() as Metadata;
    return {
      slug,
      title: meta.title,
      type: meta.type,
      date: meta.date,
    };
  });
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
}
