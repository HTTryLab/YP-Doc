---
id: feature1
title: 功能1标题
sidebar_label: 功能1标题
---

# 功能1详细说明

本页面介绍 {产品名称} 的核心功能1的详细使用方法。

## 功能概述

{功能1的概述说明}

## 如何使用

### 步骤1：准备工作

{准备工作的详细说明}

```bash
# 相关命令示例
{product-slug} prepare --config config.yml
```

### 步骤2：配置参数

{配置参数的详细说明}

```yaml
feature1:
  option1: value1
  option2: value2
  option3: value3
```

### 步骤3：执行操作

{执行操作的详细说明}

```bash
{product-slug} feature1 --run
```

## 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `option1` | string | `default1` | 参数1说明 |
| `option2` | int | `100` | 参数2说明 |
| `option3` | boolean | `true` | 参数3说明 |

## 使用示例

### 示例1：基础用法

```bash
{product-slug} feature1 --option1 value1
```

### 示例2：高级用法

```bash
{product-slug} feature1 \
  --option1 value1 \
  --option2 200 \
  --option3 false
```

## 最佳实践

- ✅ 建议：{最佳实践1}
- ✅ 建议：{最佳实践2}
- ❌ 避免：{不推荐的做法}

## 故障排除

### 问题1：{常见问题1标题}

**症状**：{问题描述}

**解决方案**：{解决方法说明}

```bash
# 相关命令
{product-slug} diagnose
```

### 问题2：{常见问题2标题}

**症状**：{问题描述}

**解决方案**：{解决方法说明}
