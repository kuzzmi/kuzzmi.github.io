import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  skipLocaleHandling?: boolean;
  href: string;
  locale?: string;
}

const LinkComponent: React.FC<Props> = ({
  children,
  skipLocaleHandling,
  ...rest
}) => {
  const router = useRouter();
  const locale = rest.locale || (router.query.locale as string) || "";

  let href = rest.href || router.asPath;
  if (href.indexOf("http") === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace("[locale]", locale);
  }

  return <Link href={href}>{children}</Link>;
};

export default LinkComponent;
