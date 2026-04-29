---
id: quickstart
title: 快速开始
sidebar_label: 快速开始
---

# 快速开始指南

本指南将帮助您在最短时间内完成 YP.JsonApi 的配置和使用。

## 前置要求

### 系统要求

- **操作系统**：Windows、macOS、Linux
- **.NET SDK**：10.0 或更高版本
- **开发工具**：Visual Studio 2022、VS Code 或其他支持 .NET 的 IDE

### 软件依赖

- .NET 10.0 SDK
- ASP.NET Core 10.0
- Swashbuckle.AspNetCore 10.1.7

## 安装步骤

### 步骤 1：创建新项目

创建一个新的 ASP.NET Core Web API 项目：

```bash
dotnet new webapi -n MyJsonApiProject
cd MyJsonApiProject
```

### 步骤 2：安装 YP.JsonApi

```bash
dotnet add package YP.JsonApi
```

### 步骤 3：配置项目

修改 `Program.cs`：

```csharp
using YP.JsonApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

// 添加 YP.JsonApi 服务
builder.Services.AddJsonApiServices();

var app = builder.Build();

// 使用 YP.JsonApi，指定端口为 5000
app.UseJsonApi(5000);

app.Run();
```

### 步骤 4：创建配置文件

在项目根目录创建 `server-config.json`：

```json
{
  "serverName": "演示服务器",
  "port": 5000,
  "serverUrls": [
    {
      "category": "基础API",
      "apiLists": [
        {
          "url": "/api/health",
          "urlName": "健康检查",
          "description": "检查服务状态",
          "requestType": "GET",
          "responseBody": "{\"status\": \"ok\", \"timestamp\": \"2024-01-01T00:00:00Z\"}",
          "requireAuth": false,
          "allowCors": true
        },
        {
          "url": "/api/greet",
          "urlName": "问候接口",
          "description": "返回问候信息",
          "requestType": "POST",
          "requestBody": "{\"name\": \"string\"}",
          "responseBody": "{\"message\": \"Hello, {name}!\"}",
          "requireAuth": false,
          "allowCors": true
        }
      ]
    }
  ]
}
```

### 步骤 5：更新项目文件

编辑 `.csproj` 文件，确保配置文件被复制到输出目录：

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="YP.JsonApi" Version="1.0.0" />
  </ItemGroup>

  <ItemGroup>
    <Content Include="server-config.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </Content>
  </ItemGroup>
</Project>
```

### 步骤 6：运行项目

```bash
dotnet run
```

### 步骤 7：验证安装

打开浏览器访问 Swagger UI：

```
http://localhost:5000/swagger
```

您应该能看到 Swagger 界面，其中包含了配置文件中定义的 API 端点。

## 配置向导

安装完成后，建议按以下顺序完成配置：

1. ✅ [配置 API 端点](../features/feature1)
2. ✅ [添加自定义处理器](../features/feature2)
3. ✅ [配置认证授权](../api-reference/overview)
4. ✅ [集成 Swagger 文档](../api-reference/overview)

## 常见问题

**Q：配置文件加载失败怎么办？**

A：确保 `server-config.json` 文件存在于项目根目录，并且在 `.csproj` 中正确配置了 `CopyToOutputDirectory`。

**Q：如何添加更多 API 端点？**

A：编辑 `server-config.json` 文件，在 `serverUrls` 数组中添加新的 API 配置项。

**Q：自定义处理器如何工作？**

A：创建实现 `IDynamicApiHandler` 接口的类，并使用 `[DynamicApi]` 特性标记，处理器会自动注册到系统中。
