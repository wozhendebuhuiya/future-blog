/**
 * 策略模式 (Strategy Pattern) - 解决满屏 if-else 的终极武器
 * 
 * 【用户的痛点场景】
 * 项目中有多个“算法/权限规则”(A, B, C...)，不同的按钮/操作需要判断当前是哪个规则。
 * 导致项目中充斥着 `if (type === 'A' || type === 'B') { ... }`。
 * 新增一个算法 D 时，需要去全项目搜寻并修改这些 if 判断，极易引发 Bug。
 * 
 * 【为什么不用工厂模式？】
 * 工厂模式是用来“创建对象”的（比如创建不同的弹窗）。
 * 而你现在的痛点是“不同条件下的行为判断/逻辑执行”。
 * 
 * 【策略模式的解法】
 * 将每一种“算法/规则”封装成一个独立的“策略对象（或函数）”。
 * 业务代码不再去写 if-else，而是直接把当前的情况“委托”给策略对象去判断。
 */

// ==========================================
// 传统糟糕写法 (你的痛点)
// ==========================================
function badCheckPermission(algorithmType: string, action: string) {
  // 想象一下如果项目里有 50 个这样的函数...
  if (action === 'delete') {
    if (algorithmType === 'A' || algorithmType === 'B') return true;
    return false;
  }
  if (action === 'edit') {
    if (algorithmType === 'B' || algorithmType === 'C') return true;
    return false;
  }
  return false;
}

// ==========================================
// 策略模式解法：将“算法规则”抽象为配置字典/策略对象
// ==========================================

// 1. 我们先定义所有可能的操作类型
type ActionType = 'view' | 'edit' | 'delete' | 'share';

// 2. 核心：定义策略字典 (Strategy Map)
// 我们把每个“算法/角色”能做的事情，集中在一个地方配置好。
// 以后加了新算法 D，你只需要在这个文件里加一行配置，其他业务代码【一行都不用改】！
const PermissionStrategy: Record<string, ActionType[]> = {
  'Algorithm_A': ['view', 'delete'],               // A 只能看和删
  'Algorithm_B': ['view', 'edit', 'delete'],       // B 是高权限
  'Algorithm_C': ['view', 'edit', 'share'],        // C 偏向于编辑和分享
  // 假设明天产品要求加一个新算法 D：
  'Algorithm_D': ['view']                          // 只需在这里添加，完美符合“开闭原则”！
};

// 3. 业务层面只需要提供一个通用的“执行器”
class ActionExecutor {
  private currentAlgorithm: string;

  constructor(algorithm: string) {
    this.currentAlgorithm = algorithm;
  }

  // 切换当前的算法/环境
  setAlgorithm(algo: string) {
    this.currentAlgorithm = algo;
  }

  // 核心校验逻辑：没有任何 if-else 的硬编码！
  canDo(action: ActionType): boolean {
    const allowedActions = PermissionStrategy[this.currentAlgorithm] || [];
    return allowedActions.includes(action);
  }

  // 具体的业务执行
  execute(action: ActionType) {
    if (this.canDo(action)) {
      console.log(`✅ [${this.currentAlgorithm}] 成功执行了操作: ${action}`);
    } else {
      console.log(`❌ [${this.currentAlgorithm}] 没有权限执行操作: ${action}`);
    }
  }
}

// ======================= 测试 / 演示代码 =======================
function testStrategy() {
  console.log("\n--- 策略模式 (权限/算法判断) 测试开始 ---");

  // 假设当前系统运行在 算法A 下
  const system = new ActionExecutor('Algorithm_A');
  
  system.execute('view');   // 应该成功
  system.execute('edit');   // 应该失败
  system.execute('delete'); // 应该成功

  console.log("\n--- 切换到 算法C ---");
  system.setAlgorithm('Algorithm_C');
  system.execute('edit');   // 应该成功
  system.execute('delete'); // 应该失败

  console.log("\n--- 策略模式测试结束 ---\n");
}

testStrategy();
