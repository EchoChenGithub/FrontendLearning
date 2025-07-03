## 学习简报 - 2025年7月3日

**总学习时长 (此期间合计)：** 约 5.5 小时

**学习课程/内容：** “百度外卖”大型综合项目实战 (静态布局与核心技术实践)

**核心任务：通过大型实战项目全面应用原生JS、CSS和Sass知识，重点实践移动端响应式布局、Sass工程化与第三方库的整合。**

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

---

### 🤔 思考与心得

*   **实践是检验真理的唯一标准:** 今天的大部分时间都在进行项目实战，通过解决一个个具体的CSS和JS问题，让之前学习的理论知识真正“落地”，理解得也更加深刻。
*   **工程化工具的威力:** Sass的变量、`@mixin`、函数等功能，在处理`rem`布局和复用样式时，展现出了巨大的便利性和工程化优势。
*   **调试能力的重要性:** 从Swiper不工作到Sass编译报错，今天的学习过程也是一次密集的调试训练，锻炼了从CSS、HTML、JS多个维度分析和解决问题的能力。

---

### 🚀 后续计划

*   **首要任务:** 暂停“百度外卖”项目的动画部分，战略性地将学习重心转移到 React 框架。
*   **下一步:** 正式开启 **React 框架** 的学习之旅，从核心概念（JSX, 组件, Props, State）入手。
