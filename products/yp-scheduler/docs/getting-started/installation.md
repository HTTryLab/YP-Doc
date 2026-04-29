---
id: installation
title: 详细安装
sidebar_label: 详细安装
---

# 详细安装指南

本文档提供 YP.Scheduler 的完整安装流程说明。

## 安装方式

YP.Scheduler 通过 NuGet 包管理器安装，包名为 `YP.TimedJob`。

## NuGet 安装

### 1. 通过 NuGet Package Manager

在 Visual Studio 中右键点击项目，选择 "Manage NuGet Packages"，搜索 "YP.TimedJob" 并安装。

### 2. 通过 .NET CLI

```bash
dotnet add package YP.TimedJob
```

### 3. 通过 Package Manager Console

```powershell
Install-Package YP.TimedJob
```

## 项目配置

### ASP.NET Core 项目

在 `Program.cs` 中添加服务注册和中间件：

```csharp
using YP.TimedJob.Extensions;

var builder = WebApplication.CreateBuilder(args);

// 添加定时任务服务
builder.Services.AddTimedJob();

var app = builder.Build();

// 使用定时任务中间件
app.UseTimedJob();

app.Run();
```

### WinForm 项目

在 Form 的构造函数中初始化：

```csharp
using Microsoft.Extensions.DependencyInjection;
using YP.TimedJob.Core;
using YP.TimedJob.Extensions;
using System.Reflection;

public partial class Form1 : Form
{
    private readonly JobScheduler _jobScheduler;

    public Form1()
    {
        InitializeComponent();

        var services = new ServiceCollection();
        services.AddTimedJob();
        var serviceProvider = services.BuildServiceProvider();

        _jobScheduler = serviceProvider.GetRequiredService<JobScheduler>();
    }

    private void Form1_Load(object sender, EventArgs e)
    {
        _jobScheduler.RegisterJobs(Assembly.GetExecutingAssembly());
        _jobScheduler.Start();
    }

    private void Form1_FormClosing(object sender, FormClosingEventArgs e)
    {
        _jobScheduler.Stop();
    }
}
```

## 创建定时任务

### 基础示例

```csharp
using YP.TimedJob.Core;

public class MyJob : Job
{
    [Invoke(Begin = "2024-01-01 00:00:00", Interval = 5000, SkipWhileExecuting = true)]
    public void MyTask()
    {
        // 任务逻辑
        Console.WriteLine($"Task executed at: {DateTime.Now}");
    }
}
```

### 异步任务示例

```csharp
using YP.TimedJob.Core;

public class AsyncJob : Job
{
    [Invoke(Begin = "2024-01-01 00:00:00", Interval = 10000, SkipWhileExecuting = true)]
    public async Task MyAsyncTask()
    {
        await Task.Delay(1000);
        Console.WriteLine($"Async task executed at: {DateTime.Now}");
    }
}
```

### 长时间运行任务示例

```csharp
using YP.TimedJob.Core;

public class LongRunningJob : Job
{
    [Invoke(Begin = "2024-01-01 00:00:00", Interval = 30000, SkipWhileExecuting = true)]
    public void LongRunningTask()
    {
        Console.WriteLine($"Long running task started at: {DateTime.Now}");
        Thread.Sleep(5000); // 模拟长时间运行
        Console.WriteLine($"Long running task finished at: {DateTime.Now}");
    }
}
```

## 自定义日志

### 实现自定义日志

```csharp
using YP.TimedJob.Core;

public class CustomJobLogger : IJobLogger
{
    public void Info(string message)
    {
        // 自定义信息日志逻辑
        Console.WriteLine($"[INFO] {message}");
    }

    public void Error(string message, Exception ex = null)
    {
        // 自定义错误日志逻辑
        Console.WriteLine($"[ERROR] {message}");
        if (ex != null)
        {
            Console.WriteLine($"Exception: {ex}");
        }
    }
}
```

### 注册自定义日志

```csharp
using Microsoft.Extensions.DependencyInjection;
using YP.TimedJob.Extensions;
using YP.TimedJob.Core;

var builder = WebApplication.CreateBuilder(args);

// 先注册自定义日志
builder.Services.AddSingleton<IJobLogger, CustomJobLogger>();
// 再注册定时任务服务（会使用已注册的日志）
builder.Services.AddTimedJob();

var app = builder.Build();
app.UseTimedJob();
app.Run();
```

## 依赖注入

定时任务类支持依赖注入，可以在构造函数中注入所需的服务：

```csharp
using YP.TimedJob.Core;
using Microsoft.Extensions.Logging;

public class DependentJob : Job
{
    private readonly ILogger<DependentJob> _logger;
    private readonly MyService _myService;

    public DependentJob(ILogger<DependentJob> logger, MyService myService)
    {
        _logger = logger;
        _myService = myService;
    }

    [Invoke(Begin = "2024-01-01 00:00:00", Interval = 5000)]
    public void Execute()
    {
        _logger.LogInformation("Executing job...");
        _myService.DoWork();
    }
}
```

## 升级指南

### 更新 NuGet 包

```bash
dotnet add package YP.TimedJob --version [新版本号]
```

### 检查 Breaking Changes

更新前请查看 [API 参考](../api-reference/overview) 了解变更内容。

## 卸载

### 移除 NuGet 包

```bash
dotnet remove package YP.TimedJob
```

### 清理代码

从项目中移除相关的服务注册和中间件配置。
