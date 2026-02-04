const fs = require('fs');
const path = require('path');

console.log('=== 构建后检查 ===\n');

// 检查public目录
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  console.error('❌ public目录不存在');
  process.exit(1);
}

const files = fs.readdirSync(publicDir);
console.log(`✅ public目录有 ${files.length} 个文件/目录`);

// 检查关键文件
const requiredFiles = ['index.html', 'css', 'js'];
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(publicDir, file));
  console.log(`${file}: ${exists ? '✅' : '❌'}`);
});

// 检查HTML文件内容
if (fs.existsSync(path.join(publicDir, 'index.html'))) {
  const content = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
  
  // 检查是否包含必要的标签
  const checks = {
    '有HTML标签': content.includes('<html'),
    '有HEAD标签': content.includes('<head'),
    '有BODY标签': content.includes('<body'),
    '有标题': content.includes('<title'),
    '有CSS链接': content.includes('.css'),
    '有JS链接': content.includes('.js')
  };
  
  console.log('\nHTML文件检查:');
  Object.entries(checks).forEach(([check, result]) => {
    console.log(`${check}: ${result ? '✅' : '❌'}`);
  });
  
  // 检查资源路径
  const cssMatches = content.match(/href="([^"]*\.css)"/g);
  const jsMatches = content.match(/src="([^"]*\.js)"/g);
  
  console.log(`\n找到 ${cssMatches ? cssMatches.length : 0} 个CSS链接`);
  console.log(`找到 ${jsMatches ? jsMatches.length : 0} 个JS链接`);
}

console.log('\n✅ 检查完成');
