---
id: intro
title: YP.JsonApi 简介
sidebar_label: 简介
---

# YP.JsonApi 产品简介

YP.JsonApi 是一款强大的 .NET 动态 JSON API 框架，帮助企业快速构建和部署 API 服务，无需编写繁琐的控制器代码。

## 核心特性

- **动态 API 注册**：通过 JSON 配置文件定义 API 端点，支持多种 HTTP 方法
- **自定义处理器**：支持灵活的动态 API 处理器实现，满足复杂业务逻辑
- **Swagger 集成**：自动生成 API 文档，提供交互式测试界面
- **JWT 认证**：内置认证和授权支持，保护 API 安全
- **全局变量**：提供全局变量服务，方便跨请求数据共享
- **CORS 支持**：灵活的跨域配置，便于前端集成
- **可扩展性**：通过扩展方法轻松集成到 ASP.NET Core 项目中

## 为什么选择 YP.JsonApi？

### 1. 快速开发

通过配置文件而非代码定义 API，大幅缩短开发周期。简单的 JSON 配置即可创建功能完整的 API 端点。

### 2. 灵活性高

支持自定义处理器，满足复杂业务逻辑需求。动态 API 注册表允许运行时扩展功能。

### 3. 文档完善

内置 Swagger UI，自动生成 API 文档，提供交互式测试界面，降低 API 调试和集成成本。

### 4. 安全性强

内置 JWT 认证和授权机制，支持 API 级别权限控制，保护您的 API 安全。

## 快速开始

请参阅 [快速开始指南](./getting-started/quickstart) 了解如何快速上手使用 YP.JsonApi。

## 技术规格

| 规格项 | 说明 |
|-------|------|
| 目标框架 | .NET 10.0 |
| 依赖 | ASP.NET Core 10.0 |
| 支持的 HTTP 方法 | GET、POST、PUT、DELETE |
| 文档工具 | Swashbuckle.AspNetCore |

## 获取帮助

- 📖 查看完整 [产品文档](./getting-started/quickstart)
- 💬 加入社区讨论
- 📧 联系技术支持
