const fs = require('fs');
const path = require('path');

// 配置文件路径
const POSTS_FILE_PATH = path.join(__dirname, '../src/data/posts.ts');

// 模拟浏览器的 localStorage
// 注意：这个脚本是在 Node.js 环境下运行的，无法直接访问浏览器的 localStorage
// 所以我们需要用户手动将 localStorage 的内容导出为 JSON 文件，或者复制 JSON 字符串
// 为了简化体验，我们假设用户已经把 localStorage 中的 'blog_posts_local' 的值复制到了一个临时文件中
const TEMP_DATA_PATH = path.join(__dirname, '../temp_local_posts.json');

console.log('正在同步文章数据...');

try {
  // 1. 读取现有的 posts.ts 文件内容
  if (!fs.existsSync(POSTS_FILE_PATH)) {
    console.error('错误：找不到 src/data/posts.ts 文件');
    process.exit(1);
  }

  // 2. 检查是否有临时数据文件
  if (!fs.existsSync(TEMP_DATA_PATH)) {
    console.log('提示：请先将 localStorage 中的 "blog_posts_local" 数据保存为项目根目录下的 "temp_local_posts.json" 文件');
    console.log('你可以使用 Chrome 控制台执行: copy(localStorage.getItem("blog_posts_local")) 然后粘贴到文件中');
    process.exit(0);
  }

  const localPostsData = fs.readFileSync(TEMP_DATA_PATH, 'utf-8');
  let localPosts = [];
  try {
    localPosts = JSON.parse(localPostsData);
  } catch (e) {
    console.error('错误：temp_local_posts.json 格式不正确');
    process.exit(1);
  }

  if (!Array.isArray(localPosts) || localPosts.length === 0) {
    console.log('没有发现新的本地文章数据。');
    process.exit(0);
  }

  // 3. 读取 posts.ts 中的静态数据（通过正则提取，因为直接 require ts 文件比较麻烦）
  // 这里我们采用一种更简单粗暴的方法：直接用 localPosts 覆盖或合并
  // 为了保持代码整洁，我们重新生成整个 posts.ts 文件
  
  // 过滤掉已经在 posts.ts 中的文章（如果 ID 冲突，以 localPosts 为准）
  // 但由于我们的 ID 生成策略是 maxId + 1，所以理论上 localPosts 包含了所有最新的数据（如果我们把所有数据都存本地的话）
  // 不过根据 PostService 的逻辑，getAllPosts 是合并了 static 和 local 的
  // 这里为了实现"数据库"的效果，我们将所有 localPosts 写入 posts.ts
  // 注意：这样会把 posts.ts 变成一个纯静态的数据源，以后 PostService 读取时会再次合并，可能会导致重复
  // 所以，正确的逻辑应该是：把 localPosts 追加到 posts.ts 中，但要避免重复
  
  // 读取原文件内容
  let fileContent = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
  
  // 提取原本的数组内容（假设格式是 export const posts: Post[] = [ ... ];）
  const match = fileContent.match(/export const posts: Post\[\] = \[([\s\S]*)\];/);
  
  if (!match) {
    console.error('错误：无法解析 posts.ts 文件结构');
    process.exit(1);
  }

  // 构建新的文件内容
  // 我们将 localPosts 转换为 TS 格式的字符串
  // 注意：这里需要处理 Category 类型，它在 JSON 中是字符串，在 TS 中也是字符串，所以直接 JSON.stringify 即可
  // 但是要注意去掉 id 重复的项（假设 localPosts 是最新的全量数据的一个子集，或者是新增的数据）
  
  // 更好的策略：
  // 既然用户想要"把 local 存的文章写入 data/posts.ts"，那我们就把 temp_local_posts.json 里的内容
  // 转换成 TS 代码，追加到 posts.ts 的数组中，或者替换整个数组
  
  // 这里我们选择：合并策略
  // 1. 解析出 posts.ts 里的现有文章 ID
  // 由于正则解析 JSON 比较脆弱，我们采用"全量替换"模式，即把 localPosts 当作最新的数据源
  // 但这样会丢失 posts.ts 里原本可能有的、但没在 localPosts 里的文章
  // 所以最稳妥的方式是：手动维护。
  
  // 让我们采用一种"追加模式"：
  // 找出 localPosts 中 ID 大于 posts.ts 中最大 ID 的文章，追加到数组末尾
  
  // 简单的解析方式：查找所有 id: number
  const existingIds = [];
  const idRegex = /id:\s*(\d+)/g;
  let idMatch;
  while ((idMatch = idRegex.exec(match[1])) !== null) {
    existingIds.push(parseInt(idMatch[1]));
  }
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  const newPosts = localPosts.filter(p => p.id > maxId);
  
  if (newPosts.length === 0) {
    console.log('没有发现 ID 更大的新文章。');
    // 检查是否有更新（ID 存在但内容不同）比较复杂，这里暂不处理
    process.exit(0);
  }
  
  console.log(`发现 ${newPosts.length} 篇新文章，正在写入...`);
  
  // 生成新文章的 TS 代码字符串
  const newPostsString = newPosts.map(post => {
    return `
  {
    id: ${post.id},
    title: '${post.title.replace(/'/g, "\\'")}',
    excerpt: '${post.excerpt.replace(/'/g, "\\'")}',
    content: \`${post.content.replace(/`/g, "\\`")}\`,
    date: '${post.date}',
    category: '${post.category}',
    readTime: '${post.readTime}',
    image: '${post.image}'
  }`;
  }).join(',');

  // 插入到数组结束括号前
  const lastBracketIndex = fileContent.lastIndexOf('];');
  const newContent = fileContent.slice(0, lastBracketIndex) + ',' + newPostsString + '\n];';
  
  fs.writeFileSync(POSTS_FILE_PATH, newContent, 'utf-8');
  console.log('同步完成！');
  
  // 删除临时文件
  fs.unlinkSync(TEMP_DATA_PATH);
  console.log('临时文件已删除。');

} catch (error) {
  console.error('发生错误:', error);
  process.exit(1);
}
