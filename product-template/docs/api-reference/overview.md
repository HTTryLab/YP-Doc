---
id: api-overview
title: API 概览
sidebar_label: API 概览
---

# API 接口概览

{产品名称} 提供完整的 RESTful API 接口，方便与其他系统集成。

## API 基础信息

- **Base URL**: `https://api.example.com/v1`
- **认证方式**: API Key / OAuth 2.0
- **数据格式**: JSON
- **字符编码**: UTF-8

## 认证方式

### API Key 认证

在请求头中添加 API Key：

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/v1/endpoint
```

### OAuth 2.0 认证

参考 [OAuth 认证指南](./authentication) 获取访问令牌。

## 通用响应格式

### 成功响应

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 响应数据
  }
}
```

### 错误响应

```json
{
  "code": 400,
  "message": "error message",
  "error": {
    "type": "error_type",
    "details": "error details"
  }
}
```

## API 速率限制

| 认证方式 | 每分钟请求限制 |
|---------|--------------|
| API Key | 60 |
| OAuth 2.0 | 200 |

超过限制会返回 `429 Too Many Requests` 错误。

## SDK 支持

我们提供多种语言的 SDK：

- [Python SDK](https://github.com/example/{product-slug}-python)
- [Java SDK](https://github.com/example/{product-slug}-java)
- [Go SDK](https://github.com/example/{product-slug}-go)
- [Node.js SDK](https://github.com/example/{product-slug}-node)

```javascript
// Node.js SDK 使用示例
const Client = require('{product-slug}');

const client = new Client({
  apiKey: 'YOUR_API_KEY'
});

client.resource.list()
  .then(res => console.log(res));
```
