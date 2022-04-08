import React from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/styles/Post.module.css";
import { useTranslation } from "next-i18next";

const formatDate = (dateString: string, locale: "ua" | "en") => {
  return new Date(dateString).toLocaleString(locale === "ua" ? "uk" : "en");
};

export default function ArticleLayout({ article, locale }) {
  const { t: tr } = useTranslation();
  return (
    <>
      <PageLayout>
        <div className={styles.container}>
          {article.meta.lang !== locale && (
            <div
              className={styles.notAvailable}
              dangerouslySetInnerHTML={{
                __html: tr("common.articleNotAvailable"),
              }}
            />
          )}
          <h1>{article.meta.title}</h1>
          <p className={styles.date}>{formatDate(article.meta.date, locale)}</p>
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
          <div
            className={styles.footer}
            dangerouslySetInnerHTML={{ __html: tr("common.articleFooter") }}
          />
        </div>
      </PageLayout>
    </>
  );
}
