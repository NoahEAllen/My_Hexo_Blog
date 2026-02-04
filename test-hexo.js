const Hexo = require('hexo');
const fs = require('fs');

async function test() {
  console.log('测试 Hexo...');
  
  const app = new Hexo(process.cwd(), { silent: false });
  
  try {
    // 初始化
    await app.init();
    console.log('初始化成功');
    
    // 加载数据
    await app.load();
    console.log('数据加载成功');
    
    // 检查文章数量
    const posts = app.locals.get('posts');
    console.log(`文章数量: ${posts.length}`);
    
    // 生成
    await app.call('clean', {});
    await app.call('generate', {});
    
    console.log('生成完成');
    
    // 检查结果
    if (fs.existsSync('public')) {
      const files = fs.readdirSync('public');
      console.log(`✅ 生成 ${files.length} 个文件`);
      
      if (files.length > 0) {
        console.log('前5个文件:');
        files.slice(0, 5).forEach(file => {
          console.log(`  - ${file}`);
        });
      }
    } else {
      console.log('❌ public 目录不存在');
    }
    
  } catch (error) {
    console.error('错误:', error.message);
  }
}

test();
