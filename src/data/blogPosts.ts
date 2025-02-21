export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js 14',
    excerpt:
      'Learn how to build modern web applications with Next.js 14 and its powerful features.',
    content: `
      # Getting Started with Next.js 14

      Next.js 14 brings revolutionary features to the web development ecosystem. In this comprehensive guide, we'll explore:

      ## Key Features
      - App Router
      - Server Components
      - Improved Caching
      - Streaming and Suspense
      
      ## Why Next.js 14?
      Next.js 14 represents a significant leap forward in web development, offering improved performance, better developer experience, and enhanced SEO capabilities.

      ## Getting Started
      To begin with Next.js 14, you'll need to set up your development environment...
    `,
    date: 'March 15, 2024',
    imageUrl: '/img/blog_images/Blog-Post_Visuals-1.png',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Mastering TypeScript',
    excerpt:
      'Deep dive into TypeScript features that will make your code more robust and maintainable.',
    content: `
      # Mastering TypeScript

      TypeScript has become an essential tool for modern web development. Let's explore its powerful features:

      ## Type System
      TypeScript's type system is both powerful and flexible...

      ## Advanced Features
      - Generics
      - Utility Types
      - Decorators
      
      ## Best Practices
      Learn how to structure your TypeScript projects for maximum effectiveness...
    `,
    date: 'March 10, 2024',
    imageUrl: '/img/blog_images/typescript.webp',
    category: 'Programming',
  },
  {
    id: 3,
    title: 'Responsive Design Best Practices',
    excerpt:
      'Essential tips and techniques for creating truly responsive web designs.',
    content: `
      # Responsive Design Best Practices

      Creating truly responsive websites requires careful planning and execution.

      ## Core Principles
      - Mobile-First Approach
      - Fluid Grids
      - Flexible Images
      
      ## Media Queries
      Understanding how to effectively use media queries...

      ## Performance Considerations
      Optimizing responsive designs for maximum performance...
    `,
    date: 'March 5, 2024',
    imageUrl: '/img/blog_images/7475498.jpg',
    category: 'Design',
  },
];
