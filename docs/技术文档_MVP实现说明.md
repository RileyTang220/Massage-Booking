# TouchMatch MVP 技术文档

## 1. 文档目的

本文档用于说明当前项目的 MVP 简化版实现情况，重点描述：

- 当前已经实现的功能
- 当前采用的技术架构
- 页面与接口的职责划分
- Mock 数据运行方式
- Vercel 部署方式
- 后续从 Mock 版本升级到正式版本的路径

本文档基于当前代码仓库中的实际实现编写，不将未完成功能描述为已上线能力。

## 2. 项目概述

一个面向上门按摩服务场景的双边平台 MVP，包含以下三类使用方：

- 客户端用户：提交按摩需求、查看匹配治疗师、确认预约
- 治疗师：查看仪表盘、预约、收入、可用时间和订阅信息
- 平台管理员：查看运营面板、治疗师审核队列、合规说明

当前版本为可部署的 Mock MVP，主要目标是先完成业务流程演示和前后端结构搭建，为后续接入真实数据库、认证、支付和通知系统做准备。

## 3. 技术栈

当前项目采用以下技术栈：

- `Next.js 15`：作为前端页面和 API 路由的统一运行框架
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Prisma`：当前已定义 schema，并可生成 Prisma Client
- `PostgreSQL`：当前为后续正式接入预留
- `Stripe`：当前为支付和 Connect 预留接口
- `Vercel`：当前部署目标平台

当前项目继续使用 Mock 数据运行，不依赖真实 PostgreSQL、Stripe、Twilio、Google Maps 即可完成构建和部署。

## 4. 系统架构说明

当前采用的是单体式 Next.js App Router 架构，在一个代码库中同时承载：

- 官网/营销页
- 客户预约流程
- 治疗师 Dashboard
- Admin 面板
- API 路由

这种结构的优点是：

- 前后端代码统一管理
- 适合 Vercel 部署
- 后续接入认证、数据库、支付时改造成本低
- 对 MVP 阶段开发速度和维护效率更友好

## 5. 当前已实现功能

### 5.1 营销主页

已实现首页，用于展示产品定位、推荐技术栈、MVP 范围和阶段规划。

对应文件：
[app/(marketing)/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/(marketing)/page.tsx)

### 5.2 客户预约流程

当前客户预约流程已经形成完整的演示路径：

1. 用户在 `/book` 页面填写需求表单
2. 系统根据服务类型、预算和地址进行简化匹配
3. 用户进入治疗师详情页查看服务和可用时间
4. 用户进入确认页查看预约摘要和平台抽成
5. 用户点击确认后，系统调用 `/api/bookings`
6. 页面跳转到预约成功页

当前该流程为 Mock 版本，不会创建真实 Stripe Checkout，也不会写入真实数据库。

对应文件：
[app/book/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/book/page.tsx)
[app/therapists/[id]/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/therapists/%5Bid%5D/page.tsx)
[app/book/confirm/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/book/confirm/page.tsx)
[app/book/success/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/book/success/page.tsx)

### 5.3 治疗师匹配逻辑

当前实现了一个简化版治疗师匹配算法，用于模拟正式版本中的搜索和排序逻辑。

当前排序考虑以下因素：

- 服务类型匹配程度
- 治疗师评分
- 评价数量
- 距离
- 预算适配程度

当前距离计算基于本地 Mock 坐标执行 Haversine 公式，不依赖 Google Maps API。

对应文件：
[lib/matching.ts](/Users/mac/Desktop/Massage%20Booking%20App/lib/matching.ts)

### 5.4 治疗师详情页

已实现治疗师详情页，用于展示：

- 治疗师基础信息
- 服务技能
- 可提供的服务项目
- 服务价格
- 每周固定可用时间段

对应文件：
[app/therapists/[id]/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/therapists/%5Bid%5D/page.tsx)

### 5.5 治疗师 Dashboard

当前已实现治疗师端的基础 Dashboard 页面，并拆分为多个子页面：

- `/dashboard`：概览
- `/dashboard/bookings`：预约列表
- `/dashboard/earnings`：收入信息
- `/dashboard/availability`：可用时间
- `/dashboard/profile`：个人资料
- `/dashboard/subscription`：订阅状态

当前数据全部基于 Mock 数据渲染。

对应文件：
[app/dashboard/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/dashboard/page.tsx)
[app/dashboard/bookings/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/dashboard/bookings/page.tsx)
[app/dashboard/earnings/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/dashboard/earnings/page.tsx)
[app/dashboard/availability/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/dashboard/availability/page.tsx)
[app/dashboard/profile/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/dashboard/profile/page.tsx)
[app/dashboard/subscription/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/dashboard/subscription/page.tsx)

### 5.6 Admin 面板

当前已实现一个基础的 Admin 页面，用于展示：

- 平台管理职责
- 治疗师审核队列
- 合规和敏感信息说明

对应文件：
[app/admin/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/admin/page.tsx)

### 5.7 法务页面

当前已实现三类法务页面：

- 隐私政策
- 服务条款
- 治疗师协议

对应文件：
[app/legal/privacy/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/legal/privacy/page.tsx)
[app/legal/terms/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/legal/terms/page.tsx)
[app/legal/therapist-agreement/page.tsx](/Users/mac/Desktop/Massage%20Booking%20App/app/legal/therapist-agreement/page.tsx)

## 6. 当前 API 设计

当前项目已经根据技术 brief 预留并实现了一批 API 路由。它们分为两类：

- 可用于当前 Mock 流程的接口
- 为未来正式接入保留的占位接口

### 6.1 已用于当前 Mock 流程的接口

`/api/bookings`

- 方法：`POST`
- 用途：接收确认预约请求
- 当前行为：校验参数，生成 Mock booking 响应，返回预约摘要

`/api/bookings/[id]`

- 方法：`GET`、`PATCH`
- 用途：查询单个预约、模拟更新预约状态

`/api/therapists/search`

- 方法：`GET`
- 用途：根据服务类型、时间、地址、预算返回匹配结果

`/api/therapists/[id]/availability`

- 方法：`GET`
- 用途：返回指定治疗师的可用时间段

### 6.2 预留接口

`/api/chat`

- 方法：`POST`
- 当前返回：`501`
- 作用：后续接入 Voiceflow / OpenAI / Dialogflow

`/api/stripe/onboard`

- 方法：`POST`
- 作用：后续接入 Stripe Connect Express Onboarding

`/api/stripe/connect`

- 方法：`POST`
- 作用：后续处理治疗师 Stripe Connect 账户创建逻辑

`/api/stripe/webhook`

- 方法：`POST`
- 作用：当前保留旧占位 webhook 路由

`/api/webhooks/stripe`

- 方法：`POST`
- 作用：后续作为正式 Stripe webhook 入口

`/api/admin/users`

- 方法：`GET`、`PATCH`
- 作用：后续用于管理员查询和管理用户

`/api/admin/therapists/verify`

- 方法：`POST`
- 作用：后续用于管理员审核治疗师

对应文件：
[app/api/bookings/route.ts](/Users/mac/Desktop/Massage%20Booking%20App/app/api/bookings/route.ts)
[app/api/bookings/[id]/route.ts](/Users/mac/Desktop/Massage%20Booking%20App/app/api/bookings/%5Bid%5D/route.ts)
[app/api/therapists/search/route.ts](/Users/mac/Desktop/Massage%20Booking%20App/app/api/therapists/search/route.ts)
[app/api/therapists/[id]/availability/route.ts](/Users/mac/Desktop/Massage%20Booking%20App/app/api/therapists/%5Bid%5D/availability/route.ts)
[app/api/chat/route.ts](/Users/mac/Desktop/Massage%20Booking%20App/app/api/chat/route.ts)
[app/api/stripe/onboard/route.ts](/Users/mac/Desktop/Massage%20Booking%20App/app/api/stripe/onboard/route.ts)
[app/api/webhooks/stripe/route.ts](/Users/mac/Desktop/Massage%20Booking%20App/app/api/webhooks/stripe/route.ts)

## 7. Mock 数据设计

当前系统不依赖数据库直接运行，所有演示数据集中在本地数据模块中。

主要包括：

- 治疗师数据
- 服务项目数据
- 每周可用时间数据
- 历史预约演示数据

对应文件：
[lib/demo-data.ts](/Users/mac/Desktop/Massage%20Booking%20App/lib/demo-data.ts)

这样设计的目的有两个：

- MVP 版本可以快速演示，不被数据库和第三方服务阻塞
- 后续接 Prisma 查询时，只需要替换数据来源，不需要整体重写页面结构

## 8. 数据模型预留

虽然当前使用的是 Mock 数据，但项目已经定义了 Prisma schema，为后续正式接入 PostgreSQL 做准备。

当前预留的数据模型包括：

- `User`
- `Customer`
- `Therapist`
- `AvailabilitySlot`
- `Booking`
- `Payout`
- `AdminProfile`

当前 schema 主要用于：

- 固化领域模型
- 提前定义平台未来的数据关系
- 支持后续 Prisma Client 自动生成

对应文件：
[prisma/schema.prisma](/Users/mac/Desktop/Massage%20Booking%20App/prisma/schema.prisma)

## 9. 目录结构说明

当前项目主要目录如下：

```text
app/
  (marketing)/           营销首页
  book/                  客户预约流程
  therapists/[id]/       治疗师详情页
  dashboard/             治疗师 Dashboard
  admin/                 Admin 页面
  legal/                 法务页面
  api/                   API 路由

