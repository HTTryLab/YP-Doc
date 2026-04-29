---
id: feature1
title: 安装和集成
sidebar_label: 安装和集成
---

# 安装和集成

YP.Scheduler 提供了针对多种 .NET 项目类型的简单集成方案。

## 支持的项目类型

- ASP.NET Core Web 应用
- WinForm 应用
- 控制台应用
- Worker Service

## ASP.NET Core 集成

### 1. 安装 NuGet 包

```bash
dotnet add package YP.TimedJob
```

### 2. 配置服务

在 `Program.cs` 中添加服务注册：

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

### 3. 创建定时任务

```csharp
using YP.TimedJob.Core;

public class WeatherJob : Job
{
    [Invoke(Begin = "2024-01-01 00:00:00", Interval = 60000, SkipWhileExecuting = true)]
    public void FetchWeather()
    {
        Console.WriteLine($"Fetching weather data at: {DateTime.Now}");
        // 实际业务逻辑
    }
}
```

## WinForm 集成

### 1. 安装依赖

```bash
dotnet add package YP.TimedJob
dotnet add package Microsoft.Extensions.DependencyInjection
```

### 2. 初始化和启动

```csharp
using Microsoft.Extensions.DependencyInjection;
using YP.TimedJob.Core;
using YP.TimedJob.Extensions;
using System.Reflection;

public partial class MainForm : Form
{
    private readonly JobScheduler _jobScheduler;

    public MainForm()
    {
        InitializeComponent();

        var services = new ServiceCollection();
        services.AddTimedJob();
        var serviceProvider = services.BuildServiceProvider();

        _jobScheduler = serviceProvider.GetRequiredService<JobScheduler>();
    }

    private void MainForm_Load(object sender, EventArgs e)
    {
        _jobScheduler.RegisterJobs(Assembly.GetExecutingAssembly());
        _jobScheduler.Start();
    }

    private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
    {
        _jobScheduler.Stop();
    }
}
```

## 控制台应用集成

```csharp
using Microsoft.Extensions.DependencyInjection;
using YP.TimedJob.Core;
using YP.TimedJob.Extensions;
using System.Reflection;

class Program
{
    static void Main(string[] args)
    {
        var services = new ServiceCollection();
        services.AddTimedJob();
        var serviceProvider = services.BuildServiceProvider();

        var jobScheduler = serviceProvider.GetRequiredService<JobScheduler>();
        
        jobScheduler.RegisterJobs(Assembly.GetExecutingAssembly());
        jobScheduler.Start();

        Console.WriteLine("Press any key to exit...");
        Console.ReadKey();
        
        jobScheduler.Stop();
    }
}
```

## Worker Service 集成

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using YP.TimedJob.Extensions;
using YP.TimedJob.Core;
using System.Reflection;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddTimedJob();
        services.AddHostedService<Worker>();
    })
    .Build();

await host.RunAsync();

public class Worker : BackgroundService
{
    private readonly JobScheduler _jobScheduler;

    public Worker(JobScheduler jobScheduler)
    {
        _jobScheduler = jobScheduler;
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _jobScheduler.RegisterJobs(Assembly.GetExecutingAssembly());
        _jobScheduler.Start();
        return Task.CompletedTask;
    }

    public override Task StopAsync(CancellationToken cancellationToken)
    {
        _jobScheduler.Stop();
        return base.StopAsync(cancellationToken);
    }
}
```

## 配置最佳实践

1. **在应用启动时注册任务** - 确保所有任务在应用启动时完成注册
2. **优雅停止** - 在应用关闭时调用 `Stop()` 方法停止任务调度
3. **日志记录** - 使用自定义日志实现集成现有日志系统
4. **错误处理** - 在任务方法中添加 try-catch 处理业务异常
