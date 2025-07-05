## 学习简报 - 2025年7月3日

**总学习时长 (此期间合计)：** 约 8 小时

**学习课程/内容：** 1. “百度外卖”大型综合项目实战 (静态布局与核心技术实践) ； 2. 黑马程序员前端React18入门教程 - React环境搭建

**核心任务：1. 通过大型实战项目全面应用原生JS、CSS和Sass知识，重点实践移动端响应式布局、Sass工程化与第三方库的整合。2. 掌握现代化React开发环境，理解项目启动流程，入门JSX语法**

**完成内容与学习点：**

### **第一部分：移动端响应式布局方案 (`rem` 动态适配)**

1.  **技术选型与实现:**
    *   为了实现页面在不同移动设备上的**平滑、等比例缩放**，采用了 **`rem` 单位** + **JavaScript动态计算 `<html>` 的 `font-size`** 的经典方案。
    *   **JS 动态适配脚本 (核心):**
        > [!IMPORTANT]
        > 通过编写 `setRemUnit` 函数，实现了 `html` 的 `font-size` 与**设备视口宽度 (`document.documentElement.clientWidth`)** 的动态绑定。其核心计算公式为：`实际字号 = (视口宽度 / 设计稿宽度) * 设计稿基准字号`。
        ```javascript
        function setRemUnit() {
          const designWidth = 640;
          const designFontSize = 24;
          const screenWidth = document.documentElement.clientWidth;
          const actualFontSize = (screenWidth / designWidth) * designFontSize;
          document.documentElement.style.fontSize = actualFontSize + 'px';
        }
        ```
    *   **脚本放置位置 (最佳实践):**
        > 明确了该适配脚本应放置在HTML的 **`<head>`** 标签内，以**避免页面初次渲染时因 `rem` 基准值未设定而导致的布局抖动 (Flash of Unstyled Content - FOUC)**。

### **第二部分：Sass/SCSS 工程化实践**

2.  **文件组织与模块化:**
    *   使用 **`@import`** 规则，按 `normalize.css` -> `base.css` -> `index.css` 的顺序引入样式文件，建立了清晰、可维护的CSS模块化结构。
    *   回顾并实践了 **`normalize.css`** 的核心作用：在保留有用默认值的基础上，**抹平浏览器间的样式差异**。

3.  **`@mixin` (混入) 的高效应用:**
    *   通过封装多个可复用的 `@mixin` (如 `bgc`, `wh`, `center`)，极大地减少了重复的CSS代码，提升了开发效率和代码的可维护性。

4.  **单位换算函数与问题排查:**
    *   编写了 `@function px2rem($px)` 来实现 `px` 到 `rem` 的自动换算。
    *   **解决了Sass中的单位运算错误 (重点):**
        > [!CAUTION]
        > 通过实践，深刻理解了Sass在进行除法运算时，**带单位的值 (`24px`)** 和 **不带单位的纯数字 (`154`)** 无法直接运算。解决方案是确保进行除法运算的双方都是**纯数字**（如 `$base-font-size: 24;`），最后再拼接上 `rem` 单位。

### **第三部分：CSS 布局与第三方库整合**

5.  **`transform` 属性的覆盖与合并 (重点):**
    *   在实现“礼物环绕旋转”效果时，遇到了 `@mixin` 中已有的 `transform: translateX(-50%)` 被元素自身的 `transform: rotate(...)` **覆盖**的问题。
    *   **解决方案:** 掌握了 `transform` 属性可以接收**多个变换函数**。通过将多个变换函数写在**同一个 `transform` 属性**中（如 `transform: translateX(-50%) rotate(261deg) translateY(...)`），并注意**变换顺序**，成功解决了样式覆盖问题。

6.  **精灵图 (CSS Sprites) 理论复习:**
    *   回顾了其核心目的：**通过合并小图到大图，减少HTTP请求次数**。
    *   复习了其实现原理：利用 `background-image` + `background-position` (通常为负值) + 固定的 `width`/`height` 来从大图中“裁剪”出需要的小图标。

7.  **第三方库/插件使用 (Swiper.js):**
    *   **核心使用流程:** 系统性地复习了使用Swiper.js的**三步走**流程：**1. 引入资源文件 (CSS/JS) -> 2. 搭建HTML骨架 -> 3. JavaScript初始化 (`new Swiper(...)`)**。
    *   **问题排查 (Debugging):** 在实践中，成功地诊断并修复了因**JS初始化代码缺失**、**CSS引入方式混乱**、**Swiper容器无高度**等多种原因导致的轮播图不工作问题，积累了宝贵的项目调试经验。
    *   **HTML 属性细节:** 明确了在现代HTML5中，`<script>` 标签的 `type="text/javascript"` 属性是**不必要的**，可以安全省略。


### **第四部分：现代化React开发环境 (Vite)**

1.  **技术选型与搭建:**
    *   **主动决策:** 摒弃了课程中传统的`create-react-app`，直接采用业界前沿的构建工具 **Vite** 搭建开发环境。
    *   **命令实践:** 熟练使用 `npm create vite@latest`, `npm install`, `npm run dev` 完成了项目的初始化与启动。

