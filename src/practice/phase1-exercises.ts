/**
 * 阶段 1 综合练习：计算机基础 + JS 深入
 * 不看自己的代码，手写实现以下功能。
 * 每道题下面有测试用例，运行 `npx ts-node src/practice/phase1-exercises.ts` 验证。
 */


// ============================================================
// 练习 1：实现一个缓存工具（数据结构：Map + 复杂度意识）
// ============================================================
// 要求：用 Map 实现 getCache 和 setCache，支持过期时间（5分钟）
// 过期后自动删除并返回 null
const caCheMap = new Map();
export const getCache = (key: string): { data: any; timestamp: number } | null => {
  const caCheMapData = caCheMap.get(key)
  if (!caCheMapData) return null
  const isExpired = Date.now() - caCheMapData.timestamp > 60 * 5 * 1000
  if (isExpired) {
    // 过期就删除数据返回null
    caCheMap.delete(key)
    return null
  }
  // TODO: 实现
  return caCheMapData;
};

export const setCache = (key: string, data: any): void => {
  // TODO: 实现
  caCheMap.set(key, { data, timestamp: Date.now() })
};

// ============================================================
// 练习 2：this 绑定分析（JS 深入）
// ============================================================
// 不看选项，写出每题的输出和 this 指向

export function thisQuiz(): string[] {
  const results: string[] = [];

  // 2-1
  const obj1 = {
    name: 'A',
    getName() { results.push(this.name); }
  };
  obj1.getName();
  // 2-2
  const obj2 = {
    name: 'B',
    getName: () => { results.push(this?.name ?? 'undefined'); }
  };
  obj2.getName();
  // 2-3
  const obj3 = {
    name: 'C',
    inner: {
      name: 'D',
      getName() { results.push(this.name); }
    }
  };
  obj3.inner.getName();
  return ['A', 'undefined', 'D'];
}

// 最终输出 [A,underfined,D]

// ============================================================
// 练习 3：复杂度分析
// ============================================================
// 写出以下代码的复杂度（O 标记）

export function complexityAnswers(): string[] {
  return [
    // 3-1: const x = arr[0]
    'O(1)',
    // 3-2: arr.find(x => x === 5)
    'O(n)',
    // 3-3: arr.map(x => x * 2).filter(x => x > 10)
    'O(N)',
    // 3-4: new Map(arr.map(x => [x.id, x]))
    'O(n)',
    // 3-5: for循环里嵌套了另一个for循环
    'O(n*n)',
  ];
}

// ============================================================
// 练习 4：事件循环输出（JS 深入 + 操作系统）
// ============================================================
// 写出 console 输出顺序

export function eventLoopOutput(): string[] {
  // 模拟输出，把你的答案按顺序写在数组里
  // 代码：
  // console.log('A');
  // setTimeout(() => console.log('B'), 0);
  // Promise.resolve().then(() => console.log('C'));
  // console.log('D');

  return ['A', 'D', 'C', 'B'];  // TODO: 填正确顺序
}

// ============================================================
// 练习 5：手写 Array.prototype.map（原型链 + 手写能力）
// ============================================================
// 不调用原生 map，自己实现
// console.log(myMap([1, 2, 3], x => x * 2));
//  console.log('正确答案: [2, 4, 6]');
export function myMap<T, U>(arr: T[], fn: (item: T, index: number) => U): U[] {
  const result: any[] = []
  arr.forEach((item, index) => {
    result.push(fn(item, index))
  })
  return result;
}

// ============================================================
// 练习 6：手写递归 —— 数组扁平化（递归 + 算法）
// ============================================================
// 输入：[1, [2, [3, 4]], 5]
// 输出：[1, 2, 3, 4, 5]

export function flatten(arr: any[]): any[] {
  // TODO: 用递归实现
  const result: any[] = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else {
      result.push(item)
    }
  })
  return result
}

// ============================================================
// 练习 7：用 Map 优化查找（复杂度意识 + 数据结构）
// ============================================================
// 当前代码是 O(n²)，用 Map 优化到 O(n)
// 输入：posts 数组 + users 数组
// 输出：每篇帖子带上 authorName

export function mergePostsWithAuthors(
  posts: { id: number; authorId: number }[],
  users: { id: number; name: string }[]
): { id: number; authorId: number; authorName: string }[] {
  const userMap = new Map(users.map(u => [u.id, u]))
  const result = posts.map(post => {
    return {
      ...post,
      authorName: userMap.get(post.authorId)?.name ?? 'unknown'
    }
  })
  return result
}

// ============================================================
// 练习 8：Promise 链（Promise + 异步）
// ============================================================
// 实现：顺序执行三个异步操作，每个操作返回 promis
// fn1 → fn2 → fn3，返回最终结果

export async function sequential(
  fn1: () => Promise<string>,
  fn2: (prev: string) => Promise<string>,
  fn3: (prev: string) => Promise<string>
): Promise<string> {
  // TODO: 实现
  const result1 = await fn1();
  const result2 = await fn2(result1)
  const result3 = await fn3(result2)
  return result3
  
}

