## 学习简报 - 2024年05月20日

**今日学习时长：** 约 5 小时 45 分钟

**学习课程：** 黑马程序员 - 前端Web开发HTML5+CSS3+移动web视频教程 (CSS布局部分)

**今日完成内容：**

1.  **CSS 布局基础回顾：**
    *   **标准流 (文档流)：** 回顾了元素默认的排列方式。
    *   **`float` 布局：** 简单了解其基本概念、用途及主要问题 (脱离文档流、高度塌陷)。

2.  **Flexbox (弹性盒子) 布局 (重点学习)：**
    *   **基本概念：**
        *   通过 `display: flex;` 启用Flexbox，父级成为 **弹性容器 (Flex Container)**，直接子元素成为 **弹性项目/盒子 (Flex Items)**。
        *   理解了 **主轴 (Main Axis)** 和 **侧轴/交叉轴 (Cross Axis)** 的概念，以及项目默认沿主轴排列。
    *   **容器属性：**
        *   **主轴对齐方式 `justify-content`：**
            *   `flex-start` (默认), `flex-end`, `center`
            *   `space-between` (两端对齐，项目间等间距)
            *   `space-around` (项目两侧间距相等，边缘间距是中间间距一半)
            *   `space-evenly` (所有可见间距均相等)
        *   **交叉轴对齐方式 (单行内) `align-items`：**
            *   `stretch` (默认，项目在交叉轴尺寸为`auto`时拉伸)
            *   `flex-start`, `flex-end`, `center`
        *   **修改主轴方向 `flex-direction`：**
            *   `row` (默认), `row-reverse`
            *   `column` (主轴变垂直，交叉轴变水平)
            *   `column-reverse`
            *   理解了修改主轴方向后，`justify-content` 和 `align-items` 控制的轴向随之改变，并掌握了通过此组合实现双轴居中的方法。
        *   **项目换行 `flex-wrap`：**
            *   `nowrap` (默认，不换行，项目可能被压缩)
            *   `wrap` (换行，第一行在上方)
            *   `wrap-reverse` (换行，第一行在下方)
        *   **多行/多列对齐 (交叉轴) `align-content`：** (仅在 `flex-wrap: wrap;` 且实际发生换行时生效)
            *   `stretch` (默认), `flex-start`, `flex-end`, `center`
            *   `space-between`, `space-around`, `space-evenly`
            *   明确了其对单行弹性盒子不生效。
    *   **项目属性：**
        *   **控制单个项目交叉轴对齐 `align-self`：**
            *   属性值与 `align-items` 类似 (如 `auto`, `stretch`, `center`)，可覆盖容器的 `align-items` 设置。
            *   理解了 `stretch` 生效的前提是项目在交叉轴方向尺寸为 `auto`。
        *   **弹性伸缩比 `flex`：**
            *   理解了 `flex: <number>` (如 `flex: 1`) 表示项目按份数分配父级剩余尺寸 (此时 `flex-basis` 默认为 `0%`)。
            *   了解了项目在主轴方向尺寸默认靠内容撑开，侧轴方向默认拉伸 (在 `align-items:stretch` 且侧轴尺寸为 `auto` 时)。

3.  **综合案例实践：**
    *   **产品卡片案例：**
        *   独立尝试完成，遇到内容未在盒子内导致样式不生效的问题。
        *   通过分析，理解了CSS后代选择器 (`.product h4`) 与HTML结构的关系，即样式规则是针对特定容器内部的元素。
    *   **新闻列表案例：** 跟着视频完成。
    *   **"抖音解决方案" 案例：** 一半自己动手，一半跟着视频完成，综合运用了Flexbox布局知识。

**思考与心得：**

*   深刻理解了HTML结构对于CSS选择器生效的重要性，特别是后代选择器的作用机制。
*   通过多个综合案例的实践，对Flexbox的核心概念、容器与项目属性的应用有了深入的掌握。
*   认识到Flexbox在实现对齐（尤其是双轴居中）、空间分配和响应式布局方面的强大和便捷。
*   课程难度开始加深，需要更加专注和记忆。

**明日计划：**

*   **项目实践：跟随教程制作一个完整的网站页面 - "学成在线" 首页。** 这将是对目前所学HTML和CSS知识（特别是Flexbox布局）的一次大规模综合运用和检验。

---
