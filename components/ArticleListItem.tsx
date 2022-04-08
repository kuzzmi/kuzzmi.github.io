import { useTranslation } from "next-i18next";
import Link from "./Link";
import styles from "../styles/Home.module.css";

const ArticleListItem = ({
  article: { type, slug, title, tags, description },
}) => {
  const { t: tr } = useTranslation();

  return (
    <div className={styles.post}>
      <Link href={`/${type}/${slug}`}>
        <a className={styles.postTitle}>
          <h2>{title}</h2>
        </a>
      </Link>
      <p>
        {tags.map((t: string) => (
          <Link href={`/${type}/${slug}`} key={t}>
            <a className={styles.tag}>
              <small>
                <i>{tr(`tags.${t}`, t)}</i>
              </small>
            </a>
          </Link>
        ))}
      </p>
      <p className={styles.description}>
        <small>{description}</small>
      </p>
      <Link href={`/${type}/${slug}`}>
        <a>
          <small>{tr("home.read")} →</small>
        </a>
      </Link>
    </div>
  );
};

export default ArticleListItem;
