import fs from "fs";
import yaml from "yaml";
import { Converter } from "showdown";
import showdownHighlight from "showdown-highlight";

export const getSlugFromFilename = (fileName: string) => {
  // fileName is yyyy-mm-dd-slug.md
  const article = fileName.slice(0, fileName.indexOf(".md"));
  const slug = article.slice(11);

  return slug;
};

export const getArticles = (root: "thoughts" | "blog") => {
  const files = fs.readdirSync(`articles/${root}`);
  const allTags = [];
  const articles = files.reverse().map((file) => {
    const slug = getSlugFromFilename(file);
    const content = fs.readFileSync(`articles/${root}/${file}`, "utf8");
    const converter = new Converter({ metadata: true });
    converter.makeHtml(content);
    const metaRaw = converter.getMetadata(true) as string;
    const meta = yaml.parse(metaRaw);
    const tags = Array.isArray(meta.tags) ? meta.tags : [meta.tags];
    tags.forEach((t) => {
      if (!allTags.includes(t)) {
        allTags.push(t);
      }
    });
    return {
      slug,
      type: root,
      title: meta.title,
      layout: meta.layout,
      description: meta.description || "",
      tags,
      date: meta.date,
    };
  });

  // console.log(allTags);

  return articles;
};

export const getArticleSlugs = (root: "thoughts" | "blog") => {
  const files = fs.readdirSync(`articles/${root}`);
  const slugs = files.reverse().map((file) => {
    return { params: { slug: getSlugFromFilename(file) } };
  });

  return {
    paths: slugs,
    fallback: false,
  };
};

export const getArticleSlugsWithLocale = (root: "thoughts" | "blog") => {
  const files = fs.readdirSync(`articles/${root}`);
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
};

export const getArticle = (root: "thoughts" | "blog", slug: string) => {
  const files = fs.readdirSync(`articles/${root}`);
  const [file] = files.reverse().filter((file) => {
    return getSlugFromFilename(file) === slug;
  });

  if (file) {
    const converter = new Converter({
      metadata: true,
      extensions: [
        showdownHighlight({
          // Whether to add the classes to the <pre> tag
          pre: true,
        }),
      ],
    });
    const content = fs.readFileSync(`articles/${root}/${file}`, "utf8");
    const html = converter.makeHtml(content);
    const metaRaw = converter.getMetadata(true) as string;
    const meta = yaml.parse(metaRaw);
    return {
      html,
      type: root,
      meta: {
        slug,
        title: meta.title,
        layout: meta.layout,
        lang: meta.lang,
        description: meta.description || "",
        tags: Array.isArray(meta.tags) ? meta.tags : [meta.tags],
        date: meta.date,
      },
    };
  }

  return null;
};
