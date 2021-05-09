import fs from "fs";
import path from "path";
// @ts-ignore
import glob from "glob";
// @ts-ignore
import frontmatter from "frontmatter";

type PageMetaKey = 'title' | 'description' | 'image' | 'imageAlt' | 'categories';

const name = (filename: string) =>
  path.basename(filename, path.extname(filename));

const pageMeta = (key: PageMetaKey, filename: string): string | null => {
  const content = fs.readFileSync(filename, "utf8");
  const { data } = frontmatter(content);
  return data[key] ?? null;
}

export type File = {
  url: string;
  title: string | null;
  description: string | null;
  filename: string;
  date: number | null;
  image: string | null;
  imageAlt: string | null;
  categories: string | null;
};

const pages: File[] = (glob.sync(
  path.join(__dirname, "../pages/*.mdx")
) as string[]).map(
  (filename): File => ({
    url: name(filename),
    title: pageMeta('title', filename),
    description: pageMeta('description', filename),
    filename,
    date: null,
    image: pageMeta('image', filename),
    imageAlt: pageMeta('imageAlt', filename),
    categories: pageMeta('categories', filename),
  })
);

const posts: File[] = (glob.sync(
  path.join(__dirname, "../posts/*.mdx")
) as string[])
  .map(
    (filename): File => ({
      url: name(filename).replace(
        /^(\d{4})-(\d{2})-(\d{2})-(.*)$/,
        "articles/$4"
      ),
      title: pageMeta('title', filename),
      description: pageMeta('description', filename),
      filename,
      image: pageMeta('image', filename),
      imageAlt: pageMeta('imageAlt', filename),
      date: Date.parse(filename.match(/(\d{4}-\d{2}-\d{2})/)![1]),
      categories: pageMeta('categories', filename),
    })
  )
  .sort((a, b) => (b.date ?? 0) - (a.date ?? 0));

export const getPages = () => pages;
export const getPosts = () => posts;
