/**
 * 工厂模式 (Factory Pattern)
 * 
 * 【概念】
 * 顾名思义，就像一个“工厂”一样，你只需要告诉工厂“我要什么”，
 * 工厂就会把做好的产品交给你，而你不需要关心这个产品是怎么做出来的（隐藏创建逻辑）。
 * 
 * 【为什么要用工厂模式？】
 * 1. 解耦：把“创建对象”的逻辑和“使用对象”的逻辑分开。
 * 2. 消除 if-else：当有很多相似但不完全一样的对象时，不用在业务代码里写满屏的 if-else。
 * 
 * 【前端常见场景】
 * 1. 根据不同角色（Admin, User, Guest）创建不同的用户对象/权限路由。
 * 2. 根据不同数据类型，渲染不同的 UI 组件（比如弹窗工厂：SuccessModal, ErrorModal）。
 * 3. 封装跨平台的 API（比如根据当前环境返回不同的支付实例：WechatPay, AliPay）。
 */

// ==========================================
// 场景模拟：一个提示框 (Notification) 组件工厂
// ==========================================

// 1. 定义一个公共接口 (Interface)，保证所有产出的产品都有相同的方法规范
interface Notification {
  show(message: string): void;
}

// 2. 创建具体的产品类 (它们都实现了 Notification 接口)
class SuccessNotification implements Notification {
  show(message: string) {
    console.log(`✅ [成功弹窗 UI 渲染]: ${message} (绿色背景, 伴随叮的一声)`);
  }
}

class ErrorNotification implements Notification {
  show(message: string) {
    console.log(`❌ [错误弹窗 UI 渲染]: ${message} (红色背景, 伴随震动)`);
  }
}

class WarningNotification implements Notification {
  show(message: string) {
    console.log(`⚠️ [警告弹窗 UI 渲染]: ${message} (黄色背景)`);
  }
}

// 3. 核心：创建工厂类 (Factory)
// 它的职责就是根据你传入的类型，去 new 对应的具体类
export class NotificationFactory {
  // 静态方法，直接通过类名调用
  public static createNotification(type: 'success' | 'error' | 'warning'): Notification {
    switch (type) {
      case 'success':
        return new SuccessNotification();
      case 'error':
        return new ErrorNotification();
      case 'warning':
        return new WarningNotification();
      default:
        throw new Error('未知的提示框类型');
    }
  }
}

// ======================= 测试 / 演示代码 =======================
function testFactory() {
  console.log("\n--- 工厂模式测试开始 ---");

  // 以前在业务代码里，你可能要到处自己 new 对象，或者写很长的逻辑
  // 现在，业务代码变得非常干净，只需向工厂“下订单”

  const successMsg = NotificationFactory.createNotification('success');
  successMsg.show('登录成功！欢迎回来。');

  const errorMsg = NotificationFactory.createNotification('error');
  errorMsg.show('密码错误，请重试！');

  console.log("--- 工厂模式测试结束 ---\n");
}

testFactory();
