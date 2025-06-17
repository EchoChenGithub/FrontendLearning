## 学习简报 - 2024年06月17日

**总学习时长 ：** 约 6 小时

**学习课程/内容：** 黑马程序员 - 前端Web开发HTML5+CSS3+移动web视频教程 (CSS Transform, Animation 及相关技巧)

**核心任务：深入学习CSS Transform与Animation，并通过实践掌握相关技巧。**

**完成内容与学习点：**

**一、 CSS `transform` 属性深入学习：**

1.  **2D 转换函数回顾与深化：**
    *   **位移 (`translate(tx, ty)` / `translateX(tx)` / `translateY(ty)`)：** 理解其不影响布局的特性，以及百分比值相对于自身尺寸计算的原理。回顾了利用 `translate(-50%, -50%)` 配合 `left/top: 50%` 实现绝对定位元素居中的现代方法。
    *   **旋转 (`rotate(angle)`)：** 单位 `deg`，正值顺时针。
    *   **缩放 (`scale(sx, sy)`)：** 理解其默认以中心点缩放，且不影响文档流，与直接修改 `width/height` 的区别。
    *   **倾斜 (`skew(ax, ay)`)：** 了解其基本用法。
    *   **变换原点 (`transform-origin`)：** 学习如何改变元素变换的基点，及其对 `rotate`, `scale`, `skew` 效果的影响。
    *   **多重转换顺序：** 深刻理解 `transform` 函数的应用顺序会影响最终结果，特别是旋转会改变后续平移的坐标轴向。讨论了先平移再缩放导致平移距离视觉上“变短”的问题及调整思路，即改变平面转换的原点 transform-origin: left center(假如向左平移)

2.  **3D 转换函数初步：**
    *   **空间平移 (`translate3d(tx, ty, tz)` / `translateZ(tz)`)：** 理解 `tz` 控制Z轴（深度）方向的移动。
    *   **视距 (`perspective`)：**
        *   理解其作用是为3D变换添加透视效果（近大远小），通常应用于父元素。
        *   明确了 `perspective` 值的大小与透视效果强弱的关系（值大则效果弱，值小则效果强），以及常用经验范围 (800-1200px)。
    *   **空间旋转 (`rotateX(angle)`, `rotateY(angle)`, `rotateZ(angle)`)：**
        *   理解 `rotateZ` 在无3D上下文时与2D `rotate` 效果相同。
        *   明确了 `rotateX` 和 `rotateY` 必须配合父元素的 `perspective` 才能产生明显的3D旋转效果。
        *   讨论了通过“左手螺旋法则”判断3D旋转正方向。
    *   **立体呈现 (`transform-style: preserve-3d;`)：**
        *   理解其应用于父元素，使得子元素的3D变换能在同一个3D空间中正确渲染，而不是被“拍平”。
        *   用于构建如3D立方体等复杂3D结构。
    *   **空间缩放 (`scale3d(sx, sy, sz)` / `scaleZ(sz)`)：** 了解其基本用法，以及 `scaleZ` 效果通常也需配合 `perspective` 和3D内容才能明显观察。

3.  **案例实践 - "双开门" 效果：**
    *   构思并计划通过HTML父子级结构，结合CSS Flexbox布局、`transform: translateX()` 和 `transition` 来实现鼠标悬停时两侧门板平移的动态效果。

**二、 CSS 动画 (`animation` 与 `@keyframes`) 基础：**

1.  **定义动画 (`@keyframes`)：**
    *   学习了使用 `@keyframes` 规则和动画名称来定义动画序列。
    *   掌握了通过 `from/to` 或百分比来定义关键帧样式。
    *   理解了当动画起始状态与元素默认状态相同时，可省略 `from/0%` 关键帧。

2.  **使用动画 (`animation` 属性及其子属性)：**
    *   `animation-name`, `animation-duration` (必需)。
    *   `animation-timing-function` (速度曲线)：了解 `linear`, `ease` 等，以及 `steps()` 用于分步动画（如精灵动画）。
    *   `animation-delay` (延迟时间)。
    *   `animation-iteration-count` (重复次数，如 `infinite`)。
    *   `animation-direction` (动画方向，如 `alternate`)。
    *   `animation-fill-mode` (执行完毕状态，如 `forwards`, `backwards`)。
    *   `animation-play-state` (播放状态，如 `paused`, `running`)，常配合 `:hover` 或 JS 使用。
    *   学习了为一个元素应用多组动画 (用逗号分隔)。

3.  **案例实践 - "走马灯" (无缝滚动)：**
    *   通过 `@keyframes` 和 `transform: translateX()` 实现 `<ul>` 的平移动画。
    *   掌握了通过复制开头图片到列表末尾，并精确计算滚动距离，利用动画循环特性实现视觉无缝连接的技巧。
    *   使用 `animation-play-state: paused;` 配合 `:hover` 实现鼠标悬停暂停。

4.  **案例实践 - 逐帧动画 (精灵动画)：**
    *   步骤：准备与单帧小图等大的显示区域 -> 定义动画改变 `background-position` (移动距离为精灵图宽度或高度) -> 使用动画并设置 `animation-timing-function: steps(N)` (N为总帧数)。

**三、 CSS 其他技巧与回顾 (06月17日下午)：**

1.  **全屏背景图实现：**
    *   明确了当 `body` 使用 `background-size: cover;` 时，需要设置 `html, body { height: 100%; }` (传统方法) 或 `body { min-height: 100vh; }` (现代方法) 来确保 `body` 有足够高度，使背景图能铺满整个视口。
    *   理解了 `body` 默认高度由内容决定，若内容不足则高度不够，导致 `cover` 效果不铺满。
2.  **伪元素 `::before` 和 `::after` 复习：** 强调了 `content` 属性的必要性及其默认 `display: inline` 的特性。
3.  **绝对定位后盒子宽高修改生效复习。**

**思考与心得 (综合这两次学习)：**

*   **Transform 的强大与灵活：** 通过实践，对 `transform` 在位移、旋转、缩放、倾斜以及创建3D效果方面的能力有了更直观的认识。理解了变换顺序、变换原点的重要性。
*   **CSS动画的魅力：** 初步掌握了 `@keyframes` 和 `animation` 属性的使用，能够创建基本的动态效果和序列帧动画，为页面增添活力。
*   **细节决定成败：** 在实现如全屏背景、精灵动画等效果时，注意到 `height` 的设置、`background-position` 的精确计算、`steps()` 的运用等细节是成功的关键。
*   **温故而知新：** 通过回顾和重新梳理，对之前学习的知识点（如精灵图定位、绝对定位后宽高生效）有了更牢固的掌握。
*   **学习节奏与心态：** 即使中间有间隔（如登山、处理事务），也能够通过回顾和专注投入快速回到学习状态。

**明日计划 (预估)：**

*   移动 web 基础

---
