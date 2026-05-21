/**
 * 前端特有的单例模式实现（不使用 Class 类）
 *
 * 在 JavaScript/TypeScript 中，我们完全可以利用语言特性（闭包、模块缓存）
 * 来实现单例模式，而不必拘泥于传统的面向对象 Class 语法。
 */

// ==========================================
// 方式一：利用 ES6 模块缓存 (Module Caching)
// 最简单、最符合 React/Vue 现代前端开发直觉的单例
// ==========================================

// 这是一个普通的函数，用来创建某些耗时的对象或管理状态
function createStore() {
  console.log("ES6模块化单例：createStore 被执行了！(全局只打印一次)");
  let count = 0;

  return {
    getCount: () => count,
    increment: () => {
      count++;
    },
  };
}

// 【核心】：直接在这里执行并导出实例！
// 无论你在 A.tsx 还是 B.tsx 中 import { globalStore } from './FunctionalSingleton'
// 打包工具(Vite/Webpack)和浏览器都保证了这个模块只会被解析执行一次。
// 你导入的永远是同一份内存引用。
export const globalStore = createStore();


// ==========================================
// 方式二：利用闭包 (Closure) 实现懒汉式单例
// 如果你想保留“懒加载”（用到时才初始化）的特性
// ==========================================

const createLazyManager = (function () {
  let instance: any = null;

  // 这个内部函数才是真正去“干活/创建”逻辑的地方
  function init() {
    console.log("闭包单例：Manager 初始化了！(用到时才打印，且只打印一次)");
    return {
      name: "我是闭包单例管理器",
      doSomething: () => console.log("执行任务"),
    };
  }

  // 暴露出去的是这个闭包函数
  return function () {
    if (!instance) {
      instance = init(); // 第一次调用时初始化
    }
    return instance; // 之后都直接返回缓存的实例
  };
})();

export const getLazyManager = createLazyManager;

// ======================= 测试 / 演示代码 =======================
function testFunctionalSingleton() {
  console.log("\n--- 函数式/非类 单例模式测试开始 ---");

  // 测试模块化单例
  const store1 = globalStore;
  const store2 = globalStore;
  store1.increment();
  console.log("store2 的 count:", store2.getCount()); // 1，说明状态共享了

  // 测试闭包懒加载单例
  const manager1 = getLazyManager();
  const manager2 = getLazyManager();
  console.log("manager1 === manager2:", manager1 === manager2); // true

  console.log("--- 函数式/非类 单例模式测试结束 ---\n");
}

// 自动执行测试
testFunctionalSingleton();