components/
  booking/               预约相关组件
  dashboard/             Dashboard 导航和相关组件

lib/
  booking.ts             预约预览和费用计算
  constants.ts           站点常量
  db.ts                  PrismaClient 单例
  demo-data.ts           Mock 数据
  format.ts              金额格式化
  matching.ts            匹配算法
  stripe.ts              Stripe 实例

prisma/
  schema.prisma          数据模型定义

docs/
  技术文档_MVP实现说明.md
```

## 10. Vercel 部署说明

当前项目已经调整为可在 Vercel 上直接部署。

已完成的部署准备包括：

- 增加 `.gitignore`
- 增加 `vercel.json`
- 在 `package.json` 中加入 `postinstall: prisma generate`
- 保证当前构建不依赖真实数据库

当前只要配置基础环境变量，就可以以 Mock 模式部署。

最低建议环境变量：

- `NEXT_PUBLIC_APP_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

即使这些值暂时使用测试占位值，当前版本也可以正常构建和部署。

对应文件：
[vercel.json](/Users/mac/Desktop/Massage%20Booking%20App/vercel.json)
[package.json](/Users/mac/Desktop/Massage%20Booking%20App/package.json)
[.env.example](/Users/mac/Desktop/Massage%20Booking%20App/.env.example)

## 11. 当前未实现部分

