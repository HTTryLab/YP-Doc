const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '.products-config.json');

function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { frontMatter: {}, body: content };
  }

  const frontMatterStr = match[1];
  const body = content.slice(match[0].length).trim();
  const frontMatter = {};

  const lines = frontMatterStr.split('\n');
  let currentKey = null;
  let currentArray = null;
  let currentIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const indent = line.search(/\S/);

    if (indent === -1) continue;

    if (line.match(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/)) {
      if (currentArray && currentKey) {
        frontMatter[currentKey] = currentArray;
      }

      const colonIndex = line.indexOf(':');
      currentKey = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      if (value === '' || value === '|') {
        currentArray = [];
        continue;
      }

      value = value.replace(/^["']|["']$/g, '');
      frontMatter[currentKey] = value;
      currentArray = null;
    } else if (line.trim().startsWith('-') && currentArray !== null) {
      const item = line.replace(/^\s*-\s*/, '').trim().replace(/^["']|["']$/g, '');
      if (item) {
        currentArray.push(item);
      }
    } else if (currentArray !== null && indent > currentIndent) {
      const item = line.trim().replace(/^["']|["']$/g, '');
      if (item) {
        currentArray.push(item);
      }
    }
  }

  if (currentArray && currentKey) {
    frontMatter[currentKey] = currentArray;
  }

  return { frontMatter, body };
}

function findProductDirs(productsDir) {
  if (!fs.existsSync(productsDir)) {
    return [];
  }

  const entries = fs.readdirSync(productsDir, { withFileTypes: true });
  const productDirs = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const productPath = path.join(productsDir, entry.name);
      const productMdPath = path.join(productPath, 'docs', 'product.md');
      const introMdPath = path.join(productPath, 'docs', 'intro.md');

      if (fs.existsSync(productMdPath)) {
        productDirs.push({
          name: entry.name,
          path: productPath,
          entryFile: 'docs/product.md'
        });
      } else if (fs.existsSync(introMdPath)) {
        productDirs.push({
          name: entry.name,
          path: productPath,
          entryFile: 'docs/intro.md'
        });
      }
    }
  }

  return productDirs;
}

function generateProductsConfig() {
  const productsDir = path.join(__dirname, 'products');
  const productDirs = findProductDirs(productsDir);
  const products = [];

  console.log('\n📦 自动加载产品配置:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  for (const productDir of productDirs) {
    const entryPath = path.join(productDir.path, productDir.entryFile);

    if (!fs.existsSync(entryPath)) {
      console.warn(`⚠️  产品入口文件不存在: ${entryPath}`);
      continue;
    }

    const content = fs.readFileSync(entryPath, 'utf8');
    const { frontMatter, body } = parseFrontMatter(content);

    if (!frontMatter.name || !frontMatter.slug) {
      console.warn(`⚠️  产品缺少必要的配置 (name 或 slug): ${entryPath}`);
      continue;
    }

    const product = {
      name: frontMatter.name,
      slug: frontMatter.slug,
      description: frontMatter.description || `${frontMatter.name} 产品`,
      longDescription: frontMatter.longDescription || frontMatter.description || '',
      icon: frontMatter.icon || '📦',
      color: frontMatter.color || '#64748b',
      docsUrl: `/products/${frontMatter.slug}/docs/intro`,
      website: frontMatter.website || '#',
      features: Array.isArray(frontMatter.features) ? frontMatter.features : [],
      docsId: frontMatter.slug
    };

    if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
      product.tags = frontMatter.tags;
    }

    if (frontMatter.version) {
      product.version = frontMatter.version;
    }

    products.push(product);
    console.log(`✅ ${product.name} (${product.slug})`);
  }

  const plugins = [];
  const navbarItems = [];
  const footerItems = [];

  for (const product of products) {
    plugins.push([
      '@docusaurus/plugin-content-docs',
      {
        id: product.docsId,
        path: path.join(__dirname, 'products', product.slug, 'docs'),
        routeBasePath: `products/${product.slug}/docs`,
        sidebarPath: path.join(__dirname, 'products', product.slug, 'sidebars.js'),
      },
    ]);

    footerItems.push({
      label: product.name,
      to: `/products/${product.slug}/docs/intro`,
    });
  }

  navbarItems.push({
    label: '产品中心',
    position: 'left',
    items: [
      {
        label: '组件列表',
        to: '/products',
      },
    ],
  });

  navbarItems.push({
    label: '文档中心',
    position: 'left',
    items: [
      {
        label: '文档首页',
        to: '/docs',
      },
      ...products.map(product => ({
        label: product.name,
        to: `/products/${product.slug}/docs/intro`,
      })),
    ],
  });

  const config = { products, plugins, navbarItems, footerItems };

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');

  console.log(`\n✨ 共自动加载 ${products.length} 个产品`);
  console.log(`📄 配置已保存到: ${CONFIG_FILE}`);

  return config;
}

function loadProductsConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  }
  return generateProductsConfig();
}

if (require.main === module) {
  generateProductsConfig();
}

module.exports = {
  generateProductsConfig,
  loadProductsConfig
};
