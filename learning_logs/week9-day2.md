# 学习简报 - 2025年07月24日
**总学习时长 (此期间合计)：** 5小时

**学习课程/内容：** 前端路由 (`react-router-dom`)，记账本案例项目初始化与搭建，Redux Toolkit 集成，`antd-mobile` 主题与 TabBar 应用。

**核心任务：** 深入理解前端路由原理与实践。启动记账本应用，搭建其核心路由、状态管理骨架，并集成常用 UI 组件。

---

## 完成内容与学习点：

### **第一部分：Redux Toolkit 核心概念与集成实践**

今天对 Redux 核心概念进行了复习，并初步将其集成到记账本项目，实现数据获取。

1.  **Redux 出现背景与优势：**
    *   **局限性:** `useState` 和“状态提升”在面对复杂、多层级、不相关组件状态共享时效率降低。
    *   **解决痛点:** 提供**单一数据源**的、**可预测**的全局状态容器，简化复杂组件间状态管理，提升可维护性和调试效率。
    *   **三大原则:** 单一事实来源、状态是只读的、使用纯函数 (Reducer) 进行修改。

2.  **Redux Toolkit 如何简化 Redux：**
    *   解决了传统 Redux “样板代码多”和“手动不可变更新”的痛点。
    *   **`createSlice`:** 核心 API，自动生成 Action Type、Action Creators 和 Reducer 函数，内置 `Immer` 允许“直接修改”状态。
    *   **`configureStore`:** 简化 Store 配置，默认集成 `redux-thunk` 和 Redux DevTools。

3.  **Redux Toolkit 基本集成实践：**
    *   **`transactionsSlice.js` (Redux Slice):** 使用 `createSlice` 定义 `transactions` 切片，包含 `initialState` 和 `reducers` (`addTransaction`, `removeTransaction`)。导出 `action` creators 和 `selector`。
    *   **`store.js` (Redux Store):** 使用 `configureStore` 组合 `transactionsReducer`。
    *   **`main.jsx` (Redux Provider):** 使用 `<Provider store={store}>` 包裹 React 应用。
    *   **异步 Action 模式 (初步):** 实现 `getBillList` Thunk 函数，用 `axios` 从 `json-server` 获取数据，并 `dispatch` 同步 Action 更新状态。
    *   **`action.payload` 概念:** 携带与 Action 相关的所有数据有效载荷。

### **第二部分：`antd-mobile` 组件应用与布局优化**

开始在记账本应用中使用 `antd-mobile` 组件，并解决布局问题。

1.  **`antd-mobile` 主题定制：**
    *   **方式:** 通过在 CSS 中覆盖 `:root` 选择器下的 `antd-mobile` CSS 变量（如 `--adm-color-primary`）。
    *   **范围:** 可全局定制 (影响所有组件)，也可局部定制 (影响特定元素及其子元素)。
    *   **实践:** 完成了全局主题色的定制。

2.  **`antd-mobile` `TabBar` 集成：**
    *   **需求:** 底部导航栏，点击 Tab 切换路由。
    *   **实现:** 在 `MainLayout` 组件中使用 `antd-mobile` 的 `TabBar` 和 `TabBar.Item`。
    *   **与路由联动:** 使用 `useLocation().pathname` 绑定 `activeKey`，使用 `useNavigate()` 在 `onChange` 中进行编程式导航。
    *   **调试与修复:**
        *   解决了 `antd-mobile-icons` 包未安装的问题。
        *   **解决了 TabBar 标签不能均匀分布的问题:** 发现 `kaLayout` 元素宽度不足 (`152px`) 是根源。通过检查 `html`, `body`, `#root` 以及 `App.jsx` 根 `div` 的样式，移除 `body` 上的 `display: flex` 和 `place-items: center`，并确保 `html`, `body`, `#root` 和 `kaLayout` 都正确设置 `width: 100%` 或 `100vw`，使其能完全撑开屏幕。
        *   解决了 `TabBar` `key` 与 `Routes` `path` 不匹配导致无法正确跳转和高亮的问题，统一了 TabBar 的 `key` 和路由路径。
    *   **核心收获:** 深入理解了移动端布局中，确保根容器占据视口全宽的重要性。

---

### 🤔 思考与心得
*   
*   **Redux Toolkit 效率飞升:** `createSlice` 极大地简化了 Redux 的样板代码，让状态管理变得更直观、更易用，特别是对异步逻辑的初步处理。
*   **浏览器渲染和 CSS 布局的深层影响:** `kaLayout` 宽度问题的排查，再次印证了 CSS 基础和浏览器渲染原理的重要性，从 `html`/`body` 到具体组件的层层影响。


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

**前端基础优化 (手写实现):**
*   **[ ] 手写防抖 (Debounce) 和节流 (Throttle):** 理解并手写实现这两个重要的性能优化函数。

**新项目：记账本案例 (进行中)**
*   **[ ] 整体路由设计：** (已完成)
*   **[ ] 组件拆分与骨架搭建：** (进行中，`MainLayout` 已完成)
*   **[ ] Axios 与 Mock 数据集成：** (已完成)
*   **[ ] `antd-mobile` 组件应用：** (进行中，`TabBar` 已完成)
*   **[ ] 首页交易列表展示：** 在 `MonthlyBillPage` (或 `HomePage`) 中，使用 Redux Store 中的交易数据，结合 `antd-mobile` 的 `List` 或 `Card` 组件进行详细展示。
*   **[ ] 总收入/支出/余额计算与展示：** 在首页或独立组件中，根据 Redux Store 中的交易数据进行计算并展示。
*   **[ ] 添加交易功能：** 实现 `AddTransactionPage`，包含表单输入，并能通过 `dispatch` 向 Redux Store 中添加新交易（并同步到 Mock API）。
*   **[ ] 交易详情/删除功能：** 实现 `TransactionDetailPage` 和列表中的删除按钮功能。
*   **[ ] 账目统计与图表：** 开发 `MonthlyStatsPage` 和 `AnnualStatsPage`。

---