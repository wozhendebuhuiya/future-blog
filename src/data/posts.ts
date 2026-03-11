import { Post } from '../types';

// 使用 Post 接口来约束我们的数据，确保每个字段都正确
export const posts: Post[] = [
  {
    id: 1,
    title: '构建未来的 Web 应用：React 19 新特性解析',
    excerpt: '深入探讨 React 19 带来的变革性更新，包括 Server Components、Actions 以及全新的 Hooks。',
    date: '2024-03-15',
    readTime: '5 min',
    category: 'React', // 这里如果写成 'react' (小写) TS 就会报错，这避免了数据不一致
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    content: `
React 19 带来了许多激动人心的新特性，这些特性将彻底改变我们构建 Web 应用的方式。

## Server Components (RSC)

React Server Components 允许我们在服务器端渲染组件，从而减少发送到客户端的 JavaScript 代码量。这意味着更快的首屏加载速度和更好的性能。

### 主要优势

- **减少 Bundle Size**：服务器组件的依赖不会打包到客户端。
- **直接访问后端资源**：可以直接在组件中查询数据库。

\`\`\`jsx
// Server Component 示例
import db from './database';

async function Note({ id }) {
  const note = await db.notes.get(id);
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
\`\`\`

## Actions

Actions 提供了一种处理表单提交和数据变更的全新方式，使得数据流更加清晰和易于管理。

\`\`\`jsx
// Server Action 示例
async function updateName(formData) {
  'use server';
  await db.user.update({ name: formData.get('name') });
}
\`\`\`

## 全新的 Hooks

React 19 引入了一些新的 Hooks，如 \`useOptimistic\` 和 \`useFormStatus\`，帮助我们更好地处理 UI 状态。

> "React 19 不仅仅是一次版本更新，它是 React 生态系统的一次进化。"
    `
  },
  {
    id: 2,
    title: 'Tailwind CSS v4：样式开发的下一次进化',
    excerpt: 'Tailwind CSS v4 带来了更快的构建速度和更强大的功能。本文将带你了解如何迁移以及新版本的高级用法。',
    date: '2024-03-10',
    readTime: '8 min',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop',
    content: `
Tailwind CSS v4 是目前为止最快、最强大的版本。它引入了一个全新的高性能引擎，极大地缩短了构建时间。

## 性能提升

新的引擎是用 Rust 重写的，速度比之前的 JavaScript 版本快了 10 倍以上。

| 版本 | 构建时间 | 内存占用 |
|------|----------|----------|
| v3   | 2.5s     | 120MB    |
| v4   | 0.2s     | 40MB     |

## 零配置

v4 版本几乎不需要配置。你不再需要 \`tailwind.config.js\` 文件，所有的配置都可以通过 CSS 变量来实现。

\`\`\`css
@theme {
  --font-family-sans: 'Inter', sans-serif;
  --color-primary: #3b82f6;
}
\`\`\`

## 更好的 CSS 嵌套支持

现在你可以直接在 CSS 文件中使用嵌套语法，而不需要额外的插件。

\`\`\`css
.card {
  @apply bg-white p-6 rounded-lg shadow;
  
  &:hover {
    @apply shadow-lg;
  }
}
\`\`\`
    `
  },
  {
    id: 3,
    title: 'TypeScript 高级类型体操',
    excerpt: '掌握 TypeScript 的类型系统是编写健壮代码的关键。本文将通过实战案例讲解高级类型技巧。',
    date: '2024-03-05',
    readTime: '12 min',
    category: 'TypeScript',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop',
    content: `
TypeScript 的类型系统非常强大，掌握高级类型技巧可以让你写出更加健壮的代码。

## 条件类型 (Conditional Types)

条件类型允许我们根据类型关系来选择类型。

\`\`\`ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
\`\`\`

## 映射类型 (Mapped Types)

映射类型允许我们遍历一个类型的所有属性，并对它们进行变换。

\`\`\`ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
\`\`\`

## 模板字面量类型

模板字面量类型允许我们基于字符串模式来创建新的类型。

\`\`\`ts
type Color = 'red' | 'blue';
type Quantity = 'light' | 'dark';

type Palette = \`\${Quantity}-\${Color}\`;
// "light-red" | "light-blue" | "dark-red" | "dark-blue"
\`\`\`
    `
  }
];
