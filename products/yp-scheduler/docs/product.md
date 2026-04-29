---
name: YP.Scheduler
slug: yp-scheduler
title: YP.Scheduler
description: 轻量级的.NET定时任务框架，支持ASP.NET Core、WinForm、控制台等多种项目类型
longDescription: YP.Scheduler（YP.TimedJob）是一个轻量级的.NET定时任务框架，通过声明式配置和特性标记即可快速完成任务调度配置。支持灵活的时间配置、执行控制、同步/异步任务、错误处理、依赖注入等功能。
icon: ⏰
color: "#10b981"
version: 1.0.1
category: 后端框架
tags:
  - .NET
  - 定时任务
  - 任务调度
  - Job
  - Scheduler
author: YP Team
logo: https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20software%20logo%20for%20a%20.NET%20scheduler%20task%20framework%20with%20green%20and%20dark%20colors&image_size=square
github: https://github.com/your-org/yp-scheduler
website: https://github.com/your-org/yp-scheduler
docsRoute: /yp-scheduler
order: 2
features:
  - 轻量级设计，易于集成到多种.NET项目
  - 声明式配置，通过特性标记即可完成任务配置
  - 灵活的时间配置，支持设置任务的开始时间和执行间隔
  - 执行控制，可配置任务是否等待上一个执行完成
  - 同步/异步支持，支持同步和异步定时任务
  - 错误处理，内置错误处理和日志记录
  - 依赖注入，支持依赖注入和自定义日志实现
  - 跨平台支持，可在Windows、macOS、Linux上运行
---

# YP.Scheduler

一个功能强大的轻量级.NET定时任务框架，通过声明式配置和特性标记即可快速完成任务调度配置。支持ASP.NET Core、WinForm、控制台等多种项目类型。

## 核心特性

- **轻量级设计** - 易于集成，代码简洁高效
- **声明式配置** - 通过特性标记即可完成任务配置
- **灵活的时间配置** - 支持设置任务的开始时间和执行间隔
- **执行控制** - 可配置任务是否等待上一个执行完成
- **同步/异步支持** - 同时支持同步和异步定时任务
- **错误处理** - 内置错误处理和日志记录
- **依赖注入** - 支持依赖注入和自定义日志实现
- **跨平台** - 可在Windows、macOS、Linux上运行

## 技术栈

- **目标框架**: .NET 8.0+
- **支持平台**: Windows、macOS、Linux
- **项目类型**: ASP.NET Core、WinForm、控制台应用
- **NuGet包**: YP.TimedJob

## 快速开始

创建一个继承自`Job`的类，并使用`[Invoke]`特性标记要执行的方法，几行代码即可完成定时任务配置。
