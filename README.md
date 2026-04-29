# YP 产品中心

企业级软件产品展示网站，基于 Docusaurus 构建。

## 🚀 快速开始

### 启动开发服务器

```bash
npm start
```

访问 http://localhost:3000 查看网站。

### 添加新产品（推荐使用脚本）

```bash
npm run create-product
```

然后按照交互提示输入产品信息。

### 构建生产版本

```bash
npm run build
```

## 📂 项目结构

```
YP.Doc/
├── products.js              # 产品配置文件
├── docusaurus.config.js     # Docusaurus 配置
├── package.json            # 项目配置
│
├── products/               # 产品文档目录
│   ├── cloud/             # YP.Cloud
│   ├── data/              # YP.Data
│   ├── ai/                # YP.AI
│   └── security/          # YP.Security
│
├── product-template/       # 产品模板（添加新产品时使用）
│   ├── docs/
│   │   ├── intro.md
│   │   ├── getting-started/
│   │   ├── features/
│   │   └── api-reference/
│   ├── sidebars.js
│   └── README.md
│
├── docs/                  # 主站文档
│   └── 如何添加新产品.md  # 详细的添加产品说明
│
├── src/
│   ├── pages/            # 页面组件
│   │   └── index.js      # 产品展示首页
│   └── css/
│
├── static/               # 静态资源
│   └── img/
│
└── create-product.js     # 创建产品的脚本
```

## 📦 添加新产品的方法

### 方法 1：使用交互式脚本（推荐）

```bash
npm run create-product
```

脚本会引导您：
1. 输入产品名称
2. 输入产品标识
3. 输入产品描述
4. 自动创建文档结构

### 方法 2：手动添加

详细步骤请参考：[如何添加新产品](docs/如何添加新产品.md)

## 🎨 产品卡片配置

在 `products.js` 中配置产品：

```javascript
{
  name: 'YP.Storage',
  slug: 'storage',
  description: '企业级存储解决方案',
  longDescription: '提供高可靠、高性能的云存储服务',
  icon: '📦',
  color: '#10b981',
  docsUrl: '/products/storage/docs/intro',
  website: 'https://storage.example.com',
  features: [
    '自动备份',
    '版本控制',
    '权限管理',
    '跨平台同步'
  ]
}
```

## 📚 文档

- [如何添加新产品](docs/如何添加新产品.md) - 详细的添加产品指南
- [产品模板说明](product-template/README.md) - 模板文档的使用说明

## 🛠️ 开发命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run clear` | 清除缓存 |
| `npm run serve` | 服务构建好的版本 |
| `npm run create-product` | 创建新产品 |

## 🎯 现有产品

- **YP.Cloud** - 企业级云计算平台
- **YP.Data** - 大数据分析平台
- **YP.AI** - 人工智能引擎
- **YP.Security** - 安全防护系统

## 📖 了解更多

- [Docusaurus 官方文档](https://docusaurus.io/docs)
- [项目文档](docs/如何添加新产品.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT
