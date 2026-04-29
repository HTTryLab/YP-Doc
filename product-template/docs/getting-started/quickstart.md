---
id: quickstart
title: 快速开始
sidebar_label: 快速开始
---

# 快速开始指南

本指南将帮助您在最短时间内完成 {产品名称} 的配置和使用。

## 前置要求

### 系统要求

- **操作系统**：{支持的操作系统列表}
- **CPU**：{CPU要求}
- **内存**：{内存要求}
- **磁盘**：{磁盘要求}
- **网络**：{网络要求}

### 软件依赖

- {依赖1} {版本要求}
- {依赖2} {版本要求}
- {依赖3} {版本要求}

## 安装步骤

### 步骤 1：下载安装包

从官方网站下载最新版本的安装包：

```bash
wget https://download.example.com/{product-slug}-latest.tar.gz
```

或者访问 [下载页面](https://example.com/downloads) 获取安装包。

### 步骤 2：解压安装包

```bash
tar -xzf {product-slug}-latest.tar.gz
cd {product-slug}-installer
```

### 步骤 3：执行安装

```bash
sudo ./install.sh
```

按照提示完成配置：

1. 输入许可证密钥
2. 选择安装路径
3. 配置管理员账户
4. 设置网络参数

### 步骤 4：验证安装

安装完成后，访问管理控制台：

```
https://your-domain:8443
```

使用管理员账户登录，开始使用 {产品名称}。

## 配置向导

安装完成后，建议按以下顺序完成配置：

1. ✅ [网络设置](../features/network)
2. ✅ [用户管理](../features/users)
3. ✅ [安全策略](../features/security)
4. ✅ [集成配置](../features/integration)

## 常见问题

**Q：安装失败怎么办？**

A：检查系统日志 `/var/log/{product-slug}/install.log` 获取详细错误信息。

**Q：如何获取许可证？**

A：请联系我们的销售团队或访问 [官方网站](https://example.com) 申请试用。

**Q：升级到新版本需要注意什么？**

A：请先备份数据，然后参考 [升级指南](./update) 进行操作。
