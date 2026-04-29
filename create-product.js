const fs = require('fs');
const path = require('path');

function toCamelCase(str) {
  return str
    .split(/-|_|\s/)
    .map((word, index) => 
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

function toTitleCase(str) {
  return str
    .split(/-|_|\s/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function replacePlaceholders(content, config) {
  const replacements = {
    '{产品名称}': config.productName,
    '{productName}': config.productNameVar,
    '{product-slug}': config.productSlug,
    '{简要描述产品类型}': config.shortDescription,
    '{主要价值主张}': config.valueProposition
  };

  let result = content;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, 'g'), value);
  }
  return result;
}

function createProduct(config) {
  const templateDir = path.join(__dirname, 'product-template');
  const productDir = path.join(__dirname, 'products', config.productSlug);

  console.log('\n🚀 开始创建新产品...');
  console.log('📦 产品信息:');
  console.log(`   产品名称: ${config.productName}`);
  console.log(`   产品标识: ${config.productSlug}`);
  console.log(`   产品变量: ${config.productNameVar}`);

  if (fs.existsSync(productDir)) {
    console.log('\n⚠️  产品目录已存在！');
    console.log(`   ${productDir}`);
    process.exit(1);
  }

  console.log('\n📁 创建目录结构...');
  fs.mkdirSync(path.join(productDir, 'docs', 'getting-started'), { recursive: true });
  fs.mkdirSync(path.join(productDir, 'docs', 'features'), { recursive: true });
  fs.mkdirSync(path.join(productDir, 'docs', 'api-reference'), { recursive: true });

  const filesToCopy = [
    ['docs/intro.md', 'docs/intro.md'],
    ['docs/getting-started/quickstart.md', 'docs/getting-started/quickstart.md'],
    ['docs/getting-started/installation.md', 'docs/getting-started/installation.md'],
    ['docs/features/feature1.md', 'docs/features/feature1.md'],
    ['docs/features/feature2.md', 'docs/features/feature2.md'],
    ['docs/api-reference/overview.md', 'docs/api-reference/overview.md'],
    ['sidebars.js', 'sidebars.js']
  ];

  console.log('\n📄 复制并处理模板文件...');
  filesToCopy.forEach(([src, dest]) => {
    const srcPath = path.join(templateDir, src);
    const destPath = path.join(productDir, dest);
    
    if (fs.existsSync(srcPath)) {
      let content = fs.readFileSync(srcPath, 'utf8');
      content = replacePlaceholders(content, config);
      fs.writeFileSync(destPath, content, 'utf8');
      console.log(`   ✅ ${dest}`);
    }
  });

  console.log('\n✨ 产品文档结构创建完成！');
  console.log(`\n📂 目录位置: ${productDir}`);
  console.log('\n📋 下一步操作:');
  console.log('   1. 编辑产品文档内容');
  console.log('   2. 在 products.js 中添加产品配置');
  console.log('   3. 在 docusaurus.config.js 中添加插件配置');
  console.log('   4. 运行 npm run clear 清理缓存');
  console.log('   5. 运行 npm start 查看效果');
  console.log('\n📖 详细说明请查看: docs/如何添加新产品.md\n');
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('========================================');
  console.log('  🚀 YP 产品中心 - 产品创建向导');
  console.log('========================================\n');

  try {
    const productName = await question('请输入产品名称（如：YP.Cloud）: ');
    const productSlug = await question(`请输入产品标识（如：cloud）[${productName.replace('YP.', '').toLowerCase()}]]: `) || 
                        productName.replace('YP.', '').toLowerCase();
    const shortDescription = await question('请输入产品简短描述（如：企业级云计算平台）: ');
    const valueProposition = await question('请输入产品价值主张（如：快速实现数字化转型）: ');
    const productNameVar = toCamelCase(productSlug);
    const productTitle = toTitleCase(productSlug);

    console.log('\n请确认产品信息:');
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`产品名称: ${productName}`);
    console.log(`产品标识: ${productSlug}`);
    console.log(`产品变量: ${productNameVar}`);
    console.log(`简短描述: ${shortDescription}`);
    console.log(`价值主张: ${valueProposition}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    const confirm = await question('\n确认创建产品？(Y/n) ');
    
    if (confirm.toLowerCase() !== 'n' && confirm.toLowerCase() !== 'no') {
      createProduct({
        productName,
        productSlug,
        productNameVar,
        productTitle,
        shortDescription,
        valueProposition
      });
    } else {
      console.log('\n取消创建。');
    }
  } catch (error) {
    console.error('\n❌ 创建产品时出错:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { createProduct };
