# 部署到 GitHub Pages 指南

本指南将帮助你将项目部署到 GitHub Pages。

---

## 📋 前置条件

- GitHub 账号
- Git 已安装并配置
- Node.js >= 18.0.0

---

## 🚀 快速开始

### 方法一：使用 `<username>.github.io` 域名（推荐）

#### 1. 在 GitHub 创建仓库

1. 登录 GitHub
2. 点击「+」→「New repository」
3. 填写仓库信息：
   - **Repository name**: `<your-username>.github.io`
   - **Description**: YP 团队产品文档网站
   - **Visibility**: Public
   - 勾选「Add a README file」
4. 点击「Create repository」

#### 2. 修改配置

编辑 `docusaurus.config.js` 文件，修改以下配置：

```javascript
const config = {
  title: 'YP 团队',
  tagline: '专业、创新、协作',
  url: 'https://<your-username>.github.io',  // 替换为你的 GitHub 用户名
  baseUrl: '/',
  organizationName: '<your-username>',  // 替换为你的 GitHub 用户名
  projectName: '<your-username>.github.io',  // 替换为你的仓库名
  deploymentBranch: 'gh-pages',
  // ...
};
```

例如，你的 GitHub 用户名是 `john-doe`，则配置为：

```javascript
url: 'https://john-doe.github.io',
baseUrl: '/',
organizationName: 'john-doe',
projectName: 'john-doe.github.io',
```

#### 3. 初始化 Git 仓库

```bash
cd d:\Public\YP.Doc
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

#### 4. 添加远程仓库

```bash
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
```

#### 5. 推送到 GitHub

```bash
git push -u origin main
```

#### 6. 部署到 GitHub Pages

```bash
npm run deploy
```

#### 7. 访问网站

部署成功后，访问：`https://<your-username>.github.io`

---

### 方法二：使用自定义仓库名

如果不想使用 `<username>.github.io` 作为仓库名，可以使用自定义名称。

#### 1. 在 GitHub 创建仓库

1. 登录 GitHub
2. 点击「+」→「New repository」
3. 填写仓库信息：
   - **Repository name**: `yp-doc`（或你喜欢的名称）
   - **Description**: YP 团队产品文档网站
   - **Visibility**: Public
   - 勾选「Add a README file」
4. 点击「Create repository」

#### 2. 修改配置

编辑 `docusaurus.config.js` 文件，修改以下配置：

```javascript
const config = {
  title: 'YP 团队',
  tagline: '专业、创新、协作',
  url: 'https://<your-username>.github.io',  // 替换为你的 GitHub 用户名
  baseUrl: '/yp-doc/',  // 替换为你的仓库名，注意末尾的斜杠
  organizationName: '<your-username>',  // 替换为你的 GitHub 用户名
  projectName: 'yp-doc',  // 替换为你的仓库名
  deploymentBranch: 'gh-pages',
  // ...
};
```

#### 3. 初始化 Git 仓库（如果还没有初始化）

```bash
cd d:\Public\YP.Doc
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

#### 4. 添加远程仓库

```bash
git remote add origin https://github.com/<your-username>/yp-doc.git
```

#### 5. 推送到 GitHub

```bash
git push -u origin main
```

#### 6. 部署到 GitHub Pages

```bash
npm run deploy
```

#### 7. 访问网站

部署成功后，访问：`https://<your-username>.github.io/yp-doc`

---

## 📝 完整部署流程

### 1. 安装依赖（如果还没有安装）

```bash
npm install
```

### 2. 测试本地开发

```bash
npm start
```

访问：http://localhost:3000/

### 3. 构建项目

```bash
npm run build
```

### 4. 部署到 GitHub Pages

```bash
npm run deploy
```

### 5. 配置 GitHub Pages

部署成功后：

1. 进入 GitHub 仓库页面
2. 点击「Settings」→ 「Pages」
3. 在「Build and deployment」部分：
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` 分支
4. 保存设置

---

## 📁 目录结构

部署前的项目结构：

```
YP.Doc/
├── .github/              # GitHub 工作流（可选）
├── build/                # 构建输出目录
├── products/             # 产品文档目录
├── src/                  # 源代码
├── static/               # 静态资源
├── .products-config.json # 产品配置（自动生成）
├── docusaurus.config.js  # Docusaurus 配置
├── package.json          # 项目配置
└── DEPLOY.md             # 本文件
```

---

## 🔄 更新和重新部署

当你修改了内容后，只需：

```bash
# 1. 提交变更
git add .
git commit -m "Update content"
git push

# 2. 部署更新
npm run deploy
```

---

## 📋 命令说明

| 命令 | 说明 |
|------|------|
| `npm start` | 启动本地开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run serve` | 预览构建结果 |
| `npm run deploy` | 部署到 GitHub Pages |
| `npm run clear` | 清除缓存 |

---

## 🐛 常见问题

### 1. 构建失败

确保：
- Node.js 版本 >= 18.0.0
- 所有依赖已安装：`npm install`

### 2. 部署后页面 404

检查：
- `baseUrl` 配置正确
- GitHub Pages 分支设置为 `gh-pages`
- 等待 1-2 分钟，GitHub Pages 有时需要时间更新

### 3. 链接错误

确保：
- `url` 和 `baseUrl` 配置正确
- 使用相对路径，避免硬编码的绝对路径

### 4. 图片加载失败

检查：
- 图片文件放在 `static/` 目录
- 图片路径正确，以 `/` 开头

---

## 📚 相关文档

- [Docusaurus 部署指南](https://docusaurus.io/docs/deployment)
- [GitHub Pages 文档](https://pages.github.com/)
- [Git 入门](https://git-scm.com/book/zh/v2)

---

## 💡 最佳实践

1. **版本控制**：使用 Git 管理源代码，定期提交
2. **测试**：每次部署前先在本地测试
3. **文档**：保持代码和文档的更新
4. **分支策略**：
   - `main` 分支：存储源代码
   - `gh-pages` 分支：自动生成的部署内容
5. **CI/CD**：可以使用 GitHub Actions 自动化部署

---

## ✅ 检查清单

部署前请确认：

- [ ] GitHub 仓库已创建
- [ ] `docusaurus.config.js` 中的 `url` 和 `baseUrl` 配置正确
- [ ] `organizationName` 和 `projectName` 配置正确
- [ ] 所有依赖已安装
- [ ] 本地测试通过
- [ ] Git 仓库已初始化
- [ ] 远程仓库已添加
- [ ] 代码已推送到 GitHub

---

## 📞 获取帮助

如有问题，请参考：
- [Docusaurus 官方文档](https://docusaurus.io/docs)
- [GitHub Pages 帮助](https://help.github.com/categories/github-pages-basics)
