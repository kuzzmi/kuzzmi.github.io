import React from "react";
import { GetStaticPropsContext } from "next";
import fs from "fs";
import { getI18nProps } from "../../../lib/getStatic";
import { getArticle, getSlugFromFilename } from "../../../lib/articles";
import ArticleLayout from "@/components/ArticleLayout";

export default function Post({ post }) {
  return <ArticleLayout article={post} />;
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const slug = ctx.params.slug as string;
  const post = getArticle("blog", slug);
  const i18nProps = await getI18nProps(ctx);

  return {
    props: {
      post,
      ...i18nProps,
    },
  };
}

export function getStaticPaths() {
  const files = fs.readdirSync("articles/blog");
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
