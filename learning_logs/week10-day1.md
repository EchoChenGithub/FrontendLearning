# 学习简报 - 2025年07月27日

**总学习时长：** 7小时

**学习课程/内容：** 记账本案例 Redux 数据获取终极排查，极客园项目初始化与 `react-router-dom` `createBrowserRouter` 模式配置。

**核心任务：** 彻底解决记账本 Redux 数据获取问题，并开始搭建极客园项目的路由基础骨架。

---

## 完成内容与学习点：

### **第一部分：记账本案例 - Redux 数据获取与数据处理**

今天我们集中解决了记账本 Redux 数据获取的遗留问题，并确认了数据处理逻辑。

1.  **Redux 数据获取终极排查与解决：**
    *   **问题回顾:** `billList` 数据始终为空，尽管 `json-server` 返回了数据。
    *   **根源诊断:** 确认问题不在于 `useSelector` 路径 (`state.bill.billList`)，也不在于 `json-server` 数据返回格式。最终诊断出核心问题是：`getBillList()` 异步 Action **没有在 `MonthlyBillPage` 组件的 `useEffect` 中被正确 `dispatch` 触发**。
    *   **解决方案:** 在 `MonthlyBillPage.jsx` 中，添加了 `useDispatch()` Hook，并在 `useEffect(() => { dispatch(getBillList()); }, [dispatch]);` 中显式派发 `getBillList()` 异步 Action。
    *   **核心收获:** 彻底理解了 Redux 中异步 Action (Thunk) 的完整生命周期：定义、派发、执行、状态更新。明确了 `useSelector` 负责“读取”，而 `useEffect` 配合 `useDispatch` 才负责在组件生命周期中“触发”副作用。

2.  **账单数据按月分组、筛选与汇总计算：**
    *   **目的:** 避免不必要的重复计算。
    *   **实现:**
        *   `monthGroup` `useMemo` 使用 `lodash.groupBy` 将 `billList` 按 `YYYY-MM` 格式分组。
        *   `currentMonthData` `useMemo` 从 `monthGroup` 筛选 `currentDate` 对应的月度交易。
        *   `useMemo` 计算 `income` (收入)、`pay` (支出，已取绝对值)、`total` (结余) 并显示在页面中。
        *   解决了 `currentMonthData` 初始为空的问题，通过将其改为 `useMemo` 派生状态，确保在 `billList` 加载或 `currentDate` 变化时自动更新。
        *   `monthGroup[formatDate] ?? []` 确保了空月份返回空数组，避免报错。

3.  **单日统计列表显示 (`DailyBill.jsx`):**
    *   **实现:**
        *   `dailyGroupedTransactions` `useMemo` 将 `currentMonthData` 按 `YYYY-MM-DD` 格式按日分组。
        *   `sortedDailyKeys` `useMemo` 排序日期键。
        *   循环渲染 `DailyBill` 组件，每个组件展示一天的交易和汇总。
    *   **调试与修复:**
        *   解决了 `DailyBill` 组件的 `pay` 计算中未取金额绝对值的问题。
        *   **解决了 `DailyBill` 组件和 `MonthlyBillPage` 头部区域重叠的布局问题:** 最终诊断为 JSX 结构中，`DailyBill` 的渲染逻辑被错误地放置在了 `<div className="header">` 内部。通过修改 JSX 结构，确保 `DailyBill` 在 DOM 树中正确地作为 `header` 的兄弟元素渲染，彻底解决了重叠问题。

### **第二部分：极客园项目 - 项目初始化与 `react-router-dom` `createBrowserRouter` 模式配置**

今天开始新的实战项目“极客园”，并实践了 `react-router-dom` 中 `createBrowserRouter` 这种更现代的路由配置模式。

1.  **项目初始化与基础环境搭建：**
    *   **创建项目:** 使用 `pnpm create vite 极客园项目名 --template react`。
    *   **依赖安装:** 安装 `react-router-dom`。
    *   **解决常见问题:** 学习了 `touch` 命令创建文件、`mkdir -p` 递归创建目录。解决了 `pnpm add` 拼写错误 (`react-rooter-dom`)，以及 `pnpm create vite` 可能在非预期目录创建项目的问题，明确了**必须先创建 Vite 项目再安装依赖**的顺序。

2.  **`createBrowserRouter` 模式核心配置思考：**
    *   **目标:** 配置 `Layout` (主应用布局) 和 `Login` (登录页) 两个基础路由。
    *   **思考过程:**
        *   `createBrowserRouter` 用于创建路由实例，而非 `BrowserRouter` 组件。
        *   规划顶级路由：`Login` 页面通常独立于主布局，应作为**平级**的顶级路由 (`/login`)。
        *   `Layout` 组件作为主应用布局，需要一个 `path` (例如 `/`)。
        *   **关键修正:** 理解了子路由的 `path` 默认是**相对于父级 `path`** 的，不应在 `children` 数组中使用绝对路径 (`/login`)。
    *   **实现骨架:**
        *   在 `src/router/index.jsx` 中，使用 `createBrowserRouter` 定义路由配置数组，并 `export default router`。
        *   在 `src/main.jsx` 中，使用 `<RouterProvider router={router} />` 渲染路由实例。
        *   创建 `src/pages/Layout/index.jsx` 和 `src/pages/Login/index.jsx` 空组件。
        *   **待解决:** `Layout` 组件内部尚未放置 `<Outlet />` 来支持子路由的渲染。

---

### 🤔 思考与心得

*   **调试是学习的加速器：** 今天在记账本案例中遇到的所有问题，从 Redux 数据获取失败到复杂的布局重叠，都通过细致的日志分析、开发者工具排查和原理性思考得以解决。这种解决实际问题的经验，远比单纯跟着教程敲代码更有价值。
*   **Redux 异步流程的深度理解：** 彻底理解了 `useEffect`、`useDispatch` 和异步 Thunk 之间的协作关系，以及为什么必须显式 `dispatch` 异步 Action。
*   **CSS 布局的挑战与精确性：** 布局重叠问题再次验证了 CSS 基础（特别是 Flexbox、盒模型、定位）和浏览器渲染原理的重要性。精确分析 DOM 结构和计算样式是解决复杂布局问题的关键。
*   **前端工程化基础的实践意义：** 项目初始化、依赖管理、文件结构、打包工具的配置等，是构建稳定开发环境的基石。对这些基础的理解，能避免许多常见的“踩坑”问题。
*   **`createBrowserRouter` 模式的初步接触：** 尽管在入门阶段，但提前接触并理解这种新的路由配置模式，将为未来学习更高级的路由特性打下基础。

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

**新项目：极客园项目 (进行中)**
*   **[ ] 基础路由配置 ( `createBrowserRouter` 模式):** (进行中，`Layout` 和 `Login` 顶级路由已配置，`Layout` 内部 `Outlet` 待放置，子路由待定义)。
*   **[ ] 整体功能模块概览与技术栈确认：** (项目启动时已初步了解)。

---