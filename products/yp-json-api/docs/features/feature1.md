---
id: feature1
title: 动态 API 配置
sidebar_label: 动态 API 配置
---

# 动态 API 配置

YP.JsonApi 允许您通过 JSON 配置文件灵活定义 API 端点，无需编写控制器代码。

## 配置文件结构

### 完整配置示例

```json
{
  "serverName": "我的 API 服务器",
  "port": 5000,
  "serverUrls": [
    {
      "category": "用户管理",
      "apiLists": [
        {
          "url": "/api/users",
          "urlName": "获取用户列表",
          "description": "获取所有用户信息",
          "requestType": "GET",
          "responseBody": "{\"users\": []}",
          "requireAuth": true,
          "allowCors": true,
          "functionClass": "UserListHandler",
          "headerMap": {
            "X-Custom-Header": "value"
          }
        },
        {
          "url": "/api/users",
          "urlName": "创建用户",
          "description": "创建新用户",
          "requestType": "POST",
          "requestBody": "{\"username\": \"string\", \"email\": \"string\"}",
          "responseBody": "{\"id\": 1, \"username\": \"string\"}",
          "requireAuth": true,
          "allowCors": true,
          "functionClass": "UserCreateHandler"
        }
      ]
    }
  ]
}
```

## 配置项说明

### 服务器级配置

| 字段 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| `serverName` | string | 否 | 服务器名称 |
| `port` | number | 否 | 端口号 |
| `serverUrls` | array | 是 | API 分组数组 |

### API 分组配置

| 字段 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| `category` | string | 是 | API 分组名称，用于 Swagger 文档分类 |
| `apiLists` | array | 是 | API 端点数组 |

### API 端点配置

| 字段 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| `url` | string | 是 | API 路径 |
| `urlName` | string | 否 | API 名称，用于 Swagger 文档 |
| `description` | string | 否 | API 描述 |
| `requestType` | string | 是 | HTTP 方法：GET、POST、PUT、DELETE |
| `requestBody` | string | 否 | 请求体示例（JSON 字符串） |
| `responseBody` | string | 否 | 响应体示例（JSON 字符串） |
| `requireAuth` | boolean | 否 | 是否需要认证，默认为 false |
| `allowCors` | boolean | 否 | 是否允许跨域，默认为 false |
| `functionClass` | string | 否 | 自定义处理器名称 |
| `headerMap` | object | 否 | 自定义响应头 |

## 支持的 HTTP 方法

### GET 请求

用于获取资源：

```json
{
  "url": "/api/resource",
  "requestType": "GET",
  "responseBody": "{\"data\": \"value\"}"
}
```

### POST 请求

用于创建资源：

```json
{
  "url": "/api/resource",
  "requestType": "POST",
  "requestBody": "{\"name\": \"value\"}",
  "responseBody": "{\"id\": 1, \"name\": \"value\"}"
}
```

### PUT 请求

用于更新资源：

```json
{
  "url": "/api/resource/{id}",
  "requestType": "PUT",
  "requestBody": "{\"name\": \"new value\"}",
  "responseBody": "{\"success\": true}"
}
```

### DELETE 请求

用于删除资源：

```json
{
  "url": "/api/resource/{id}",
  "requestType": "DELETE",
  "responseBody": "{\"success\": true}"
}
```

## 热更新配置

在开发环境中，您可以修改配置文件后重启应用来加载新的 API 配置。生产环境建议使用配置中心或环境变量来管理配置。
