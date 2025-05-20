## 学习简报 - 2024年05月17日 (周五)

**今日学习时长：** 约 3 小时 30 分钟

**学习课程：** 黑马程序员 - 前端Web开发HTML5+CSS3+移动web视频教程 (CSS部分)

**今日完成内容：**

1.  **CSS 结构伪类选择器 (`:nth-child()`, etc.)：**
    *   理解了结构伪类的含义：根据元素在DOM树结构中的位置和关系进行选择。
    *   重点学习了 `E:nth-child(n)`：
        *   `n` 可以是数字 (如 `li:nth-child(2)`)。
        *   `n` 可以是关键词 `odd` 或 `even`。
        *   `n` 可以是公式 (An+B 形式，如 `2n`, `2n+1`, `n+5`, `-n+5`)，理解了其计数和匹配逻辑。
    *   了解了 `:first-child`, `:last-child`, `:only-child` 以及与 `:nth-of-type(n)` 系列的区别。

2.  **CSS 伪元素选择器 (`::before`, `::after`)：**
    *   理解了伪元素的含义：操作元素特定部分或在元素前后插入由CSS生成的“虚拟”内容，其并非真实DOM节点。
    *   重点学习了 `::before` 和 `::after`：
        *   **必须设置 `content` 属性** 才能生效 (即使是 `content: "";`)。
        *   默认情况下，伪元素是**行内显示模式 (inline)**，可以通过 `display` 属性更改。
    *   了解了双冒号 `::` 是现代CSS规范推荐的写法，用以区分伪类。

3.  **设计稿与切图工具认知：**
    *   讨论了PxCook工具可能已停止更新维护的情况。
    *   了解了现代前端开发流程中更常用的设计协作工具，如 Figma, Sketch (配合 Zeplin/蓝湖), Adobe XD, 蓝湖, MasterGo 等。
    *   认识到前端的工作重点从“手动切图”转变为理解设计规范、查看标注、高效导出资源和与设计师协作。

4.  **DOM (文档对象模型) 概念：**
    *   理解了DOM是浏览器为HTML文档创建的内存中的树形结构表示。
    *   认识到DOM是JavaScript访问和修改网页内容、结构和样式的桥梁。
    *   了解了DOM树中的主要节点类型 (文档、元素、文本等)。

5.  **CSS 盒模型 (Box Model) 深入：**
    *   **组成部分：** 内容区域 (content - `width`, `height`)、内边距 (`padding`)、边框 (`border`)、外边距 (`margin`)。
    *   **边框 `border`：**
        *   属性值：边框线粗细 (`border-width`)、线条样式 (`border-style`: `solid`, `dashed`, `dotted` 等 - 必须设置才能显示边框)、颜色 (`border-color`)。
        *   复合属性 `border` 及单边属性 `border-方位名词`。
    *   **内边距 `padding`：**
        *   `padding-方位名词` 及复合属性 `padding` 的多值写法 (1至4个值，上右下左顺序)。
    *   **盒模型与元素类型：** 理解了几乎所有HTML元素都遵循盒模型，`<div>` 和 `<span>` 只是常用的示例。
    *   **盒子尺寸计算 (默认 `content-box`)：** 理解了在默认情况下，`padding` 和 `border` 会“撑大”盒子设定的 `width` 和 `height`。
    *   **`box-sizing: border-box;` (盒子内减模式)：**
        *   学习了通过设置此属性，使 `width` 和 `height` 定义的是包含 `padding` 和 `border` 在内的总尺寸，`padding` 和 `border` 会向内挤压内容区域。
    *   **外边距 `margin`：**
        *   与 `padding` 类似的属性值写法和含义。
        *   理解了 `margin` 不会“撑大”盒子本身的可视尺寸。
        *   **版心居中技巧：** `margin: 0 auto;` (前提是块级元素且有明确 `width`)。
    *   **清除标签默认样式：** 使用通配符选择器 `* { margin: 0; padding: 0; }`。
    *   **去掉列表项目符号：** 使用 `list-style: none;`。

6.  **CSS 元素溢出处理 (`overflow`)：**
    *   属性值：`visible` (默认)、`hidden` (隐藏)、`scroll` (始终显示滚动条)、`auto` (自动判断是否显示滚动条)。
    *   了解了 `overflow-x` 和 `overflow-y` 可以分别控制水平和垂直方向的溢出。

7.  **CSS 外边距问题：**
    *   **合并现象 (Margin Collapsing)：** 重点理解了垂直排列的块级兄弟元素，其上下 `margin` 会合并，取较大值生效。
    *   **塌陷问题 (父子外边距合并)：** 当父元素没有 `padding-top` 或 `border-top` 时，第一个子元素的 `margin-top` 会“穿透”父元素，导致父级和子级一起向下移动。
        *   **解决方法：**
            1.  父级设置 `padding-top`。
            2.  父级设置 `border-top`。
            3.  父级设置 `overflow: hidden;` (或 `auto`, `scroll`) - 理解了其原理是创建了新的BFC (块级格式化上下文) 来阻止合并。

8.  **CSS 行内元素的内外边距问题：**
    *   理解了行内元素水平方向的 `margin` 和 `padding` 通常有效。
    *   垂直方向的 `margin` 通常无效，垂直方向的 `padding` 虽然视觉上可能撑开背景，但通常不影响行高或推开其他行。
    *   初步讨论了解决方法，如使用 `line-height` (间接影响) 或改变 `display` 属性 (如 `inline-block`)。

9.  **CSS 圆角与阴影：**
    *   **圆角属性 `border-radius`：**
        *   属性值：数字 `px` 或百分比 `%`。
        *   多值写法 (1至4个值)。
        *   如何设置正圆 (正方形元素，`border-radius: 50%` 或边长一半)。
        *   如何设置胶囊形状 (矩形元素，`border-radius` 为短边一半或一个足够大的值)。
    *   **阴影属性 `box-shadow`：**
        *   属性值顺序：`[inset] offset-x offset-y [blur-radius] [spread-radius] [color]`。
        *   理解了各参数的含义：X/Y轴偏移量、模糊半径、扩散半径、颜色、内外阴影 (`inset`)。

**思考与心得：**

*   深入理解了CSS选择器的多样性和精确性，特别是结构伪类和伪元素的应用场景。
*   对CSS盒模型的组成、尺寸计算 (`content-box` vs `border-box`)、以及内外边距的特性 (包括合并和塌陷问题) 有了更清晰的认识。
*   开始关注现代前端开发中设计工具的演变和协作方式。
*   对DOM作为连接HTML、CSS、JS桥梁的概念有了初步理解。
*   通过学习圆角和阴影，体会到CSS在美化和增强视觉效果方面的能力。

**明日计划 (预估)：**

*   (请你填写你接下来的学习计划)

---
