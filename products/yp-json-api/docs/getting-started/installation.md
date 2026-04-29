---
id: installation
title: 安装指南
sidebar_label: 安装指南
---

# 详细安装指南

本文档提供 YP.JsonApi 的完整安装流程说明。

## 安装方式

YP.JsonApi 支持通过 NuGet 包管理器安装：

## NuGet 安装

### 1. 通过 NuGet Package Manager

在 Visual Studio 中右键点击项目，选择 "Manage NuGet Packages"，搜索 "YP.JsonApi" 并安装。

### 2. 通过 .NET CLI

```bash
dotnet add package YP.JsonApi
```

### 3. 通过 Package Manager Console

```powershell
Install-Package YP.JsonApi
```

## 项目配置

### 1. 添加服务注册

在 `Program.cs` 中添加服务注册：

```csharp
using YP.JsonApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

// 添加 YP.JsonApi 服务
builder.Services.AddJsonApiServices();

var app = builder.Build();

// 使用 YP.JsonApi
app.UseJsonApi(5000);

app.Run();
```

### 2. 创建配置文件

在项目根目录创建 `server-config.json`：

```json
{
  "serverName": "My API Server",
  "port": 5000,
  "serverUrls": [
    {
      "category": "示例API",
      "apiLists": [
        {
          "url": "/api/hello",
          "urlName": "Hello API",
          "description": "示例问候接口",
          "requestType": "GET",
          "responseBody": "{\"message\": \"Hello, World!\"}",
          "requireAuth": false,
          "allowCors": true
        }
      ]
    }
  ]
}
```

### 3. 配置文件复制

在 `.csproj` 文件中添加配置文件复制配置：

```xml
<ItemGroup>
  <Content Include="server-config.json">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
  </Content>
</ItemGroup>
```

## 运行项目

```bash
dotnet run
```

访问 Swagger UI：`http://localhost:5000/swagger`

## 自定义 API 处理器

### 1. 创建处理器类

```csharp
using YP.JsonApi.Services.ApiHandler;
using YP.JsonApi.Models;
using Microsoft.AspNetCore.Http;

[DynamicApi("MyCustomHandler")]
public class MyCustomHandler : IDynamicApiHandler
{
    public async Task<bool> HandleAsync(HttpContext context, UrlConfig apiConfig)
    {
        // 自定义业务逻辑
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"result\": \"Custom handler executed!\"}");
        return true;
    }
}
```

### 2. 注册处理器

处理器会通过 `[DynamicApi]` 特性自动注册到 DI 容器中。

## 升级指南

### 更新 NuGet 包

```bash
dotnet add package YP.JsonApi --version [新版本号]
```

### 检查 Breaking Changes

更新前请查看 [发布说明](../api-reference/overview) 了解变更内容。

## 卸载

### 移除 NuGet 包

```bash
dotnet remove package YP.JsonApi
```

### 清理代码

从 `Program.cs` 中移除相关的服务注册和中间件配置。
