// 定义分类类型，限制可能的取值，避免拼写错误
export type Category = 'React' | 'Vue' | 'TypeScript' | 'CSS' | 'Next.js' | 'All' | 'JS';

// 定义文章接口，这是我们的数据“蓝图”
export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: Category; // 这里使用了上面定义的Category类型
  image: string;
  content: string;
}

// 定义用于搜索和过滤的上下文状态类型
export interface BlogContextType {
  searchTerm: string;
  selectedCategory: Category;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: Category) => void;
}
