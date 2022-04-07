import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "../../components/Link";
import { useTranslation } from "next-i18next";
import { getStaticPaths, getI18nProps } from "../../lib/getStatic";
// import Image from "next/image";
import PageLayout from "../../components/PageLayout";
import ArticleListItem from "../../components/ArticleListItem";
import styles from "../../styles/Home.module.css";
import { getArticles } from "../../lib/articles";

export default function Home(props) {
  const { t: tr, i18n } = useTranslation();

  const lang = i18n.language;

  const articlesType = lang === "ua" ? "blog" : "thoughts";
  const posts = props[articlesType];

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="Kuzmenko, Igor Kuzmenko, Ігор Кузьменко, Игорь Кузьменко, kuzzmi, JavaScript, frontend"
        />
      </Head>
      <NextSeo
        title={tr("common.name")}
        description={tr("home.meta.description")}
        canonical="https://kuzzmi.com"
        openGraph={{
          title: tr("common.name"),
          description: tr("home.meta.description"),
          url: `https://kuzzmi.com`,
          // TODO: add generated images here
          images: [],
        }}
        twitter={{
          handle: "@kuzzmi",
          cardType: "summary_large_image",
        }}
      />

      <PageLayout>
        <div className={styles.summary}>
          <h1 className={styles.title}>{tr("common.name")}</h1>
          <p className={styles.subtitle}>{tr("home.bio")}</p>

          <p>
            {tr("home.description.part_1")}
            <Link href="/thoughts">{tr("home.description.part_2")}</Link>
            {tr("home.description.part_3")}
            <Link href="/blog">{tr("home.description.part_4")}</Link>
            {tr("home.description.part_5")}
            <a href="https://fundof.me">Fundof</a>.
          </p>
        </div>

        <div className={styles.recents}>
          <h6>{tr("home.recents")}:</h6>
          {posts.map((p) => (
            <ArticleListItem key={p.slug} article={p} />
          ))}
        </div>
      </PageLayout>
    </>
  );
}

export async function getStaticProps(ctx) {
  const thoughts = getArticles("thoughts");
  const blog = getArticles("blog");
  const i18nProps = await getI18nProps(ctx);
  return {
    props: {
      blog,
      thoughts,
      ...i18nProps,
    },
  };
}

export { getStaticPaths };
