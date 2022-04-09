import fs from "fs";
import { useRouter } from "next/router";
import { useRedirect } from "@/lib/redirect";
import { getSlugFromFilename } from "@/lib/articles";

export default function Blog() {
  const router = useRouter();
  return useRedirect(router.asPath);
}

export async function getStaticProps() {
  return { props: {} };
}

export function getStaticPaths() {
  const files = fs.readdirSync("articles/blog");
  const slugs = files.reverse().map((file) => {
    return getSlugFromFilename(file);
  });
  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
