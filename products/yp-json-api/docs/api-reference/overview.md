---
id: overview
title: API 参考
sidebar_label: API 参考
---

# API 参考

本页面提供 YP.JsonApi 的主要 API 参考文档。

## 扩展方法

### AddJsonApiServices

在 `IServiceCollection` 上注册 YP.JsonApi 所需的所有服务。

```csharp
public static IServiceCollection AddJsonApiServices(this IServiceCollection services)
```

**返回值：** 返回 `IServiceCollection`，支持链式调用。

**示例：**

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddJsonApiServices();
```

### UseJsonApi

在 `WebApplication` 上配置 YP.JsonApi 中间件和端点。

```csharp
public static WebApplication UseJsonApi(this WebApplication app, int? configuredPort = null)
```

**参数：**
- `configuredPort`：可选的端口号，用于设置全局变量和 Swagger URL

**返回值：** 返回 `WebApplication`，支持链式调用。

**示例：**

```csharp
var app = builder.Build();
app.UseJsonApi(5000);
app.Run();
```

## 核心接口

### IDynamicApiHandler

自定义 API 处理器的接口。

```csharp
public interface IDynamicApiHandler
{
    Task<bool> HandleAsync(HttpContext context, UrlConfig apiConfig);
}
```

**方法：**
- `HandleAsync`：处理 API 请求的方法
  - `context`：HTTP 上下文
  - `apiConfig`：API 配置
  - 返回：`true` 表示已处理请求，`false` 表示使用默认响应

### IDynamicApiHandlerRegistry

动态 API 处理器注册表。

```csharp
public interface IDynamicApiHandlerRegistry
{
    bool TryGet(string handlerName, out Func<IServiceProvider, IDynamicApiHandler>? handlerFactory);
    void Register(string handlerName, Func<IServiceProvider, IDynamicApiHandler> handlerFactory);
}
```

**方法：**
- `TryGet`：尝试获取处理器工厂
- `Register`：注册处理器工厂

### IConfigService

配置服务接口。

```csharp
public interface IConfigService
{
    ServerConfig? GetConfig();
}
```

**方法：**
- `GetConfig`：获取服务器配置

### IGlobalVariableService

全局变量服务接口。

```csharp
public interface IGlobalVariableService
{
    T? Get<T>(string key);
    void Set<T>(string key, T value);
    bool TryGet<T>(string key, out T? value);
}
```

**方法：**
- `Get`：获取全局变量
- `Set`：设置全局变量
- `TryGet`：尝试获取全局变量

## 数据模型

### ServerConfig

服务器配置模型。

```csharp
public class ServerConfig
{
    public string? ServerName { get; set; }
    public int Port { get; set; }
    public List<ApiGroup>? ServerUrls { get; set; }
}
```

### ApiGroup

API 分组模型。

```csharp
public class ApiGroup
{
    public string? Category { get; set; }
    public List<UrlConfig>? ApiLists { get; set; }
}
```

### UrlConfig

API 端点配置模型。

```csharp
public class UrlConfig
{
    public string? Url { get; set; }
    public string? UrlName { get; set; }
    public string? Description { get; set; }
    public string? RequestType { get; set; }
    public string? RequestBody { get; set; }
    public string? ResponseBody { get; set; }
    public bool? RequireAuth { get; set; }
    public bool? AllowCors { get; set; }
    public string? FunctionClass { get; set; }
    public Dictionary<string, string>? HeaderMap { get; set; }
}
```

### ApiConfigMetadata

API 配置元数据，用于 Swagger 文档。

```csharp
public class ApiConfigMetadata
{
    public string? Category { get; set; }
    public string? RequestBody { get; set; }
    public string? ResponseBody { get; set; }
    public Dictionary<string, string>? HeaderMap { get; set; }
}
```

## 特性

### DynamicApiAttribute

标记动态 API 处理器的特性。

```csharp
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class DynamicApiAttribute : Attribute
{
    public string Name { get; }
    
    public DynamicApiAttribute(string name)
    {
        Name = name;
    }
}
```

**用法：**

```csharp
[DynamicApi("MyHandler")]
public class MyHandler : IDynamicApiHandler
{
    // ...
}
```

## 全局变量

### GlobalVariableConstants

全局变量常量定义。

```csharp
public static class GlobalVariableConstants
{
    public const string APP_VERSION = "AppVersion";
    public const string APP_ENVIRONMENT = "AppEnvironment";
    public const string STARTUP_TIME = "StartupTime";
    public const string SERVER_URL = "ServerUrl";
}
```

### GlobalVariables

全局变量静态访问器。

```csharp
public static class GlobalVariables
{
    public static void Initialize(IGlobalVariableService service);
    public static T? Get<T>(string key);
    public static void Set<T>(string key, T value);
}
```

**用法：**

```csharp
GlobalVariables.Set("MyKey", "MyValue");
var value = GlobalVariables.Get<string>("MyKey");
```

## 中间件

### OpenApiSecurityPatchMiddleware

用于修复 Swagger/OpenAPI 安全配置的中间件。

```csharp
public class OpenApiSecurityPatchMiddleware
{
    public OpenApiSecurityPatchMiddleware(RequestDelegate next);
    public Task InvokeAsync(HttpContext context);
}
```

### PerApiAuthHandler

Per-API 认证处理器。

```csharp
public class PerApiAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public PerApiAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock);
}
```
