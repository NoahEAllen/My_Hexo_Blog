// 严格遵循 Hexo 7.0.0 官方 API 调用逻辑
const Hexo = require('hexo');
const path = require('path');

// 1. 实例化 Hexo 类（指定项目根目录、关闭日志静默模式）
const hexo = new Hexo(path.resolve(__dirname), { silent: false });

// 2. 定义构建流程：先 clean 再 generate
async function build() {
  try {
    // 初始化 Hexo（加载配置、插件、数据库）
    await hexo.init();
    // 执行 clean 命令（删除旧的 public 目录和数据库）
    await hexo.call('clean');
    // 执行 generate 命令（生成新的 public 静态目录）
    await hexo.call('generate', { force: true });
    // 结束 Hexo 进程
    await hexo.exit();
    console.log('✅ Hexo 构建成功，public 目录已生成');
  } catch (err) {
    console.error('❌ Hexo 构建失败：', err);
    await hexo.exit();
    process.exit(1); // 抛出错误，让 Vercel 感知构建失败
  }
}

// 执行构建流程
build();
