---
id: feature2
title: 创建和配置定时任务
sidebar_label: 创建和配置定时任务
---

# 创建和配置定时任务

YP.Scheduler 通过继承 `Job` 基类和使用 `[Invoke]` 特性来定义和配置定时任务。

## 基础任务配置

### 创建任务类

```csharp
using YP.TimedJob.Core;

public class SimpleJob : Job
{
    [Invoke(Begin = "2024-01-01 00:00:00", Interval = 5000, SkipWhileExecuting = true)]
    public void Execute()
    {
        Console.WriteLine($"Task executed at: {DateTime.Now}");
    }
}
```

## 特性参数详解

### [Invoke] 特性

`[Invoke]` 特性支持以下参数：

| 参数 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| Begin | string | 否 | 任务开始执行的时间，格式为 "yyyy-MM-dd HH:mm:ss" | 当前时间 |
| Interval | int | 否 | 任务执行的时间间隔，单位为毫秒 | 1000 |
| SkipWhileExecuting | bool | 否 | 是否等待上一个任务执行完成，true 为等待 | true |

### Begin 参数示例

```csharp
// 从指定时间开始
[Invoke(Begin = "2024-06-01 08:00:00", Interval = 3600000)]

// 从当前时间开始
[Invoke(Interval = 5000)]
```

### Interval 参数示例

```csharp
// 每 5 秒执行一次
[Invoke(Interval = 5000)]

// 每分钟执行一次
[Invoke(Interval = 60000)]

// 每小时执行一次
[Invoke(Interval = 3600000)]
```

### SkipWhileExecuting 参数示例

```csharp
// 等待上一个任务完成（避免重叠执行）
[Invoke(SkipWhileExecuting = true)]

// 不等待，即使上一个任务还在执行也会启动新任务
[Invoke(SkipWhileExecuting = false)]
```

## 同步和异步任务

### 同步任务

```csharp
[Invoke(Interval = 5000)]
public void SyncTask()
{
    Console.WriteLine("Sync task executed");
    Thread.Sleep(1000); // 同步操作
}
```

### 异步任务

```csharp
[Invoke(Interval = 5000)]
public async Task AsyncTask()
{
    Console.WriteLine("Async task started");
    await Task.Delay(1000); // 异步操作
    Console.WriteLine("Async task completed");
}
```

## 多个任务

一个 Job 类中可以定义多个任务方法：

```csharp
public class MultiTaskJob : Job
{
    [Invoke(Interval = 5000)]
    public void Task1()
    {
        Console.WriteLine("Task 1 executed");
    }

    [Invoke(Interval = 10000)]
    public void Task2()
    {
        Console.WriteLine("Task 2 executed");
    }

    [Invoke(Interval = 15000)]
    public async Task Task3Async()
    {
        await Task.Delay(1000);
        Console.WriteLine("Task 3 (async) executed");
    }
}
```

## 错误处理

### 在任务方法中处理异常

```csharp
[Invoke(Interval = 5000)]
public void TaskWithErrorHandling()
{
    try
    {
        Console.WriteLine("Task executing...");
        // 可能抛出异常的代码
        throw new InvalidOperationException("Something went wrong");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error occurred: {ex.Message}");
        // 错误处理逻辑
    }
}
```

### 使用自定义日志记录错误

```csharp
public class LoggedJob : Job
{
    private readonly IJobLogger _logger;

    public LoggedJob(IJobLogger logger)
    {
        _logger = logger;
    }

    [Invoke(Interval = 5000)]
    public void TaskWithLogging()
    {
        try
        {
            _logger.Info("Starting task...");
            // 业务逻辑
            _logger.Info("Task completed successfully");
        }
        catch (Exception ex)
        {
            _logger.Error($"Task failed: {ex.Message}", ex);
        }
    }
}
```

## 使用依赖注入

### 注入服务

```csharp
public class DependentJob : Job
{
    private readonly ILogger<DependentJob> _logger;
    private readonly IConfiguration _configuration;
    private readonly MyDatabaseService _dbService;

    public DependentJob(
        ILogger<DependentJob> logger,
        IConfiguration configuration,
        MyDatabaseService dbService)
    {
        _logger = logger;
        _configuration = configuration;
        _dbService = dbService;
    }

    [Invoke(Interval = 30000)]
    public async Task SyncDataAsync()
    {
        _logger.LogInformation("Starting data sync...");
        
        var data = await _dbService.FetchDataAsync();
        // 数据同步逻辑
        
        _logger.LogInformation("Data sync completed");
    }
}
```

## 长时间运行任务

对于执行时间较长的任务，建议设置 `SkipWhileExecuting = true` 避免任务重叠：

```csharp
public class LongRunningJob : Job
{
    [Invoke(Interval = 60000, SkipWhileExecuting = true)]
    public async Task LongRunningTaskAsync()
    {
        Console.WriteLine($"Task started at: {DateTime.Now}");
        
        // 模拟长时间运行的任务
        await Task.Delay(45000); // 45秒
        
        Console.WriteLine($"Task finished at: {DateTime.Now}");
    }
}
```

## 任务配置示例

### 数据备份任务

```csharp
public class BackupJob : Job
{
    [Invoke(Begin = "2024-01-01 02:00:00", Interval = 86400000, SkipWhileExecuting = true)]
    public async Task DailyBackupAsync()
    {
        Console.WriteLine($"Starting backup at: {DateTime.Now}");
        // 备份逻辑
        await Task.Delay(1000);
        Console.WriteLine("Backup completed");
    }
}
```

### 健康检查任务

```csharp
public class HealthCheckJob : Job
{
    [Invoke(Interval = 30000, SkipWhileExecuting = false)]
    public async Task CheckHealthAsync()
    {
        var healthStatus = await CheckServicesAsync();
        Console.WriteLine($"Health check: {healthStatus} at {DateTime.Now}");
    }

    private Task<string> CheckServicesAsync()
    {
        // 健康检查逻辑
        return Task.FromResult("Healthy");
    }
}
```

### 缓存刷新任务

```csharp
public class CacheRefreshJob : Job
{
    private readonly ICacheService _cacheService;

    public CacheRefreshJob(ICacheService cacheService)
    {
        _cacheService = cacheService;
    }

    [Invoke(Interval = 300000, SkipWhileExecuting = true)] // 5分钟
    public async Task RefreshCacheAsync()
    {
        Console.WriteLine("Refreshing cache...");
        await _cacheService.RefreshAllAsync();
        Console.WriteLine("Cache refreshed");
    }
}
```
