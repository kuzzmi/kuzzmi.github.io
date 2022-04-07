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
  const articles = files.reverse().map((file) => {
    const slug = getSlugFromFilename(file);
    const content = fs.readFileSync(`articles/${root}/${file}`, "utf8");
    const converter = new Converter({ metadata: true });
    converter.makeHtml(content);
    const metaRaw = converter.getMetadata(true) as string;
    const meta = yaml.parse(metaRaw);
    return {
      slug,
      type: root,
      title: meta.title,
      layout: meta.layout,
      description: meta.description || "",
      tags: Array.isArray(meta.tags) ? meta.tags : [meta.tags],
      date: meta.date,
    };
  });

  return articles;
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
        description: meta.description || "",
        tags: Array.isArray(meta.tags) ? meta.tags : [meta.tags],
        date: meta.date,
      },
    };
  }

  return null;
};
