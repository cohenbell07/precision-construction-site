import fs from "fs";
import path from "path";

// Lazy load gray-matter to avoid webpack bundling issues
function parseFrontmatter(content: string): { data: any; content: string } {
  try {
    // Use dynamic require to avoid webpack issues
    const matter = require("gray-matter");
    // Configure gray-matter to use yaml.load instead of safeLoad (for js-yaml 4+)
    const yaml = require("js-yaml");
    return matter(content, {
      engines: {
        yaml: {
          parse: (str: string) => yaml.load(str),
          stringify: (obj: any) => yaml.dump(obj),
        },
      },
    });
  } catch (error) {
    // Fallback parser if gray-matter fails
    console.warn("gray-matter failed, using fallback parser:", error);
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    if (match) {
      const data: any = {};
      const frontmatter = match[1];
      frontmatter.split('\n').forEach((line: string) => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
          if (key) {
            data[key] = value;
          }
        }
      });
      return { data, content: match[2] };
    }
    return { data: {}, content };
  }
}

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
          const { data, content } = parseFrontmatter(fileContents);

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
    const { data, content } = parseFrontmatter(fileContents);

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

