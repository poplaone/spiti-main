
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  content?: string;
  tags?: string[];
  type?: "full" | "mini"; // Adding a type to differentiate between full and mini blogs
}
