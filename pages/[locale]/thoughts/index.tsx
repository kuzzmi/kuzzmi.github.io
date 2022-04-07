import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { getStaticPaths, getI18nProps } from "@/lib/getStatic";
// import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import ArticleListItem from "@/components/ArticleListItem";
import styles from "@/styles/Home.module.css";
import { getArticles } from "@/lib/articles";

export default function Blog({ articles }) {
  const { t: tr } = useTranslation();

  return (
    <>
      <Head>
        <title>
          {tr("menu.thoughts")} | {tr("common.name")}
        </title>
      </Head>

      <PageLayout>
        <div className={styles.summary}>
          <h1 className={styles.title}>{tr("menu.thoughts")}</h1>
          <br />
          <p>{tr("thoughts.description")}</p>
        </div>

        <div className={styles.recents}>
          <h6>{tr("home.recents")}:</h6>
          {articles.map((p) => (
            <ArticleListItem key={p.slug} article={p} />
          ))}
        </div>
      </PageLayout>
    </>
  );
}

export async function getStaticProps(ctx) {
  const posts = getArticles("thoughts");
  const i18nProps = await getI18nProps(ctx);
  return {
    props: {
      articles: posts,
      ...i18nProps,
    },
  };
}

export { getStaticPaths };
