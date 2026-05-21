/**
 * 深入理解闭包 (Closure)
 * 
 * 【通俗定义】
 * 闭包就是：一个函数记住了它“出生”时的环境（作用域）。
 * 即使这个函数被带到了外面去执行，它依然能访问到当时环境里的变量。
 * 
 * 就像是你出国（外部执行）了，但你依然带有家乡的钥匙（记住作用域），
 * 随时可以打开家乡的仓库（访问外部函数的局部变量）。
 */

// ==========================================
// 例子 1：最基础的闭包 (制造私有变量)
// ==========================================
function createCounter() {
  // 1. `count` 是 createCounter 函数内部的局部变量。
  // 正常情况下，函数执行完，`count` 就应该被垃圾回收机制销毁了。
  let count = 0; 

  // 2. 但是，我们在内部定义了一个返回的新函数。
  // 这个新函数“引用”了外层的 `count`。
  return function() {
    count++; // 修改外部函数的变量
    console.log(`当前计数: ${count}`);
    return count;
  };
}

// 此时，`myCounter` 实际上就是里面那个匿名函数。
// 因为它还需要用 `count`，所以 `count` 所在的“环境”被保留了下来，这就形成了闭包！
const myCounter = createCounter();

console.log("\n--- 基础闭包测试 ---");
myCounter(); // 1
myCounter(); // 2
// 我们无法在外部直接修改 count (比如 myCounter.count = 100 是没用的)，
// 只能通过闭包提供的函数去操作它，这就实现了【变量私有化】。


// ==========================================
// 例子 2：闭包与刚才“单例模式”的结合 (缓存)
// ==========================================
// 为什么我们在 FunctionalSingleton.ts 里要用立即执行函数 (IIFE)？
// 语法：(function() { ... })()
const createLazyManager = (function() {
  // 这个 instance 被闭包保护起来了，全局作用域无法直接访问它
  let instance: any = null; 

  return function() {
    if (!instance) {
      instance = { name: "我是唯一的实例" };
      console.log("初始化实例！");
    } else {
      console.log("使用缓存的实例！");
    }
    return instance;
  };
})();

console.log("\n--- 闭包缓存(单例)测试 ---");
const m1 = createLazyManager(); // 初始化实例！
const m2 = createLazyManager(); // 使用缓存的实例！
console.log("m1 === m2:", m1 === m2); // true


// ==========================================
// 例子 3：前端常见场景 - 防抖 (Debounce)
// 闭包极其经典的实战应用
// ==========================================
function debounce(fn: Function, delay: number) {
  // timer 被闭包记住了！
  let timer: ReturnType<typeof setTimeout> | null = null; 

  return function(...args: any[]) {
    if (timer) {
      clearTimeout(timer); // 如果还在倒计时，就重新计时
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const mockSearch = () => console.log("发送搜索请求...");
const debouncedSearch = debounce(mockSearch, 500);

console.log("\n--- 闭包防抖测试 ---");
console.log("连续触发 3 次搜索，但只会在最后一次触发的 500ms 后执行一次...");
debouncedSearch();
debouncedSearch();
debouncedSearch();
// 结果：只会打印一次 "发送搜索请求..."
