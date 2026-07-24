/**
 * 阶段 2 练习：浏览器原理 + 垃圾回收
 */

// ============================================================
// 练习 1：渲染流程排序
// ============================================================
// 将以下步骤按浏览器的实际执行顺序排列：
//   A. 合成（Composite）
//   B. 布局/回流（Layout）
//   C. 构建 DOM 树
//   D. 绘制（Paint）
//   E. 样式计算（Style Calculation）
//   F. 分层（Layer）

export function renderPipelineOrder(): string[] {
  // TODO: 填入正确顺序，例如 ['C', 'E', ...]
  return ['C','E','B','F','D','A'];
}

// ============================================================
// 练习 2：回流 vs 重绘 vs 合成
// ============================================================
// 判断以下 CSS 属性修改触发什么，填 'reflow'、'repaint' 或 'composite'
//   reflow（回流）：需要重新布局 + 绘制 + 合成
//   repaint（重绘）：需要重新绘制 + 合成
//   composite（合成）：只需要合成

export function classifyCSSChanges(): Record<string, string> {
  return {
    width: 'reflow',        // TODO
    color: 'repaint',        // TODO
    transform: 'composite',    // TODO
    opacity: 'composite',      // TODO
    left: 'reflow',         // TODO
    'background-color': 'repaint', // TODO
    'box-shadow': 'repaint', // TODO
    display: 'reflow',      // TODO
  };
}

// ============================================================
// 练习 3：图层创建判断
// ============================================================
// 以下哪些可以触发浏览器创建独立图层？填 true/false

export function willCreateLayer(): Record<string, boolean> {
  return {
    'will-change: transform': true,   // TODO
    'position: absolute': false,       // TODO
    'transform: translateZ(0)': true, // TODO
    'overflow: scroll': true,         // TODO
    'color: red': false,               // TODO
    '<video> 元素': true,             // TODO
    'z-index: 999': false,             // TODO
  };
}

// ============================================================
// 练习 4：内存泄漏分析
// ============================================================
// 判断以下代码是否会内存泄漏，填 true/false 并说明原因

export function memoryLeakAnalysis(): { leak: boolean; reason: string }[] {
  return [
    // A: 未清除的定时器，组件卸载后
    {
      leak: true, // TODO
      reason: '垃圾回收机制会认为这个定时器还有地方引用',  // TODO
    },
    // B: 事件监听未解绑
    {
      leak: true, // TODO
      reason: '事件监听没有移除,导致内存泄漏',  // TODO
    },
    // C: 局部变量在函数执行完后
    {
      leak: false, // TODO
      reason: '执行完后,没有找到变量引用,局部变量会被垃圾回收机制回收',  // TODO
    },
    // D: 全局变量持有 DOM 引用，但 DOM 已从页面移除
    {
      leak: true, // TODO
      reason: '全局变量持有 DOM 引用，但 DOM 已从页面移除,标记清除会发现仍然有地方引用了这个变量,因为移除dom操作使用的是这个dom上的方法,变量还在',  // TODO
    },
    // E: 闭包只使用了作用域中的一个小变量，未使用大对象（现代 V8）
    {
      leak: false, // TODO
      reason: '闭包只使用了作用域中的一个小变量，未使用大对象,只会保留实际访问的变量,不是整个作用域',  // TODO
    },
  ];
}

// ============================================================
// 练习 5：script 加载行为
// ============================================================
// 对比普通 script、defer、async 的区别

export function scriptBehavior(): Record<string, { blocksHTML: boolean; executionOrder: string }> {
  return {
    '普通 script': {
      blocksHTML: true,   // TODO: 是否阻塞 HTML 解析
      executionOrder: '书写顺序',  // TODO: 执行顺序（'书写顺序' / '下载完成顺序'）
    },
    'defer': {
      blocksHTML: false,   // TODO
      executionOrder: '书写顺序',  // TODO
    },
    'async': {
      blocksHTML: false,   // TODO
      executionOrder: '下载完成顺序',  // TODO
    },
  };
}