2.  **Vite 项目工作流理解:**
    *   **启动流程串联:** 理清了从浏览器访问 `http://localhost:5173` 到页面最终渲染的完整链路：`index.html` (入口) -> `main.jsx` (JS启动器) -> `App.jsx` (根组件)。
    *   **核心文件职责:**
        *   `index.html`: 理解了其作为应用“地基”的角色，特别是 `<div id="root"></div>` 作为React挂载点的重要性。
        *   `main.jsx`: 明确了它是JS的“总开关”，通过 `createRoot().render()` 将React组件注入到真实DOM中。
    *   **现代JS入口文件演进:** 注意到并理解了新版Vite模板中 `import { StrictMode } from 'react'` 和 `import { createRoot } from 'react-dom/client'` 的写法，以及为何可以省略 `import React from 'react'`（得益于新的JSX转换器）。

3.  **组件化思想初探 (`App.jsx` vs `<App />`):**
    *   通过提问与梳理，清晰地辨析了 `App.jsx` (组件的定义/设计图)、`App` (导入后的JS变量/设计图本身) 和 `<App />` (使用设计图创建组件实例的JSX语法) 之间的关系，这是理解组件化思想的关键第一步。

### **第五部分：JSX 语法核心入门**

4.  **JSX 本质认知:**
    *   **定义:** 明确了JSX是 **JavaScript 和 XML 的语法扩展**，是React中编写UI模板的方式。
    *   **编译:** 知道了JSX无法被浏览器直接执行，需要通过 **Babel** 编译成 `React.createElement()` 函数调用。

5.  **JSX 基础语法规则:**
    *   **单一根元素:** 掌握了所有JSX必须由一个父元素包裹，并学会了使用 `<></>` (Fragment) 来避免创建不必要的多余DOM节点。
    *   **标签闭合:** 掌握了所有标签（包括`<img>`, `<br>`等）都必须以自闭合形式 `<tag />` 结束的严格规则。

6.  **JSX 的“超能力”——嵌入JS:**
    *   **核心语法 `{}`:** 掌握了使用花括号 `{}` 在JSX中嵌入JavaScript变量、数学表达式、函数调用等动态内容。

---

### 💡 可能涉及的面试题

1.  **“请简述一下从浏览器输入URL到看到React页面的完整过程（在Vite环境下）。”**
    > **考察点:** 对现代前端项目启动流程的宏观理解，能否清晰描述 `html`, `js`, `react-dom` 和组件之间的协作关系。
    
    > **回答思路:**
    
    ➡️ 浏览器请求URL
    ➡️ Vite 返回 index.html (骨架)
    ➡️ 浏览器请求 main.jsx (脚本)
    ➡️ Vite 实时编译并返回 JS
    ➡️ 浏览器执行 JS
    ➡️ React 接管并渲染 UI 到 #root

    一、浏览器和 Vite 开发服务器的交互（1.输入地址； 2.Vite 服务器响应把 index.html 返回给浏览器； 3.浏览器解析 html, 根节点标签id 为root的作为 react 的挂载点； 4.根据 script 标签中，浏览器向 vite发出请求，启动脚本/src/maon.jsx； 5.vite 编译 main.jsx 中的语法为浏览器可以理解的 js 返回给浏览器）。

    二、React 接管并渲染页面（ 1. 浏览器收到 main.js 并执行，引入 react、 createRoot 方法和根组件 App.jsx; 2.根据这段代码createRoot(document.getElementById('root')).render(<App />)，react 找到html 中 id 为 root 的节点，并且把 App 组件中的所有内容渲染到那个位置；3.react 渲染的时候会创建一个虚拟 DOM 树，执行，页面显示）

---

### 📖 巩固与拓展 (Daily Habit 待完成)

*   **逛逛社区 (15-20分钟):**
    > 今天可以上 **掘金** 搜索 `React JSX 最佳实践` 或 `React 条件渲染`。看看其他开发者是如何在真实项目中优雅地使用JSX的，特别是对于复杂的条件和列表渲染场景。

*   **翻翻理论书 (15-20分钟):**
    > 回顾 **《JavaScript高级程序设计》（红宝书）** 中关于 **“DOM”** 的章节。JSX最终会被渲染成真实的DOM，复习一下原生DOM操作的知识（比如`createElement`, `appendChild`），可以让你更深刻地理解React（和Babel）在底层为你做了什么。

---

### 🤔 思考与心得

*   **实践是检验真理的唯一标准:** 今天的大部分时间都在进行项目实战，通过解决一个个具体的CSS和JS问题，让之前学习的理论知识真正“落地”，理解得也更加深刻。
*   **工程化工具的威力:** Sass的变量、`@mixin`、函数等功能，在处理`rem`布局和复用样式时，展现出了巨大的便利性和工程化优势。
*   **调试能力的重要性:** 从Swiper不工作到Sass编译报错，今天的学习过程也是一次密集的调试训练，锻炼了从CSS、HTML、JS多个维度分析和解决问题的能力。
*   **从全局到局部:** 先理解Vite项目的整体运作流程，再深入到JSX这个具体的“零件”，这种自顶向下的学习方式让知识点不再孤立，更容易形成体系。
*   **保持好奇:** 对 `localhost:5173`、`main.jsx` 新写法的追问，引出了端口号彩蛋、JSX转换器演进等深层知识，这种好奇心是技术成长的强大驱动力。

---

### 🚀 后续计划

*   **继续深入 JSX 的学习:**
    *   **条件渲染:** 如何根据不同条件显示或隐藏JSX元素（使用三元运算符或 `&&` 运算符）。
    *   **列表渲染:** 如何使用数组的 `.map()` 方法来动态创建列表项（这是非常高频的用例）。
    *   **样式处理:** 学习如何通过 `className` 和行内 `style` 对象为JSX添加样式。
    *   **事件绑定:** 学习 `onClick` 等事件处理函数的绑定方法。

---