// ============================================================
// 测试运行
// ============================================================

function runTests() {
  console.log('=== 练习 1：缓存工具 ===');
  // TODO: 自己写测试用例

  console.log('\n=== 练习 2：this 绑定 ===');
  console.log('你的答案:', thisQuiz());
  console.log('正确答案: [A, undefined, D]');

  console.log('\n=== 练习 4：事件循环 ===');
  console.log('你的答案:', eventLoopOutput());
  console.log('正确答案: [A, D, C, B]');

  console.log('\n=== 练习 5：myMap ===');
  console.log(myMap([1, 2, 3], x => x * 2));
  console.log('正确答案: [2, 4, 6]');

  console.log('\n=== 练习 6：flatten ===');
  console.log(flatten([1, [2, [3, 4]], 5]));
  console.log('正确答案: [1, 2, 3, 4, 5]');

  console.log('\n=== 练习 7：Map 优化 ===');
  console.log(mergePostsWithAuthors(
    [{ id: 1, authorId: 7 }],
    [{ id: 7, name: '张三' }]
  ));
  console.log('正确答案: [{ id: 1, authorId: 7, authorName: "张三" }]');
}

runTests();

// ============================================================
// 巩固练习：进阶题（更接近真实面试）
// ============================================================

// ============================================================
// 练习 9：闭包 —— 实现一个计数器工厂
// ============================================================
// 要求：createCounter(n) 返回一个对象，包含 inc()、dec()、reset() 三个方法
// inc() 返回 n+1，dec() 返回 n-1，reset() 重置为初始值 n

export function createCounter(n: number) {
  // TODO: 用闭包实现，不要用 class
  let result:number = n;
  return{
    inc(){
      result = result + 1
      return result
    },
    dec(){
      result = result - 1
      return result
    },
    reset(){
      result = n
      return result
    }
  }
}

// 测试：
const c = createCounter(5);
c.inc()
c.inc() 
c.dec() 
c.reset()

// ============================================================
// 练习 10：原型链 —— 扩展到 String
// ============================================================
// 要求：在 String.prototype 上添加一个方法 truncate(n)
// 如果字符串长度 > n，截断并加 "..."；否则返回原字符串

declare global {
  interface String {
    truncate(n: number): string;
  }
}

String.prototype.truncate = function(n: number): string {
  // TODO: 实现
  if(this.length > n){
    return this.slice(0,n) + '...'
  }
  return this.toString();
};

// 测试：
console.log('hello world'.truncate(5));
console.log('hi'.truncate(5));           

// ============================================================
// 练习 11：手写防抖（闭包 + this + 定时器）
// ============================================================
// 要求：实现 debounce(fn, delay)，返回一个防抖后的函数
// 防抖：连续调用时，只有最后一次调用生效（delay 毫秒后执行）

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  // 思路 多少毫秒之后才可以调用
  let timer:any = null;
  return function(...args){
    clearTimeout(timer);
    timer = setTimeout(()=>fn(...args),delay)
  }
}

// ============================================================
// 练习 12：事件循环 —— 进阶输出题
// ============================================================
// 写出输出顺序

export function eventLoopAdvanced(): string[] {
  // 代码：
  // console.log('1'); 同步
  // setTimeout(() => { 
  //   console.log('2');
  //   Promise.resolve().then(() => console.log('3'));
  // }, 0);
  // new Promise(resolve => {
  //   console.log('4');
  //   resolve();
  // }).then(() => console.log('5'));
  // console.log('6');
  
  return ['1', '4', '6', '5', '2', '3'];  // TODO: 填正确顺序
}

// ============================================================
// 练习 13：手写 Promise.all
// ============================================================
// 要求：实现 myPromiseAll，接收 Promise 数组，返回所有结果的数组
// 如果有任何一个失败，立刻 reject

export function myPromiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve,reject)=>{
    let result:any = []
    let completed = 0
    for(let i = 0;i<promises.length;i++){
      console.log(promises[i],'当前的promise')
      promises[i].then(value=>{
        result[i] = value
        completed++
        if(completed == promises.length){
          resolve(result)
        }
      }).catch(reject)
    }
  })
}

// 测试：
myPromiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(console.log);  // → [1, 2, 3]

// ============================================================
// 新测试
// ============================================================
function runAdvancedTests() {
  console.log('\n\n=== 练习 9：闭包计数器 ===');
  const c = createCounter(5);
  console.log('inc:', c.inc());
  console.log('inc:', c.inc());
  console.log('dec:', c.dec());
  console.log('reset:', c.reset());

  console.log('\n=== 练习 10：truncate ===');
  console.log('hello world'.truncate(5));
  console.log('hi'.truncate(5));

  console.log('\n=== 练习 12：事件循环进阶 ===');
  console.log('你的答案:', eventLoopAdvanced());
  console.log('正确答案: [1, 4, 6, 5, 2, 3]');
}

runAdvancedTests();
