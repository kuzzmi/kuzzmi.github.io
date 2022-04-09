import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { getI18nProps, getStaticPaths } from "../../lib/getStatic";
// import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const { t: tr } = useTranslation();

  const [first, last] = tr("common.name").split(" ");

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="Kuzmenko, Igor Kuzmenko, Ігор Кузьменко, Игорь Кузьменко, kuzzmi, JavaScript, frontend"
        />
      </Head>
      <NextSeo
        title={`${tr("menu.about")} | ${tr("common.name")}`}
        description={tr("home.meta.description")}
        canonical="https://kuzzmi.com/about"
        openGraph={{
          type: "profile",
          title: tr("common.name"),
          description: tr("home.meta.description"),
          url: "https://kuzzmi.com/about",
          profile: {
            firstName: first,
            lastName: last,
            username: "kuzzmi",
            gender: "male",
          },
        }}
        twitter={{
          handle: "@kuzzmi",
          cardType: "summary_large_image",
        }}
      />

      <PageLayout>
        <h1 className={styles.title}>{tr("menu.about")}</h1>

        <img
          className={styles.photo}
          src="https://avatars.githubusercontent.com/u/1727140?v=4"
          width="250"
          height="250"
        />

        <p
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: tr("about.body") }}
        />
      </PageLayout>
    </>
  );
}

export async function getStaticProps(ctx) {
  const i18nProps = await getI18nProps(ctx);
  return {
    props: {
      ...i18nProps,
    },
  };
}

export { getStaticPaths };
