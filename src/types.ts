export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
  socials: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface TocItem {
  id: string;
  title: string;
  level: number; // 2 for H2, 3 for H3
}

export interface PostSection {
  id: string;
  title: string;
  content: string[]; // paragraphs
  quote?: string;
  subsections?: {
    id: string;
    title: string;
    content: string[];
  }[];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverImage: string;
  coverImageCaption?: string;
  category: string;
  tags: string[];
  date: string; // YYYY-MM-DD
  formattedDate: string;
  readTime: string;
  featured?: boolean;
  author: Author;
  sections: PostSection[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  count: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  avatarInitials: string;
  date: string;
  content: string;
  likes: number;
}
