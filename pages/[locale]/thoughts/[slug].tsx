import React from "react";
import { GetStaticPropsContext } from "next";
import fs from "fs";
import { getI18nProps } from "../../../lib/getStatic";
import { getArticle, getSlugFromFilename } from "../../../lib/articles";
import PageLayout from "../../../components/PageLayout";
import styles from "../../../styles/Post.module.css";

export default function Post({ post }) {
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1>{post.meta.title}</h1>
        <p className={styles.date}>{post.meta.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </PageLayout>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const slug = ctx.params.slug as string;
  const post = getArticle("thoughts", slug);
  const i18nProps = await getI18nProps(ctx);

  return {
    props: {
      post,
      ...i18nProps,
    },
  };
}

export function getStaticPaths() {
  const files = fs.readdirSync("articles/thoughts");
  const slugs = files.reverse().map((file) => {
    return getSlugFromFilename(file);
  });
  const localePaths = ["en", "ua"]
    .map((locale) => {
      return slugs.map((slug) => ({
        params: {
          locale,
          slug,
        },
      }));
    })
    .flat();

  return {
    paths: localePaths,
    fallback: false,
  };
}
