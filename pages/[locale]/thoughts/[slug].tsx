import React from "react";
import { NextSeo } from "next-seo";
import { GetStaticPropsContext } from "next";
import fs from "fs";
import { getI18nProps } from "../../../lib/getStatic";
import { getArticle, getSlugFromFilename } from "../../../lib/articles";
import ArticleLayout from "@/components/ArticleLayout";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { generateMainImage } from "@/lib/thumbnails";

export default function Post({ post }) {
  const { t: tr, i18n } = useTranslation();
  const router = useRouter();
  return (
    <>
      <NextSeo
        title={`${post.meta.title} | ${tr("menu.blog")} | ${tr("common.name")}`}
        description={post.description}
        canonical={`https://kuzzmi.com${router.asPath}`}
        openGraph={{
          site_name: tr("common.name"),
          title: post.meta.title,
          description: post.meta.description,
          url: `https://kuzzmi.com${router.asPath}`,
          type: "article",
          article: {
            publishedTime: post.meta.date,
            authors: ["https://kuzzmi.com/about"],
            tags: post.meta.tags,
          },
          images: [
            {
              url: `https://kuzzmi.com/assets/articles/thoughts/${post.meta.slug}/cover.png`,
              width: 1342,
              height: 853,
              alt: post.meta.title,
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@kuzzmi",
          cardType: "summary_large_image",
        }}
      />
      <ArticleLayout article={post} locale={i18n.language} />
    </>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const slug = ctx.params.slug as string;
  const post = getArticle("thoughts", slug);
  const i18nProps = await getI18nProps(ctx);

  generateMainImage(
    `public/assets/articles/thoughts/${slug}`,
    "cover",
    ["#7f7fd5", "#86a8e7", "#91eae4"],
    post.meta.title,
    "Роздуми",
    "🤔"
  );

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