以下能力目前尚未接入真实实现：

- `NextAuth.js v5` 登录注册和多角色权限
- PostgreSQL 持久化
- Prisma 查询替换 Mock 数据
- Stripe Checkout
- Stripe Connect 自动分账
- Stripe Webhook 真正写库
- Google Maps 地址搜索与真实距离计算
- Twilio 短信通知
- Resend 邮件通知
- 文件上传到 Supabase Storage 或 S3
- AI Chatbot 接口实现

这部分目前已经完成了结构预留，但还没有接入正式业务逻辑。

## 12. 后续开发建议

建议按以下顺序推进正式版本：

### 阶段一

- 接入 `NextAuth.js v5`
- 加入用户角色控制
- 建立客户、治疗师、管理员登录流程

### 阶段二

- 将治疗师、服务、可用时间、预约改为 PostgreSQL + Prisma
- 用真实数据库替换 `lib/demo-data.ts`

### 阶段三

- 接入 Stripe Checkout
- 接入 Stripe Connect Express
- 实现治疗师订阅和客户付款

### 阶段四

- 接入 Twilio 和 Resend
- 在预约状态变更时发送通知

### 阶段五

- 接入 Google Places / Maps
- 改成真实地址搜索和距离排序

### 阶段六

- 在 `/api/chat` 接入 AI 对话服务
- 用对话式采集替换当前表单输入

## 13. 当前版本结论

当前 TouchMatch 已经具备一个可部署、可演示、结构完整的 MVP 简化版：

- 可以在 Vercel 上部署
- 可以完整演示客户预约流程
- 可以展示治疗师端 Dashboard
- 可以展示管理员页面和法务页面
- 已预留 AI、支付、数据库和通知的接入边界

它适合作为：

- 向客户或投资人演示的原型
- 后续正式开发的工程基础
- 前后端协作的结构模板

但它还不是正式商用版本。正式上线前，必须完成认证、数据库、支付、通知和合规细节的真实接入。
