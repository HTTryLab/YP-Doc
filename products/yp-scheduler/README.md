# {产品名称}文档模板说明

这是标准的产品文档模板，包含完整的文档结构。

## 目录结构

```
{product-slug}/
├── docs/
│   ├── intro.md                    # 产品简介
│   ├── getting-started/
│   │   ├── quickstart.md           # 快速开始
│   │   └── installation.md         # 详细安装
│   ├── features/
│   │   ├── feature1.md             # 功能1文档
│   │   └── feature2.md             # 功能2文档
│   └── api-reference/
│       └── overview.md             # API 概览
└── sidebars.js                     # 侧边栏配置
```

## 替换占位符

在使用模板前，请替换以下占位符：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{产品名称}` | 产品全称 | YP.Cloud |
| `{product-slug}` | 产品英文标识 | cloud |
| `{productName}` | 产品变量名（小驼峰） | cloud |
| `{简要描述产品类型}` | 简短描述 | 企业级云计算平台 |
| `{主要价值主张}` | 产品价值 | 快速实现数字化转型 |

## 文档编写建议

1. **intro.md** - 产品简介，包含核心特性和价值
2. **quickstart.md** - 快速上手，简化步骤
3. **installation.md** - 完整的安装指南
4. **features/** - 功能文档，每个功能一个文件
5. **api-reference/** - API 接口文档

## Markdown 规范

- 使用二级标题（##）作为主要章节
- 使用表格展示参数和规格
- 使用代码块展示命令和配置
- 使用列表展示步骤和要点
