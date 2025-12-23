import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  content: string;
  author: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getBlogPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((name) => name.endsWith(".md") && !name.startsWith("."))
      .map((fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, "");
          const fullPath = path.join(postsDirectory, fileName);
          
          if (!fs.existsSync(fullPath)) {
            return null;
          }

          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          // Ensure all values are strings and serializable
          return {
            slug: String(slug),
            content: String(content || ""),
            title: String(data?.title || slug),
            description: String(data?.description || ""),
            date: String(data?.date || new Date().toISOString()),
            category: String(data?.category || "General"),
            author: String(data?.author || "Precision Construction and Decora"),
          };
        } catch (error) {
          console.error(`Error reading blog post ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null);

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Ensure all values are strings and serializable
    return {
      slug: String(slug),
      content: String(content || ""),
      title: String(data?.title || slug),
      description: String(data?.description || ""),
      date: String(data?.date || new Date().toISOString()),
      category: String(data?.category || "General"),
      author: String(data?.author || "Precision Construction"),
    };
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

export function getBlogCategories(): string[] {
  const posts = getBlogPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

