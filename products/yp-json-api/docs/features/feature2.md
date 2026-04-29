---
id: feature2
title: 自定义处理器
sidebar_label: 自定义处理器
---

# 自定义 API 处理器

YP.JsonApi 提供了强大的自定义处理器机制，允许您实现复杂的业务逻辑。

## 处理器基础

### 创建处理器

创建一个实现 `IDynamicApiHandler` 接口的类：

```csharp
using YP.JsonApi.Services.ApiHandler;
using YP.JsonApi.Models;
using Microsoft.AspNetCore.Http;

[DynamicApi("MyHandler")]
public class MyHandler : IDynamicApiHandler
{
    public async Task<bool> HandleAsync(HttpContext context, UrlConfig apiConfig)
    {
        // 业务逻辑
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"result\": \"success\"}");
        return true;
    }
}
```

### 在配置中使用处理器

在 `server-config.json` 中引用处理器：

```json
{
  "url": "/api/custom",
  "requestType": "GET",
  "functionClass": "MyHandler",
  "requireAuth": false,
  "allowCors": true
}
```

## 处理器示例

### 示例 1：数据库查询

```csharp
using Microsoft.EntityFrameworkCore;

[DynamicApi("GetUsers")]
public class GetUsersHandler : IDynamicApiHandler
{
    private readonly MyDbContext _dbContext;

    public GetUsersHandler(MyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> HandleAsync(HttpContext context, UrlConfig apiConfig)
    {
        var users = await _dbContext.Users.ToListAsync();
        
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(users);
        return true;
    }
}
```

### 示例 2：参数验证

```csharp
using System.Text.Json;

[DynamicApi("CreateOrder")]
public class CreateOrderHandler : IDynamicApiHandler
{
    public async Task<bool> HandleAsync(HttpContext context, UrlConfig apiConfig)
    {
        // 读取请求体
        using var reader = new StreamReader(context.Request.Body);
        var body = await reader.ReadToEndAsync();
        
        try
        {
            var order = JsonSerializer.Deserialize<Order>(body);
            
            if (order == null || string.IsNullOrEmpty(order.ProductId))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsJsonAsync(new { error = "Invalid order data" });
                return true;
            }
            
            // 保存订单逻辑...
            
            context.Response.StatusCode = 201;
            await context.Response.WriteAsJsonAsync(new { success = true, orderId = Guid.NewGuid() });
            return true;
        }
        catch (JsonException)
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsJsonAsync(new { error = "Invalid JSON format" });
            return true;
        }
    }
}

public class Order
{
    public string ProductId { get; set; }
    public int Quantity { get; set; }
}
```

### 示例 3：使用全局变量

```csharp
using YP.JsonApi.Services.Global;

[DynamicApi("GetServerInfo")]
public class GetServerInfoHandler : IDynamicApiHandler
{
    public async Task<bool> HandleAsync(HttpContext context, UrlConfig apiConfig)
    {
        var info = new
        {
            version = GlobalVariables.Get<string>(GlobalVariableConstants.APP_VERSION),
            environment = GlobalVariables.Get<string>(GlobalVariableConstants.APP_ENVIRONMENT),
            startupTime = GlobalVariables.Get<DateTime>(GlobalVariableConstants.STARTUP_TIME),
            serverUrl = GlobalVariables.Get<string>(GlobalVariableConstants.SERVER_URL)
        };
        
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(info);
        return true;
    }
}
```

## 处理器返回值

- 返回 `true`：表示处理器已处理请求，不再使用默认响应
- 返回 `false`：表示处理器未处理请求，使用配置中的默认响应

## 依赖注入

处理器支持构造函数依赖注入，可以注入任何已注册到 DI 容器的服务：

```csharp
[DynamicApi("ServiceHandler")]
public class ServiceHandler : IDynamicApiHandler
{
    private readonly ILogger<ServiceHandler> _logger;
    private readonly IConfiguration _configuration;

    public ServiceHandler(ILogger<ServiceHandler> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public async Task<bool> HandleAsync(HttpContext context, UrlConfig apiConfig)
    {
        _logger.LogInformation("Processing request...");
        // 使用注入的服务
        return true;
    }
}
```
