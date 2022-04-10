import React from "react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, getI18nProps } from "@/lib/getStatic";
import PageLayout from "@/components/PageLayout";
import ArticleListItem from "@/components/ArticleListItem";
import styles from "@/styles/Home.module.css";
import { getArticles } from "@/lib/articles";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export default function Blog({ articles }) {
  const { t: tr } = useTranslation();
  const router = useRouter();
  return (
    <>
      <NextSeo
        title={`${tr("menu.blog")} | ${tr("common.name")}`}
        description={tr("blog.description")}
        canonical={`https://kuzzmi.com${router.asPath}`}
        openGraph={{
          site_name: tr("common.name"),
          title: tr("menu.blog"),
          description: tr("blog.description"),
          url: `https://kuzzmi.com${router.asPath}`,
        }}
        twitter={{
          handle: "@kuzzmi",
          cardType: "summary_large_image",
        }}
      />

      <PageLayout>
        <div className={styles.summary}>
          <h1 className={styles.title}>{tr("menu.blog")}</h1>
          <br />
          <p>{tr("blog.description")}</p>
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
  const posts = getArticles("blog");
  const i18nProps = await getI18nProps(ctx);
  return {
    props: {
      articles: posts,
      ...i18nProps,
    },
  };
}

export { getStaticPaths };
