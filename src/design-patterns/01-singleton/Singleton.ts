/**
 * 单例模式 (Singleton Pattern)
 *
 * 【概念】
 * 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 *
 * 【前端常见场景】
 * 1. 状态管理库 (如 Vuex/Redux 的 Store)
 * 2. 全局弹窗组件 (如 Message 提示)
 * 3. 唯一的 API 请求实例 (如封装好的 Axios 实例)
 * 4. 全局配置对象 (ConfigManager)
 */

export class ConfigManager {
  // 1. 静态私有属性，用于存储唯一的实例
  private static instance: ConfigManager;

  // 模拟一些全局配置数据
  private config: Record<string, any> = {};

  // 2. 构造函数私有化 (private)
  // 这样外部就无法通过 `new ConfigManager()` 来创建新的实例了
  private constructor() {
    console.log("ConfigManager 初始化了！(这句话在整个应用生命周期中只打印一次)");
    this.config = {
      apiBaseUrl: "https://api.example.com",
      theme: "dark",
    };
  }

  // 3. 提供一个静态的全局访问点 (getInstance 方法)
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  // 一些业务方法：获取配置
  public get(key: string): any {
    return this.config[key];
  }

  // 一些业务方法：设置配置
  public set(key: string, value: any): void {
    this.config[key] = value;
  }
}

// ======================= 测试 / 演示代码 =======================
function testSingleton() {
  console.log("--- 单例模式测试开始 ---");

  // const config = new ConfigManager(); // ❌ 报错：类“ConfigManager”的构造函数是私有的。

  const config1 = ConfigManager.getInstance();
  const config2 = ConfigManager.getInstance();

  console.log("config1 === config2:", config1 === config2); // ✅ true，证明它们是同一个实例

  // 修改 config1 的值
  config1.set("theme", "light");

  // 从 config2 读取，发现也被修改了（因为指向同一块内存）
  console.log("config2 读取 theme:", config2.get("theme")); // light

  console.log("--- 单例模式测试结束 ---\n");
}

// 你可以在别的代码里直接运行这个测试函数
testSingleton();