// ============================================================
// 练习 6：Fiber —— 为什么替代递归
// ============================================================
// React 15 用递归遍历组件树，React 16 用 Fiber（链表）
// 用自己的话回答以下问题：

export function fiberQuestions(): Record<string, string> {
  return {
    '递归遍历组件树的缺点是什么': '递归不能停止,如果有1000个组件在更新,当前如果用户点击更新需要等这1000个组件更新完才能继续,会造成卡顿',  // TODO
    'Fiber 的三个关键指针是哪三个': '子节点,兄弟节点和父节点',  // TODO
    '遍历 Fiber 树的规则是什么': '先遍历是否有子节点没有去找兄弟节点也没有回到父节点',     // TODO
    'Fiber 在哪里可以随时暂停': '在render阶段就可以暂停',      // TODO: Render 阶段还是 Commit 阶段？
  };
}

// ============================================================
// 练习 7：Hooks 链表
// ============================================================
// 以下函数组件，请画出 Hooks 链表的顺序

// function Profile() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState(0);      // ← 这里有个 Hook
//   useEffect(() => {                        // ← 这里有个 Hook
//     console.log(name);
//   }, [name]);
//   const inputRef = useRef(null);          // ← 这里有个 Hook
//   return <input ref={inputRef} />;
// }

export function hooksLinkedListOrder(): string[] {
  // TODO: 按 Hook 调用顺序，写出它们出现在 Hooks 链表中的先后
  // 例如：['useState(name)', 'useState(age)', ...]
  return ['useState(name)','useState(age)','useRef','useEffect'];
}

// ============================================================
// 练习 8：为什么 Hooks 不能放条件里
// ============================================================
// 用自己的话解释，50 字以内

export function hooksConditionReason(): string {
  return '因为hooks是挂载到fiber节点上的单向链表,依靠的是hook的顺序而不是标记,如果hooks在条件中被跳过,会导致hooks的顺序错乱出现偏差'; // TODO
}

// ============================================================
// 练习 9：Fiber 节点类型判断
// ============================================================
// 下面哪些 Fiber 节点上会挂载 Hooks 链表？填 true/false

export function whichFiberHasHooks(): Record<string, boolean> {
  return {
    '<div> 的 Fiber 节点': false,      // TODO
    '函数组件的 Fiber 节点': true,     // TODO
    '<input> 的 Fiber 节点': false,    // TODO
    '自定义 Hook 内部': false,         // TODO: 自定义 Hook 有自己独立的链表吗？
    'Class 组件的 Fiber 节点': false,  // TODO
  };
}


// ============================================================
// 测试运行
// ============================================================

function runTests() {
  console.log('=== 练习 1：渲染流程顺序 ===');
  console.log('你的答案:', renderPipelineOrder());
  console.log('正确答案: [C, E, B, F, D, A]');

  console.log('\n=== 练习 2：回流/重绘/合成 ===');
  console.log('你的答案:', classifyCSSChanges());

  console.log('\n=== 练习 3：图层创建 ===');
  console.log('你的答案:', willCreateLayer());

  console.log('\n=== 练习 4：内存泄漏分析 ===');
  console.log('你的答案:', memoryLeakAnalysis());

  console.log('\n=== 练习 5：script 行为 ===');
  console.log('你的答案:', scriptBehavior());

  console.log('\n=== 练习 6：Fiber 问答 ===');
  console.log('你的答案:', fiberQuestions());

  console.log('\n=== 练习 7：Hooks 链表 ===');
  console.log('你的答案:', hooksLinkedListOrder());

  console.log('\n=== 练习 8：条件 Hooks ===');
  console.log('你的答案:', hooksConditionReason());

  console.log('\n=== 练习 9：哪些 Fiber 有 Hooks ===');
  console.log('你的答案:', whichFiberHasHooks());
}

runTests();
