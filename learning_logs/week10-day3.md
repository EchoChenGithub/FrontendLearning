# 学习简报 - 2025年07月30日 & 07月31日

**总学习时长 (此期间合计)：** 6小时

**学习课程/内容：** 极客园项目 - 登录功能核心实现，`axios` 请求模块封装，`Redux Toolkit` 异步 Action (`createAsyncThunk`)，用户认证状态管理与路由权限控制。

**核心任务：** 完成极客园项目登录页面的全部功能，包括表单校验、接口请求、`token` 管理与持久化，以及实现基于 `token` 的前端路由权限控制。

---

## 完成内容与学习点：

### **第一部分：极客园项目 - 登录功能核心实现**

今天我们集中精力，彻底打通了极客园项目的登录功能，这是用户认证系统的核心。

1.  **登录页面表单校验与数据获取：**
    *   **实现:** 为手机号和验证码输入框添加了 `antd` `Form.Item` 的 `rules` 属性。
    *   **校验规则:** 手机号 (`^1[3-9]\d{9}$`) 必填、格式校验；验证码必填、长度和数字格式校验。
    *   **校验时机:** 使用 `validateTrigger={['onChange', 'onBlur']}` 实现实时校验和失焦校验。
    *   **数据获取:** 通过 `Form` 组件的 `onFinish` 回调函数，自动获取所有表单项的值作为参数。
    *   **核心收获:** 掌握 `antd` `Form` 强大的声明式校验和数据自动收集能力。理解 `validateTrigger`、`validateDebounce`、`validateFirst` 对校验时机和频率的控制。

2.  **`axios` 请求模块封装：**
    *   **目的:** 统一管理和复用网络请求。
    *   **实现:** 创建 `src/utils/request.js` 文件，使用 `axios.create` 配置了：
        *   **`baseURL` (根域名):** 统一所有请求的基础 URL，便于环境切换。
        *   **`timeout` (超时时间):** 防止请求无限等待，提升用户体验。
        *   **请求拦截器:**
            *   **注入 `token`:** 在请求发送前，自动从 `localStorage` 获取 `token` 并添加到 `Authorization: Bearer <token>` 请求头中。
            *   **加载提示:** 实现了 `Toast.loading` 的显示。
        *   **响应拦截器:**
            *   **统一错误处理:** 集中处理 HTTP 状态码（400, 401, 403, 404, 500 等）和业务错误信息，并显示 `Toast` 提示。
            *   **`400 Bad Request` 调试与修复:** 面对真实后端返回的 `400` 错误，通过分析 `Network` 标签页的 `Response` 内容 (`message:"验证码不正确"`)，最终确定问题是**发送的请求体数据（`mobile` 和 `code` 的值）不符合后端业务规则**（验证码不正确），而非前端代码结构错误。
            *   **`Content-Type` 确认:** 验证 `axios.post` 默认发送 `application/json` 符合后端预期。
            *   **隐藏加载提示:** 实现了 `Toast.clear`。
    *   **核心收获:** 掌握 `axios` 封装的最佳实践，理解拦截器在全局认证、错误处理、加载提示中的作用。学会利用开发者工具 `Network` 标签页 (`Headers`, `Payload`, `Response`) 精准调试网络请求问题。

3.  **Redux 管理 `token` (用户认证状态)：**
    *   **目的:** `token` 作为用户标识数据，需要在多模块共享，Redux 提供集中管理。
    *   **实现:**
        *   **`userStore.jsx` (User Slice):**
            *   创建 `user` 切片，`initialState` 包含 `token`, `userInfo`, `status`, `error`。
            *   **`createAsyncThunk` (`login` Action):** 替换手写 Thunk，接收登录表单数据。它负责：
                *   调用 `loginAPI` 发送登录请求。
                *   **`token` 持久化与初始化：** 登录成功后，将 `token` 存储到 `localStorage` (`localStorage.setItem('geekpark_token', token)`)；`initialState` 从 `localStorage` 读取 `token`。
                *   使用 `rejectWithValue` 传递错误信息。
            *   **`extraReducers`:** 处理 `login` Action 的 `pending`, `fulfilled`, `rejected` 生命周期，更新 `token`, `userInfo`, `status`, `error`。失败时清除 `localStorage` 中的 `token`。
            *   定义 `logout` 同步 Action，用于清除 `token` 和用户信息。
        *   **`store.js`:** 将 `userReducer` 挂载到 Store 的 `user` 键名下。
        *   **`LoginPage.jsx`：** `dispatch(login(values)).unwrap()` 派发登录 Action。
            *   **关键：`async/await` 与 `unwrap()`：** 确保 `onFinish` 函数是 `async`，并 `await dispatch(...).unwrap()`，这样才能在 `try...catch` 中正确捕获 `createAsyncThunk` 抛出的成功结果或失败错误，实现登录成功后的跳转和提示。
            *   **调试与修复：** 解决了 `dispatch(thunk)` 后续代码立即执行的问题，确保登录成功/失败提示和页面跳转在异步请求完成后执行。

