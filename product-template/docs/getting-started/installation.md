---
id: installation
title: 详细安装
sidebar_label: 详细安装
---

# 详细安装指南

本文档提供 {产品名称} 的完整安装流程说明。

## 安装方式

{产品名称} 支持多种安装方式：

- [Docker 部署](#docker-部署)
- [包管理器安装](#包管理器安装)
- [手动编译安装](#手动编译安装)

## Docker 部署

最简单的部署方式，推荐用于开发和测试环境。

### 1. 拉取镜像

```bash
docker pull example/{product-slug}:latest
```

### 2. 启动容器

```bash
docker run -d \
  -p 8443:8443 \
  -v {product-slug}-data:/data \
  --name {product-slug} \
  example/{product-slug}:latest
```

### 3. 访问服务

```
https://localhost:8443
```

## 包管理器安装

### Linux (Ubuntu/Debian)

```bash
# 添加软件源
curl -s https://example.com/key.gpg | sudo apt-key add -
echo "deb https://example.com/repo stable main" | sudo tee /etc/apt/sources.list.d/{product-slug}.list

# 安装
sudo apt update
sudo apt install {product-slug}
```

### Linux (CentOS/RHEL)

```bash
# 添加软件源
sudo yum-config-manager --add-repo https://example.com/repo/{product-slug}.repo

# 安装
sudo yum install {product-slug}
```

### macOS

```bash
brew install example/tap/{product-slug}
```

## 手动编译安装

适合需要自定义配置的高级用户。

### 1. 克隆源码

```bash
git clone https://github.com/example/{product-slug}.git
cd {product-slug}
```

### 2. 编译

```bash
# 安装依赖
npm install

# 编译
npm run build
```

### 3. 安装

```bash
sudo npm install -g .
```

## 配置文件

{产品名称} 的主要配置文件位于：

- Linux: `/etc/{product-slug}/config.yml`
- Windows: `C:\ProgramData\{product-slug}\config.yml`
- macOS: `/usr/local/etc/{product-slug}/config.yml`

### 配置示例

```yaml
server:
  host: 0.0.0.0
  port: 8443
  tls:
    enabled: true
    cert: /path/to/cert.pem
    key: /path/to/key.pem

database:
  type: postgresql
  host: localhost
  port: 5432
  name: {product-slug}
  user: {product-slug}
  password: your-password

logging:
  level: info
  file: /var/log/{product-slug}/app.log
```

## 升级指南

### 备份数据

```bash
# 备份数据库
{product-slug} backup db --output backup.sql

# 备份配置
tar -czf config-backup.tar.gz /etc/{product-slug}
```

### 执行升级

```bash
# 停止服务
sudo systemctl stop {product-slug}

# 更新软件
sudo apt update && sudo apt upgrade {product-slug}

# 启动服务
sudo systemctl start {product-slug}
```

## 卸载

### 完全卸载

```bash
# 停止服务
sudo systemctl stop {product-slug}
sudo systemctl disable {product-slug}

# 卸载软件
sudo apt remove {product-slug}
sudo apt autoremove

# 删除数据
sudo rm -rf /var/lib/{product-slug}
sudo rm -rf /etc/{product-slug}
sudo rm -rf /var/log/{product-slug}
```
