# 快速参考卡片

## 🚀 5 分钟快速添加新产品

### 1. 使用脚本创建

```bash
npm run create-product
```

输入产品信息，脚本自动创建文档结构。

---

### 2. 编辑产品文档

```
products/{产品标识}/
├── docs/
│   ├── intro.md              # 编辑产品简介
│   ├── getting-started/      # 编辑快速开始
│   └── features/             # 编辑功能文档
└── sidebars.js              # 配置侧边栏
```

---

### 3. 更新 products.js

```javascript
{
  name: '产品名',
  slug: '产品标识',
  description: '简短描述',
  longDescription: '详细描述',
  icon: '📦',
  color: '#颜色代码',
  docsUrl: '/products/{产品标识}/docs/intro',
  website: 'https://官网地址',
  features: ['特性1', '特性2', '特性3']
}
```

---

### 4. 更新 docusaurus.config.js

添加插件配置：

```javascript
[
  '@docusaurus/plugin-content-docs',
  {
    id: '{产品标识}',
    path: 'products/{产品标识}/docs',
    routeBasePath: 'products/{产品标识}/docs',
    sidebarPath: require.resolve('./products/{产品标识}/sidebars.js'),
  },
]
```

添加导航栏：

```javascript
{
  label: '产品名',
  to: '/products/{产品标识}/docs/intro',
  position: 'left',
}
```

添加页脚：

```javascript
{
  label: '产品名',
  to: '/products/{产品标识}/docs/intro',
}
```

---

### 5. 查看效果

```bash
npm run clear
npm start
```

---

## 🎨 颜色选择参考

| 类型 | 推荐颜色 | 说明 |
|------|----------|------|
| 云计算 | `#2563eb` | 蓝色系 |
| 数据/分析 | `#10b981` | 绿色系 |
| AI/智能 | `#f59e0b` | 黄色系 |
| 安全/防护 | `#ef4444` | 红色系 |
| 开发工具 | `#8b5cf6` | 紫色系 |
| DevOps | `#ec4899` | 粉色系 |
| 存储/数据库 | `#64748b` | 灰色系 |

---

## 📱 Icon 选择参考

| 产品类型 | 推荐图标 |
|---------|---------|
| 云计算 | ☁️ |
| 存储/数据库 | 💾 |
| 数据/分析 | 📊 |
| AI/机器学习 | 🤖 |
| 安全/防护 | 🔒 |
| DevOps | 🚀 |
| 监控/日志 | 📈 |
| API/网关 | 🔌 |
| 消息队列 | 📨 |
| 容器/编排 | 📦 |
| 区块链 | ⛓️ |
| IoT/物联网 | 🔧 |
| 身份认证 | 🔑 |
| 大数据 | 🔢 |

---

## 📝 文档编写参考

### intro.md 结构

```markdown
# 产品名简介

## 核心特性
- 特性1
- 特性2

## 为什么选择？
1. 优势1
2. 优势2

## 快速开始
链接到入门指南

## 技术规格
| 规格 | 说明 |
|------|------|

## 获取帮助
- 文档链接
- 社区链接
- 支持邮箱
```

---

## ⚙️ 常用命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run create-product` | 创建新产品 |
| `npm run clear` | 清除缓存 |
| `npm run build` | 构建生产版本 |

---

## 🔍 故障排除

### 问题：新添加的产品不显示

**检查清单：**
- ✅ `products.js` 已添加配置
- ✅ `docusaurus.config.js` 已添加插件
- ✅ 运行了 `npm run clear`
- ✅ 重启了开发服务器

### 问题：文档 404

**检查清单：**
- ✅ 文档路径正确
- ✅ `sidebars.js` 配置正确
- ✅ 文件存在且内容正确

---

## 📚 更多资源

- [详细添加产品文档](../docs/如何添加新产品.md)
- [产品模板说明](../product-template/README.md)
- [Docusaurus 文档](https://docusaurus.io/docs)

---

## 💡 提示

- 使用 Emoji 增加文档趣味性
- 表格让参数更清晰
- 代码块提供实用示例
- 保持文档风格一致