### **第四部分：极客园项目 - 路由完善 (嵌套路由与权限控制)**

1.  **`createBrowserRouter` 模式下的路由结构：**
    *   **顶级路由:** `/` (主应用布局) 和 `/login` (登录页) 作为平级路由。
    *   **`Layout` 组件中放置 `<Outlet />`：** 在 `src/pages/Layout/index.jsx` 中导入并放置 `<Outlet />` 组件，作为子路由内容的渲染出口。
    *   **定义 `Layout` 的子路由 (`children`):**
        *   `index: true` 路由：配置 `Home` 页面作为 `/` 路径下的默认子页面。
        *   添加了 `qa`, `publish`, `me` 等占位子路由。
        *   添加了 `Layout` 内部的 `404` 页面 (`path: '*'`)。
    *   **核心收获:** 掌握 `createBrowserRouter` 下的嵌套路由、`Outlet`、`index` 路由和内部 404 的配置。

2.  **路由权限控制 (`AuthGuard` 方案)：**
    *   **目的:** 根据 `token` 有无，控制路由是否可以跳转到受保护页面。
    *   **实现:** 创建 `AuthGuard` 组件，在 `src/router/index.jsx` 中：
        *   `AuthGuard` 组件内部：从 `localStorage` 获取 `token`。
        *   如果无 `token`，`return <Navigate to="/login" replace={true} />`，强制重定向到登录页。
        *   如果有 `token`，`return children` (渲染受保护的子内容)。
        *   将 `Layout` 路由的 `element` 包裹在 `<AuthGuard>` 内部，从而保护 `/` 及其所有子路由。
    *   **核心收获:** 掌握了基于 `token` 的路由权限控制实现。理解 `replace={true}` 属性在重定向中的作用（替换历史记录）。

---

### 🤔 思考与心得

*   **复杂系统的整合与调试：** 本次学习将 `React`、`Redux`、`react-router-dom`、`axios`、`antd` 等多个复杂库深度整合，并通过大量的调试和排错解决了诸如 `400 Bad Request`、`async/await` 误用、Redux 异步 Thunk 流程、`token` 持久化和路由权限控制等关键问题。这是一次全方位的工程化实践。
*   **“复杂”意味着“深入”：** 尽管在学习 `createAsyncThunk` 和 `unwrap()` 时感觉复杂，但通过深入理解其原理和实践，最终掌握了 Redux 异步 Action 的标准模式，这标志着前端技能的显著飞跃。
*   **API 契约的重要性：** `400 Bad Request` 的排查，再次强调了前端发送的数据必须严格遵循后端 API 文档的契约，包括字段名和数据类型。
*   **安全与用户体验：** `token` 持久化、请求拦截器注入 `token` 和路由权限控制，都是构建健壮、安全、用户友好的 Web 应用不可或缺的部分。
*   **持续学习与迭代：** 从手写 Thunk 到 `createAsyncThunk` 的转变，体现了在学习中不断优化和采用最佳实践的迭代精神。

---

### 🚀 后续计划

