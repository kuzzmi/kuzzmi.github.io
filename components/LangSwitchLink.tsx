import React from "react";
import languageDetector from "../lib/languageDetector";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  locale: "ua" | "en";
  href?: string;
  className?: string;
}

const LanguageSwitchLink: React.FC<Props> = ({ locale, ...rest }) => {
  const router = useRouter();

  let href = rest.href || router.asPath;
  let pName = router.pathname;
  Object.keys(router.query).forEach((k) => {
    if (k === "locale") {
      pName = pName.replace(`[${k}]`, locale);
      return;
    }
    pName = pName.replace(`[${k}]`, router.query[k] as string);
  });
  if (locale) {
    href = rest.href ? `/${locale}${rest.href}` : pName;
  }

  return (
    <Link href={href}>
      <a
        className={rest.className}
        onClick={() => languageDetector.cache(locale)}
      >
        {locale === "ua" ? "🇺🇦" : "🇬🇧"}
      </a>
    </Link>
  );
};

export default LanguageSwitchLink;
