---
id: overview
title: API 参考
sidebar_label: API 参考
---

# API 参考

本页面提供 YP.Scheduler 的主要 API 参考文档。

## 扩展方法

### AddTimedJob

在 `IServiceCollection` 上注册定时任务所需的服务。

```csharp
public static IServiceCollection AddTimedJob(this IServiceCollection services)
```

**返回值**: 返回 `IServiceCollection`，支持链式调用。

**示例**:
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTimedJob();
```

### UseTimedJob

在 `WebApplication` 上配置定时任务中间件并启动任务调度。

```csharp
public static WebApplication UseTimedJob(this WebApplication app)
```

**返回值**: 返回 `WebApplication`，支持链式调用。

**示例**:
```csharp
var app = builder.Build();
app.UseTimedJob();
app.Run();
```

## 核心类

### Job

定时任务基类，所有自定义任务类都应继承此类。

```csharp
public abstract class Job
{
}
```

**用法**:
```csharp
public class MyJob : Job
{
    // 任务方法
}
```

### InvokeAttribute

任务配置特性，用于标记任务方法并配置调度参数。

```csharp
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
public class InvokeAttribute : Attribute
{
    public string Begin { get; set; }
    public int Interval { get; set; }
    public bool SkipWhileExecuting { get; set; }
}
```

**属性**:
- `Begin` - 任务开始时间，格式为 "yyyy-MM-dd HH:mm:ss"
- `Interval` - 执行间隔，单位毫秒
- `SkipWhileExecuting` - 是否跳过正在执行的任务

**用法**:
```csharp
[Invoke(Begin = "2024-01-01 00:00:00", Interval = 5000, SkipWhileExecuting = true)]
public void MyTask()
{
    // 任务逻辑
}
```

### JobScheduler

任务调度器核心类，负责任务的注册和调度执行。

```csharp
public class JobScheduler
{
    public JobScheduler();
    public JobScheduler(IJobLogger logger);
    
    public void Start();
    public void Stop();
    public void RegisterJobs(Assembly assembly);
}
```

**方法**:
- `Start()` - 启动任务调度
- `Stop()` - 停止任务调度
- `RegisterJobs(Assembly)` - 从指定程序集注册所有任务

**用法**:
```csharp
var scheduler = new JobScheduler();
scheduler.RegisterJobs(Assembly.GetExecutingAssembly());
scheduler.Start();
```

## 接口

### IJobLogger

日志接口，用于自定义日志实现。

```csharp
public interface IJobLogger
{
    void Info(string message);
    void Error(string message, Exception ex = null);
}
```

**方法**:
- `Info(string message)` - 记录信息日志
- `Error(string message, Exception ex = null)` - 记录错误日志

**实现示例**:
```csharp
public class CustomLogger : IJobLogger
{
    public void Info(string message)
    {
        Console.WriteLine($"[INFO] {message}");
    }

    public void Error(string message, Exception ex = null)
    {
        Console.WriteLine($"[ERROR] {message}");
        if (ex != null)
        {
            Console.WriteLine(ex.ToString());
        }
    }
}
```

## 内置实现

### ConsoleJobLogger

默认的控制台日志实现。

```csharp
public class ConsoleJobLogger : IJobLogger
{
    public void Info(string message);
    public void Error(string message, Exception ex = null);
}
```

**用法**: 当未注册自定义日志时，系统会自动使用此实现。

## 项目结构

```
YP.TimedJob/
├── Core/
│   ├── Job.cs                    - 定时任务基类
│   ├── InvokeAttribute.cs        - 任务配置特性
│   ├── JobScheduler.cs           - 任务调度器
│   ├── IJobLogger.cs             - 日志接口
│   └── ConsoleJobLogger.cs      - 默认日志实现
└── Extensions/
    ├── ServiceCollectionExtensions.cs  - 服务注册扩展
    └── ApplicationBuilderExtensions.cs - 中间件扩展
```

## 核心 API 列表

| 类/接口 | 命名空间 | 说明 |
|---------|---------|------|
| Job | YP.TimedJob.Core | 定时任务基类 |
| InvokeAttribute | YP.TimedJob.Core | 任务配置特性 |
| JobScheduler | YP.TimedJob.Core | 任务调度器 |
| IJobLogger | YP.TimedJob.Core | 日志接口 |
| ConsoleJobLogger | YP.TimedJob.Core | 控制台日志实现 |
| ServiceCollectionExtensions | YP.TimedJob.Extensions | 服务注册扩展 |
| ApplicationBuilderExtensions | YP.TimedJob.Extensions | 中间件扩展 |

## 使用示例汇总

### 完整的 ASP.NET Core 示例

```csharp
using YP.TimedJob.Extensions;
using YP.TimedJob.Core;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTimedJob();

var app = builder.Build();
app.UseTimedJob();
app.Run();

public class DemoJob : Job
{
    [Invoke(Interval = 5000, SkipWhileExecuting = true)]
    public void Run()
    {
        Console.WriteLine($"Job executed at: {DateTime.Now}");
    }
}
```

### 完整的控制台示例

```csharp
using Microsoft.Extensions.DependencyInjection;
using YP.TimedJob.Extensions;
using YP.TimedJob.Core;
using System.Reflection;

var services = new ServiceCollection();
services.AddTimedJob();
var provider = services.BuildServiceProvider();

var scheduler = provider.GetRequiredService<JobScheduler>();
scheduler.RegisterJobs(Assembly.GetExecutingAssembly());
scheduler.Start();

Console.WriteLine("Press any key to exit...");
Console.ReadKey();
scheduler.Stop();

public class ConsoleJob : Job
{
    [Invoke(Interval = 5000)]
    public void Run()
    {
        Console.WriteLine("Console job running...");
    }
}
```