**优先级最高：JavaScript 基础知识深度巩固 (共 3 小时)**
*   **[ ] 数组方法:** 系统性地整理和实践 `map`, `filter`, `reduce`, `slice`, `splice`, `find` 等核心数组方法。重点辨析它们的**返回值**以及**是否修改原数组**。
*   **[ ] `Object` 原型与静态方法:** 回顾 `Object.keys()`, `Object.values()`, `Object.entries()`, `hasOwnProperty()` 等常用方法。
*   **[ ] JS 易混淆点:** 梳理 `NaN` 的特殊性、`==` vs `===` 的隐式类型转换，以及 `Array.isArray()` 的标准用法。
*   **[ ] DOM & BOM API:** 快速回顾最核心的 DOM 操作和 BOM 对象，唤醒原生API的记忆。

**React 基础巩固与扩展 (共 1 小时)**
*   **[ ] `useReducer` Hook:** 学习或复习 `useReducer` 的用法，理解它如何管理复杂状态逻辑。
*   **[ ] Shadow DOM vs. 虚拟 DOM (概念辨析):**

**Redux 相关学习 (低优先级):**
*   **[ ] 复习 Redux (阅读官方文档):** 深入阅读 Redux Toolkit 官方文档，特别是关于 `createAsyncThunk` 和 `extraReducers` 的部分，理解如何更优雅地处理异步操作。

**前端基础优化 (手写实现)：**
*   **[ ] 手写防抖 (Debounce) 和节流 (Throttle)：** 理解并手写实现这两个重要的性能优化函数。

**网络协议与安全 (重点，理论学习)**
*   **[ ] HTTP 协议：** 理解 HTTP/1.1、HTTP/2、HTTP/3 的主要特性和区别。
*   **[ ] TCP/IP 基础：** TCP 三次握手和四次挥手过程，为什么是三次/四次。
*   **[ ] HTTPS 加密：** TLS/SSL 握手过程，对称加密和非对称加密，证书的原理与验证过程。
*   **[ ] 跨域 (CORS)：** 什么是跨域，产生的原因，预检请求 (Preflight Request)，各种解决方案（CORS 配置、JSONP、代理、WebSocket），以及如何配置请求头。
*   **[ ] 网络请求缓存：** 强缓存 (Cache-Control, Expires)，协商缓存 (Last-Modified/If-Modified-Since, ETag/If-None-Match)，各自的优先级和应用场景。
*   **[ ] 基础网络安全：** XSS (跨站脚本攻击)、CSRF (跨站请求伪造)、SQL 注入等基础攻击原理和常见防御措施。

**JS 工程化 (基础面试知识)**
*   **[ ] Node.js 基础：** 理解 Node.js 的作用，CommonJS 模块系统，npm/pnpm 包管理原理。
*   **[ ] JS 模块化：** ESM (ES Modules), CommonJS, AMD, UMD 等模块化规范的差异和使用场景。
*   **[ ] JS 打包工具 (Webpack):** 简单了解 Webpack 的作用、配置、Loader/Plugin。理解 `Tree Shaking` 的原理及生效条件。
*   **[ ] 资源优化 (图片 Base64/雪碧图):** 了解将 PNG/JPG 图片转换为 Base64 编码直接写入 HTML/CSS 的优缺点（减少 HTTP 请求，增大文件体积），以及打包工具（如 Webpack）如何通过 Loader（如 `url-loader` / `asset modules`）自动完成这种优化。了解 CSS 雪碧图的原理和应用。
*   **[ ] 多页面应用 (MPA) 打包配置：** 了解如何在 Webpack/Vite 中配置多入口文件，以支持 MPA 项目的构建。

**新项目：极客园项目 (进行中)**
*   **[ ] 路由配置 ( `createBrowserRouter` 模式):** (已完成，`Layout` 和 `Login` 顶级路由已配置，`Layout` 内部 `Outlet` 已放置，子路由已定义，权限控制已完成)。
*   **[ ] 登录页面功能：** (已完成，静态结构与样式，表单校验，数据获取，Redux `token` 管理与持久化，接口请求，重定向，认证均已完成)。
*   **[ ] 整体功能模块概览与技术栈确认：** (项目启动时已初步了解)。
*   **[ ] 获取用户资料：** 在登录成功后，获取用户资料（如头像、昵称），并显示在布局或个人中心页。
*   **[ ] 登出功能：** 实现用户登出，清除 `token` 并重定向回登录页。

---