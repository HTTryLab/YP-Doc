---
id: quickstart
title: 快速开始
sidebar_label: 快速开始
---

# 快速开始指南

本指南将帮助您在最短时间内完成 YP.Scheduler 的配置和使用。

## 前置要求

### 系统要求

- **操作系统**: Windows、macOS、Linux
- **.NET SDK**: 8.0 或更高版本
- **开发工具**: Visual Studio 2022、VS Code 或其他支持 .NET 的 IDE

### 软件依赖

- .NET 8.0 SDK
- Microsoft.Extensions.DependencyInjection（部分项目类型需要）

## 安装步骤

### 1. ASP.NET Core 项目

#### 1.1 安装 NuGet 包

```bash
dotnet add package YP.TimedJob
```

#### 1.2 配置服务

在`Program.cs`文件中注册定时任务服务：

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

#### 1.3 创建定时任务

创建一个继承自`Job`的类，并使用`[Invoke]`特性标记要执行的方法：

```csharp
using YP.TimedJob.Core;

public class TestJob : Job
{
    [Invoke(Begin = "2024-01-01 00:00:00", Interval = 5000, SkipWhileExecuting = true)]
    public void RunEvery5Seconds()
    {
        Console.WriteLine($"Every 5 seconds job executed at: {DateTime.Now}");
    }

    [Invoke(Begin = "2024-01-01 00:00:00", Interval = 10000, SkipWhileExecuting = false)]
    public async Task RunEvery10SecondsAsync()
    {
        await Task.Delay(2000);
        Console.WriteLine($"Every 10 seconds async job executed at: {DateTime.Now}");
    }
}
```

### 2. WinForm 项目

#### 2.1 安装依赖

在WinForm项目中安装以下包：
- YP.TimedJob
- Microsoft.Extensions.DependencyInjection

#### 2.2 注册服务和启动定时任务

在Form的构造函数中初始化依赖注入并获取JobScheduler实例：

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

        // 创建依赖注入容器
        var services = new ServiceCollection();
        services.AddTimedJob();
        var serviceProvider = services.BuildServiceProvider();

        // 获取JobScheduler实例
        _jobScheduler = serviceProvider.GetRequiredService<JobScheduler>();
    }

    private void Form1_Load(object sender, EventArgs e)
    {
        // 启动定时任务
        _jobScheduler.RegisterJobs(Assembly.GetExecutingAssembly());
        _jobScheduler.Start();
    }

    private void Form1_FormClosing(object sender, FormClosingEventArgs e)
    {
        // 停止定时任务
        _jobScheduler.Stop();
    }
}
```

### 3. 控制台项目

```csharp
using Microsoft.Extensions.DependencyInjection;
using YP.TimedJob.Core;
using YP.TimedJob.Extensions;
using System.Reflection;

class Program
{
    static void Main(string[] args)
    {
        // 创建依赖注入容器
        var services = new ServiceCollection();
        services.AddTimedJob();
        var serviceProvider = services.BuildServiceProvider();

        // 获取JobScheduler实例
        var jobScheduler = serviceProvider.GetRequiredService<JobScheduler>();

        // 注册和启动定时任务
        jobScheduler.RegisterJobs(Assembly.GetExecutingAssembly());
        jobScheduler.Start();

        Console.WriteLine("定时任务已启动，按任意键退出...");
        Console.ReadKey();

        // 停止定时任务
        jobScheduler.Stop();
    }
}
```

## 特性参数说明

`[Invoke]`特性支持以下参数：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| Begin | string | 任务开始执行的时间，格式为 "yyyy-MM-dd HH:mm:ss" | 当前时间 |
| Interval | int | 任务执行的时间间隔，单位为毫秒 | 1000 |
| SkipWhileExecuting | bool | 是否等待上一个任务执行完成，true 为等待 | true |

## 配置向导

安装完成后，建议按以下顺序完成配置：

1. ✅ [安装和集成](../features/feature1)
2. ✅ [创建和配置定时任务](../features/feature2)
3. ✅ [API 参考](../api-reference/overview)

## 常见问题

**Q: 如何自定义日志记录？**

A: 实现`IJobLogger`接口，然后在服务注册时替换默认的日志实现。

**Q: 如何暂停和恢复定时任务？**

A: 当前版本可通过`JobScheduler.Stop()`和`JobScheduler.Start()`方法控制任务的启动和停止。

**Q: 支持 Cron 表达式吗？**

A: 当前版本使用简单的时间间隔配置，未来版本可能会支持 Cron 表达式。
